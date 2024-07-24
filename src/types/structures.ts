export type StagingStatus = {
  type: "ok" | "fail" | "pending";
  since: number;
};

export type StagingBuild = {
  time: number;
  branch: string;
  duration: number;
};

export type ActivityOnline = {
  time: number;
  online: number;
};
