import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { cloudinaryRemove, cloudinaryUpload } from "../lib/cloudinary";
import { transporter } from "../lib/nodemailer";
import { join } from "path";
import fs from "fs/promises";
import Handlebars from "handlebars";

export class SampleController {
  async getSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const sampleData = await prisma.sample.findMany();
      return res.status(200).send(sampleData);
    } catch (error) {
      next(error);
    }
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;

      const newSampleData = await prisma.sample.create({
        data: {
          name,
          code,
        },
      });

      return res.status(200).send(newSampleData);
    } catch (error) {
      next(error);
    }
  }

  async addNewImage(req: Request, res: Response, next: NextFunction) {
    try {
      const image = req.file;
      console.log("INI ISI IMAGE : ", image);
      console.log("INI ISI BODY : ", req.body);

      if (!image) {
        throw new Error("No image uploaded");
      }

      const { secure_url } = await cloudinaryUpload(image);

      // add logic to save secure_url in db

      return res.status(200).send({
        message: "Upload image success",
        imageUrl: secure_url,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const secure_url =
        "https://res.cloudinary.com/sosmed-daniel/image/upload/v1722845397/m8xamvm6oqtonhvxcmoz.png";

      await cloudinaryRemove(secure_url);

      return res.status(200).send({
        message: "Delete image success",
      });
    } catch (error) {
      next(error);
    }
  }

  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      // cara path tempat nyimpen template emailnya
      const templatePath = join(__dirname, "../templates/example.hbs");

      const templateSource = await fs.readFile(templatePath, "utf-8");

      const compiledTemplate = Handlebars.compile(templateSource);

      const html = compiledTemplate({ name: "BUDI" });

      await transporter.sendMail({
        to: "wahabe7659@mvpalace.com",
        subject: "Welcome to Purwadhika",
        html: html,
      });

      return res.status(200).send({
        message: "send email success",
      });
    } catch (error) {
      next(error);
    }
  }
}
