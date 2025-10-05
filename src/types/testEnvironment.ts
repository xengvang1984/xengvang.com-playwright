export const TestEnvironment = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  QA: 'qa',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;
export type TestEnvironment = typeof TestEnvironment[keyof typeof TestEnvironment];