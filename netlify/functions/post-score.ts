/* eslint-disable */
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { FetcherError } from "@xata.io/client";
import { getXataClient } from "../../_lib/getXataClient";

const xata = getXataClient();

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      message: "Only `POST` requests",
    };
  }
  if (!event.body) {
    return {
      statusCode: 400,
      message: "Please provide score data",
    };
  }
  try {
    const data = await JSON.parse(event.body);
    console.log("Received data:", data); // Debug log
    
    // Create the record with the season ID as a string
    const record = await xata.db.scores.create({
      name: data.name,
      score: data.score,
      season: data.season // Pass the season ID directly as a string
    });

    console.log("Created record:", record); // Debug log
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: record.xata_id,
        name: record.name,
        score: record.score,
        season: record.season,
        createdat: record.xata_createdat,
        updatedat: record.xata_updatedat,
        version: record.xata_version
      })
    };
  } catch (error) {
    console.log("Error creating score:", error); // Debug log
    if (error instanceof FetcherError) {
      return {
        statusCode: error.errors?.[0]?.status || 500,
        message: error.errors?.[0]?.message || "xata error",
      };
    }
    return {
      statusCode: 500,
      message: JSON.stringify(error),
    };
  }
};

export { handler };