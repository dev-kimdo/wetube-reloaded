import express from "express";
import {watch, getEdit, upload, deleteVideo, postEdit} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id(\\d+)/edit",).get(getEdit).post(postEdit); // 위의 두 코드를 한 문장으로 요약한 코드

export default videoRouter; 