/* eslint-disable */
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "randomNames",
    checkConstraints: {
      randomNames_xata_id_length_xata_id: {
        name: "randomNames_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_randomNames_xata_id_key: {
        name: "_pgroll_new_randomNames_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "scores",
    checkConstraints: {
      scores_xata_id_length_xata_id: {
        name: "scores_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      season_link: {
        name: "season_link",
        columns: ["season"],
        referencedTable: "season",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_scores_xata_id_key: {
        name: "_pgroll_new_scores_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "score",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "season",
        type: "link",
        link: { table: "season" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"season"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "season",
    checkConstraints: {
      season_xata_id_length_xata_id: {
        name: "season_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_season_xata_id_key: {
        name: "_pgroll_new_season_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "currentSeason",
        type: "bool",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "endDate",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "startDate",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type RandomNames = InferredTypes["randomNames"];
export type RandomNamesRecord = RandomNames & XataRecord;

export type Scores = InferredTypes["scores"];
export type ScoresRecord = Scores & XataRecord;

export type Season = InferredTypes["season"];
export type SeasonRecord = Season & XataRecord;

export type DatabaseSchema = {
  randomNames: RandomNamesRecord;
  scores: ScoresRecord;
  season: SeasonRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://drugwars-jeuoie.us-east-1.xata.sh/db/drugwarsdbbbb",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
