import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { SampleRouter } from "./routes/sample.router";

const PORT = 8000;

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(json());
  }

  private handleError() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status(400).send(err.message);
      }
    );
  }

  private routes() {
    const sampleRouter = new SampleRouter();

    this.app.use("/samples", sampleRouter.getRouter());
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  }
}
