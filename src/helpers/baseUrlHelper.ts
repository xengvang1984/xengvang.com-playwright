import { BaseUrl } from "../types/baseUrl";
import { TestEnvironment } from "../types/testEnvironment"
import 'dotenv/config'

/**
 * Get the base URL for a specific test environment.
 * @param testEnvironment - The test environment to get the base URL for.
 * @returns The base URL for the specified test environment.
 */
export const getBaseUrl = (testEnvironment: TestEnvironment = process.env.TEST_ENVIRONMENT as TestEnvironment): string => {
  switch (testEnvironment.toLowerCase()) {
    case TestEnvironment.LOCAL:
      return BaseUrl.LOCAL;
    case TestEnvironment.DEVELOPMENT:
      return BaseUrl.DEVELOPMENT;
    case TestEnvironment.QA:
      return BaseUrl.QA;
    case TestEnvironment.STAGING:
      return BaseUrl.STAGING;
    case TestEnvironment.PRODUCTION:
      return BaseUrl.PRODUCTION;
    default:
      throw new Error(`Invalid test environment: ${testEnvironment}. Allowable values are: ${Object.values(TestEnvironment).join(", ")}`);
  }
};