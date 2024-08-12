import { DataSource } from "typeorm";
import dbConfig from "./db.config";

// For running migrations
export default new DataSource(dbConfig);