import Video from "../models/Video";


// Video.find({},(error, videos) => {
//     res.render("home", {pageTitle: "Home", videos});
// });


export const home = async(req,res) => {
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", {pageTitle: "Home", videos});
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

// export const postUpload = async(req, res) => {
//     const { title, description, hashtags } = req.body;
//     const video = new Video({
//         title: title,
//         description: description,
//         createdAt: Date.now(),
//         hashtags: hashtags.split(",").map((word) => `#${word}`),
//         meta: {
//             views:0,
//             rating:0,
//         },
//     });
//     await video.save();
//     return res.redirect("/");
// };

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create ({
            title: title,
            description: description,
            hashtags: hashtags.split(",").map((word) => `#${word}`),
        });
        return res.redirect("/");
    } catch(error) {
        return res.render("upload", 
        {pageTitle: "Upload Video",
        errorMessage: error._message,});
    }
};