import multer, { memoryStorage } from "multer";
import { Request, Response, NextFunction } from "express";
//../../Image-Uploads
const allowedFiles = ["jpg", "jpeg", "png", "webp"];
export const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (
      file.mimetype.endsWith("jpg") ||
      file.mimetype.endsWith("jpeg") ||
      file.mimetype.endsWith("png") ||
      file.mimetype.endsWith("webp")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Uploaded file is not supported"));
    }
  },
});

export const imageAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: err.message,
        data: null,
      });
      return;
    }
    next();
  });
};
