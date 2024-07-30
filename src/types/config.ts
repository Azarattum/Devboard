import { type Build } from "~/server/db/schema";

export type Config = {
  slack?: {
    appToken: string;
    token: string;
  };

  builds?: Record<string, { [status in Build["status"]]?: Capture }>;
  activity?: { idle: ImperativeCapture; event?: Capture };
  statistics?: Record<string, Capture>;
};

export type Capture = SlackCapture | WebCapture;
export type ImperativeCapture = WebCapture;

type CommonCapture = {
  capture?: "extra" | number;
  include?: string[];
  exclude?: string[];
  match?: RegExp;
};

type SlackCapture = {
  channel: string;

  extra?: "mentioned" | "author";
  user?: string;
} & CommonCapture;

type WebCapture = {
  interval: number;
  match: RegExp;
  url: string;
} & CommonCapture;
