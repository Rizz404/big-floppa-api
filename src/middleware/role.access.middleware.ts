import { UserRole } from "@/entity/User.entity";
import { RequestHandler } from "express";

const roleAccess = (role: UserRole): RequestHandler => {
  return (req, res, next) => {
    const user = req.user;

    console.log("User data in middleware:", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = user.role;

    console.log("User role type:", typeof userRole);
    console.log("Role function type:", typeof role);

    if (typeof userRole !== typeof role) {
      return res.status(400).json({
        message: "Role type mismatch. Please check role values.",
      });
    }

    console.log("User data in middleware:", userRole);
    console.log("Role function:", role);
    if (!userRole) {
      return res
        .status(400)
        .json({ message: "Something wen't wrong, try to login again" });
    }

    if (role !== userRole) {
      return res
        .status(403)
        .json({ message: "You do not have access to this resource" });
    }
    next();
  };
};

export default roleAccess;
