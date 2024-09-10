"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const cloudinary_1 = require("../lib/cloudinary");
const nodemailer_1 = require("../lib/nodemailer");
const path_1 = require("path");
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
class SampleController {
    getSampleData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sampleData = yield prisma_1.default.sample.findMany();
                return res.status(200).send(sampleData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createSampleData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, code } = req.body;
                const newSampleData = yield prisma_1.default.sample.create({
                    data: {
                        name,
                        code,
                    },
                });
                return res.status(200).send(newSampleData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    addNewImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.file;
                console.log("INI ISI IMAGE : ", image);
                console.log("INI ISI BODY : ", req.body);
                if (!image) {
                    throw new Error("No image uploaded");
                }
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(image);
                // add logic to save secure_url in db
                return res.status(200).send({
                    message: "Upload image success",
                    imageUrl: secure_url,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secure_url = "https://res.cloudinary.com/sosmed-daniel/image/upload/v1722845397/m8xamvm6oqtonhvxcmoz.png";
                yield (0, cloudinary_1.cloudinaryRemove)(secure_url);
                return res.status(200).send({
                    message: "Delete image success",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // cara path tempat nyimpen template emailnya
                const templatePath = (0, path_1.join)(__dirname, "../templates/example.hbs");
                const templateSource = yield promises_1.default.readFile(templatePath, "utf-8");
                const compiledTemplate = handlebars_1.default.compile(templateSource);
                const html = compiledTemplate({ name: "BUDI" });
                yield nodemailer_1.transporter.sendMail({
                    to: "raypubg12345@gmail.com",
                    subject: "Welcome to Purwadhika",
                    html: html,
                });
                return res.status(200).send({
                    message: "send email success",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.SampleController = SampleController;
