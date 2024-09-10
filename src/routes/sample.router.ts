import { Router } from "express";
import { SampleController } from "../controllers/sample.controller";
import { validateCreateSample } from "../validators/sample.validator";
import { uploader } from "../lib/multer";

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.sampleController.getSampleData);
    this.router.post(
      "/",
      validateCreateSample,
      this.sampleController.createSampleData
    );
    this.router.post(
      "/add-image",
      uploader().single("file"),
      this.sampleController.addNewImage
    );

    this.router.delete("/", this.sampleController.deleteImage);
    this.router.post("/send-email", this.sampleController.sendEmail);
  }

  getRouter() {
    return this.router;
  }
}
