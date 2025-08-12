import express from "express";
import { handlerReadiness } from "./handlers/readiness.js";
import { LogResponses } from "./middleware/logResponses.js";
import { handlerReqNm } from "./handlers/reqNum.js";
import { handlerReset } from "./handlers/reset.js";
import { MetricsInc } from "./middleware/fileServerHits.js";
import { handlerValidateChirp } from "./handlers/validateChirp.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(LogResponses);
app.use(MetricsInc);
app.use("/app", express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerReqNm);
app.post("/admin/reset", handlerReset);
app.post("/api/validate_chirp", (req, res, next) => {
    Promise.resolve(handlerValidateChirp(req, res)).catch(next);
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
