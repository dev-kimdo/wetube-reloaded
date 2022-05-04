import Video from "../models/Video";

// export const home = (req,res) => {
//     Video.find({},(error, videos) => {
//     if(error) {
//         return res.render("server-error");
//     }
//     return res.render("home", {pageTitle: "Home", videos});
// });
// };

export const home = async(req,res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", {pageTitle: "Home", videos});
    } catch {
        return res.render("server-error");
    }
};

export const watch = (req, res) => {
    const { id } = req.params;  //const id = req.params.id; 와 동일함 (현재 작성된 것은 ES6를 사용한 거임)
    return res.render("watch", {pageTitle: `Watching`});
};
export const getEdit = (req,res) => {
    const { id } = req.params;  //const id = req.params.id; 와 동일함 (현재 작성된 것은 ES6를 사용한 거임)
    return res.render("edit", {pageTitle: `Editing`});
};
export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body; //const title = req.body.title; 과 동일
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = (req, res) => {

    return res.redirect("/");
};