import axios from "axios";
import config from "../../config/server.json";

export const baseRequest = axios.create({ baseURL: config.server });
