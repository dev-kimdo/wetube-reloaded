import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); // 위의 두 코드를 한 문장으로 요약한 코드
// videoRouter.get("/upload", getUpload);
// videoRouter.post("/upload", postUpload);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo); 
videoRouter.route("/upload").get(getUpload).post(postUpload); // 위의 두 코드를 한 문장으로 요약한 코드
export default videoRouter; 