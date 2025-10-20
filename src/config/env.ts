const getEnvVar = (key: string): string | undefined => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[key] as string | undefined;
  }
  return undefined;
};

export const env = {
  NEWSAPI_KEY: getEnvVar("VITE_NEWSAPI_KEY"),
  GUARDIAN_KEY: getEnvVar("VITE_GUARDIAN_KEY"),
  NYT_KEY: getEnvVar("VITE_NYT_KEY"),
};
