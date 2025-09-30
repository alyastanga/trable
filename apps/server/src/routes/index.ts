import { Router } from "express";

import { healthRoute, userRoute } from "@/controller";

const indexRouter = Router();

indexRouter.get("/health", healthRoute);
indexRouter.get("/user", userRoute);

export default indexRouter;
