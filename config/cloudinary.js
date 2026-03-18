import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const thumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "portfolio_projects/thumbnails",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const picturesStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "portfolio_projects/pictures",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const storage = {
  _handleFile(req, file, cb) {
    let selectedStorage = picturesStorage;

    if (file.fieldname === "thumbnail") {
      selectedStorage = thumbnailStorage;
    }

    selectedStorage._handleFile(req, file, cb);
  },

  _removeFile(req, file, cb) {
    cb(null);
  },
};

const upload = multer({ storage });

export { cloudinary, upload };