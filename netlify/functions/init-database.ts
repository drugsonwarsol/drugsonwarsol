/* eslint-disable */
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getXataClient } from "../../_lib/getXataClient";

const xata = getXataClient();

const RANDOM_NAMES = [
  { name: "El Chapo" },
  { name: "Scarface" },
  { name: "Nucky Thompson" },
  { name: "Walter White" },
  { name: "Jesse Pinkman" },
  { name: "Stringer Bell" },
  { name: "Tony Montana" },
  { name: "Frank Lucas" },
  { name: "Dutch Schultz" },
  { name: "Lucky Luciano" }
];

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Only POST requests allowed" })
    };
  }

  try {
    // First create the season - note the lowercase 'season'
    const newSeason = await xata.db.season.create({
      name: "Season 1",
      currentSeason: true,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    });

    console.log("Season created:", newSeason);

    // Add random names - note the camelCase 'randomNames'
    const names = await Promise.all(
      RANDOM_NAMES.map(nameObj => 
        xata.db.randomNames.create({
          name: nameObj.name
        })
      )
    );

    console.log("Random names created:", names);

    // Add some initial scores - note the lowercase 'scores'
    const initialScores = await Promise.all([
      xata.db.scores.create({
        name: "El Chapo",
        score: 1000000,
        season: newSeason.id
      }),
      xata.db.scores.create({
        name: "Scarface",
        score: 800000,
        season: newSeason.id
      }),
      xata.db.scores.create({
        name: "Walter White",
        score: 750000,
        season: newSeason.id
      })
    ]);

    console.log("Initial scores created:", initialScores);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Database initialized successfully",
        data: {
          season: newSeason,
          names,
          scores: initialScores
        }
      })
    };

  } catch (error) {
    console.error("Error initializing database:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: "Error initializing database", 
        error: error instanceof Error ? error.message : String(error)
      })
    };
  }
};

export { handler };