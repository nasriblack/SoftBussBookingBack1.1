import { createServer } from "./app";
import config from "./config/config";

createServer().app.listen(config.port, () => {
  console.log("checking the URL", process.env.DATABASE_URL);
  console.log(`Server running on port ${config.port}`);
});
