"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const uploader = (fileLimit) => {
    const storage = multer_1.default.memoryStorage();
    const fileFilter = (req, file, cb) => {
        const extAllowed = /\.(jpg|jpeg|png)$/;
        const isExtMatch = file.originalname.toLocaleLowerCase().match(extAllowed);
        if (isExtMatch) {
            cb(null, true);
        }
        else {
            const error = new Error("Your file extension is denied");
            cb(error);
        }
    };
    const limits = { fileSize: fileLimit || 5 * 1024 * 1024 }; // default 5mb
    return (0, multer_1.default)({ storage, fileFilter, limits });
};
exports.uploader = uploader;
