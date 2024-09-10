"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleRouter = void 0;
const express_1 = require("express");
const sample_controller_1 = require("../controllers/sample.controller");
const sample_validator_1 = require("../validators/sample.validator");
const multer_1 = require("../lib/multer");
class SampleRouter {
    constructor() {
        this.sampleController = new sample_controller_1.SampleController();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", this.sampleController.getSampleData);
        this.router.post("/", sample_validator_1.validateCreateSample, this.sampleController.createSampleData);
        this.router.post("/add-image", (0, multer_1.uploader)().single("file"), this.sampleController.addNewImage);
        this.router.delete("/", this.sampleController.deleteImage);
        this.router.post("/send-email", this.sampleController.sendEmail);
    }
    getRouter() {
        return this.router;
    }
}
exports.SampleRouter = SampleRouter;
