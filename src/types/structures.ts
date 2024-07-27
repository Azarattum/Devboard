export type StagingStatus = {
  type: "pending" | "success" | "fail";
  since: number;
};

export type StagingBuild = {
  duration: number;
  branch: string;
  time: number;
};

export type ActivityOnline = {
  online: number;
  time: number;
};
