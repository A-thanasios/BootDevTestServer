import express from "express";
import path from "path";
import { handlerReadiness } from "./handlers/readiness.js";
import { LogResponses } from "./middleware/logResponses.js";
import { handlerReqNm } from "./handlers/reqNum.js";
import {handlerReset} from "./handlers/reset.js";
import {MetricsInc} from "./middleware/fileServerHits.js";

const app = express();
const PORT = 8080;

app.use(LogResponses)
app.use(MetricsInc);
app.use("/app", express.static("./src/app"));

app.get("/healthz", handlerReadiness);
app.get("/metrics", handlerReqNm);
app.get("/reset", handlerReset);

app.listen(PORT, () =>
{
    console.log(`Server is running at http://localhost:${PORT}`);
});