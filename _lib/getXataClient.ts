import { XataClient } from "./xata.codegen";
import fetch from "node-fetch";

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({ 
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH || 'main',
    //@ts-ignore
    fetch });
  return instance;
};
