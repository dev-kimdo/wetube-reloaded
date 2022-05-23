import express from "express";
import morgan from "morgan";
import session  from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { application } from "express";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd()+"/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: process.env.COOKIE_SECRET, 
    resave: false,  // 웹사이트의 모든 방문자들에게 쿠키를 주고 세션을 DB에 저장하는 기능을 끔(결국 로그인한 사용자의 쿠키와 세션만 저장)
    saveUninitialized: false,  // 웹사이트의 모든 방문자들에게 쿠키를 주고 세션을 DB에 저장하는 기능을 끔(결국 로그인한 사용자의 쿠키와 세션만 저장)
    // cookie: {
    //     maxAge: 20000,
    // },
    store: MongoStore.create({mongoUrl: process.env.DB_URL })
}));

app.get("/add-one", (req,res,next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}\n${req.session.potato}`);
})

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;