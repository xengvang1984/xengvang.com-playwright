export const BaseUrl = {
  LOCAL: "http://localhost:3000",
  DEVELOPMENT: "https://dev.xengvang.com",
  QA: "https://qa.xengvang.com",
  STAGING: "https://staging.xengvang.com",
  PRODUCTION: "https://www.xengvang.com",
} as const;
export type BaseUrl = typeof BaseUrl[keyof typeof BaseUrl];