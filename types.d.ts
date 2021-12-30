declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: "production" | "development" | "stage" | "test";
  }
}
