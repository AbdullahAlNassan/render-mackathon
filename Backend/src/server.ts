import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`server is wporking ${env.port} in ${env.nodeEnv} mode`);
});
