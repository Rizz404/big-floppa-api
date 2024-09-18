import path from "path";
import fs from "fs";

const deleteFile = async (fileUrl: string) => {
  const oldFilePath = path.join(
    __dirname,
    "..",
    "public",
    fileUrl.replace(`${process.env.BACKEND_DOMAIN}`, "")
  );
  fs.unlink(oldFilePath, (err) => {
    if (err) console.error("Error deleting old file:", err);
  });
};

export default deleteFile;
