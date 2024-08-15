import { UserRole } from "@/entity/User.entity";
import { RequestHandler } from "express";

const roleAccess = (role: UserRole): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.user.role) {
      return res
        .status(400)
        .json({ message: "Something wen't wrong, try to login again" });
    }

    const userRole = req.user.role;

    if (role !== userRole) {
      return res
        .status(403)
        .json({ message: "You do not have access to this resource" });
    }
    next();
  };
};

export default roleAccess;
