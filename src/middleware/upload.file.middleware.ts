import multer, { FileFilterCallback, Multer } from "multer";
import { Request, Response, NextFunction } from "express";
import path from "path";
import sharp from "sharp";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fileUrl?: string;
      }
    }
  }
}

// * Fungsi helper untuk menghasilkan URL lengkap
const generateFileUrl = (folder: string, filename: string): string => {
  return `${process.env.BACKEND_DOMAIN}/images/${folder}/${filename}`;
};

const multerConfig = (
  folder: string,
  maxFileSize: number,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => void
): Multer => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: maxFileSize },
  });
};

const processAndSaveImage = async (
  file: Express.Multer.File,
  folder: string
) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const imageExt = file.mimetype === "image/gif" ? ".gif" : ".webp";

  const filename = file.fieldname + "-" + uniqueSuffix + imageExt;
  const filepath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    folder,
    filename
  );

  // * Pakai sharp untuk kompres image
  if (file.mimetype === "image/gif") {
    // todo: Gif nya kaga gerak mas
    await sharp(file.buffer)
      .gif({ progressive: true })
      .resize(1000, 1000, { fit: "inside", withoutEnlargement: true })
      .toFile(filepath);
  } else {
    await sharp(file.buffer)
      .webp({ quality: 80 })
      .resize(1000, 1000, { fit: "inside", withoutEnlargement: true }) // * // Resize jika lebih besar dari 1000x1000
      .toFile(filepath);
  }

  const fileUrl = generateFileUrl(folder, filename);
  const destination = path.join("public", "images", folder);

  return { fileUrl, filename, path: filepath, destination };
};

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(null, false); // Tidak ada error tapi filter ditolak, jadi `null` dan `false`
    // @ts-expect-error
    req.fileValidationError = "Not an image! Please upload an image."; // Tambahkan pesan error ke request
  }
};

// * Higher-order function untuk menangani upload dan error
const handleUpload = (uploadFn: any, folder: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    uploadFn(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
        // @ts-expect-error
      } else if (req.fileValidationError) {
        // @ts-expect-error
        return res.status(400).json({ error: req.fileValidationError });
      }

      if (req.file) {
        try {
          const processed = await processAndSaveImage(req.file, folder);

          req.file.fileUrl = processed.fileUrl;
          req.file.filename = processed.filename;
          req.file.path = processed.path;
          req.file.destination = processed.destination;
        } catch (error) {
          return res.status(500).json({ error: "Error processing image" });
        }
      } else if (req.files) {
        const filesArray = Object.values(req.files).flat();

        try {
          const processedFiles = await Promise.all(
            filesArray.map((file: Express.Multer.File) =>
              processAndSaveImage(file, folder)
            )
          );

          filesArray.forEach((file: Express.Multer.File, index) => {
            file.fileUrl = processedFiles[index].fileUrl;
            file.filename = processedFiles[index].filename;
            file.path = processedFiles[index].path;
            file.destination = processedFiles[index].destination;
          });
        } catch (error) {
          return res.status(500).json({ error: "Error processing image" });
        }
      }
      next();
    });
  };
};

// * Fungsi untuk upload single file
export const uploadSingle = (
  fieldName: string,
  folder: string,
  maxFileSize: number = 10 * 1024 * 1024
) => {
  const upload = multerConfig(folder, maxFileSize, fileFilter).single(
    fieldName
  );
  return handleUpload(upload, folder);
};

// * Fungsi untuk upload multiple files (array)
export const uploadArray = (
  fieldName: string,
  maxCount: number,
  folder: string,
  maxFileSize: number = 10 * 1024 * 1024
) => {
  const upload = multerConfig(folder, maxFileSize, fileFilter).array(
    fieldName,
    maxCount
  );
  return handleUpload(upload, folder);
};

// * Fungsi untuk upload multiple fields
export const uploadFields = (
  fields: { name: string; maxCount: number }[],
  folder: string,
  maxFileSize: number = 10 * 1024 * 1024
) => {
  const upload = multerConfig(folder, maxFileSize, fileFilter).fields(fields);
  return handleUpload(upload, folder);
};
