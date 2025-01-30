/* eslint-disable */
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { FetcherError } from "@xata.io/client";
import { getXataClient } from "../../_lib/getXataClient";

const xata = getXataClient();

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "PUT") {
    return {
      statusCode: 405,
      message: "Only `PUT` requests",
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
    console.log("Update request data:", data); // Log incoming data
    
    // Verify the record exists first
    const existingRecord = await xata.db.scores.read(data.id);
    console.log("Existing record:", existingRecord);
    
    if (!existingRecord) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Record not found" }),
      };
    }
    
    const record = await xata.db.scores.update(data.id, {
      name: data.name,
    });
    
    console.log("Updated record:", record);
    
    return {
      statusCode: 200,
      body: JSON.stringify(record),
    };
  } catch (error) {
    console.log("Error details:", error);
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
