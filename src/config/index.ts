const dev = process.env.NODE_ENV !== "production";

// TODO: change the production url when deploy the project
export const server = dev
  ? "http://localhost:3000"
  : "https://productionhost.com";
