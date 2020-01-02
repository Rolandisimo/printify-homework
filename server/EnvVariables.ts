import { cleanEnv, str, num } from "envalid";

export const env = cleanEnv(
  process.env,
  {
    HTTP_PORT: num({
      default: 3001,
    }),
    NODE_ENV: str({
      choices: ["production", "development", "test"],
      default: "development",
    }),
  },
);
