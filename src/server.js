import express from "express";
import res from "express/lib/response";

const PORT = 4000;

const app = express();

const logger = (req,res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const handleHome = (req, res) => {
    return res.send("I love middlewares");
};


app.use(logger);
app.get("/", handleHome);


const handleListening =  (req,res) => console.log(`✅ Server listening on port http://localhost:${PORT}🚀`);


app.listen(PORT, handleListening);