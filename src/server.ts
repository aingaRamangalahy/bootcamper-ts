import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

class Server {
  public app: express.Application;

  constructor() {
    // load env
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
    
    this.app = express();
    this.mongodb();
    this.config();
  }

  public config() {
    
    // config
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    // this.app.use(cors());
    // this.app.use(express.static(path.join(__dirname, 'dist')))
    this.app.use("/public", express.static(path.join(process.cwd(), "public")));
    // this.app.use('/assets',express.static(path.join(__dirname, 'dist/v3/assets')))
  }

  public mongodb() {
    // set up mongoose
    console.log("Connecting to DB....");
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Dabatase connected."))
      .catch((e) => console.log("Error connection db.", e));
    mongoose.set("useFindAndModify", false);
    mongoose.pluralize(null);
  }

  public routes() {}
}

export default new Server();
