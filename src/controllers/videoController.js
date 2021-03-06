import { redirect } from "express/lib/response";
import Video from "../models/Video";

// Video.find({},(error, videos) => {
//     res.render("home", {pageTitle: "Home", videos});
// });


export const home = async(req,res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"});
    // console.log(videos);
    return res.render("home", {pageTitle: "Home", videos});
};

export const watch = async(req, res) => {
    const { id } = req.params; //const id = req.params.id; 와 동일함 (현재 작성된 것은 ES6를 사용한 거임)
    const video = await Video.findById(id);
    // console.log(video);
    if(video) {
        return res.render("watch", {pageTitle: video.title, video});
    } else {
        return res.status(404).render("404", {pageTitle: "Video Not Found."});
    }
};

export const getEdit = async(req,res) => {
    const { id } = req.params;
    const video = await Video.findById(id);  //const id = req.params.id; 와 동일함 (현재 작성된 것은 ES6를 사용한 거임)
    if(!video) {
        return res.status(404).render("404", {pageTitle: "Video Not Found."});
    } else {
        return res.render("edit", {pageTitle: `Edit ${video.title}`, video});
    }
};

// export const postEdit = async(req,res) => {
//     const { id } = req.params;
//     const {title, description, hashtags} = req.body;
//     const video = await Video.findById(id);
//     if(!video) {
//         return res.render("404", {pageTitle: "Video Not Found."});
//     } else {
//         video.title = title;
//         video.description = description;
//         video.hashtags = hashtags.split(",").map((word)=> word.startsWith('#') ? word : `#${word}`);
//         await video.save();
//         return res.redirect(`/videos/${id}`);
//     }
// };

export const postEdit = async(req,res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id:id});
    if(!video) {
        return res.render("404", {pageTitle: "Video Not Found."});
    } else {
        await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect(`/videos/${id}`);
    }
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
            hashtags : Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch(error) {
        return res.status(400).render("upload", 
        {pageTitle: "Upload Video",
        errorMessage: error._message,});
    }
};    

export const deleteVideo = async(req,res) => {
    const {id} = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async(req,res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword,"i")
            },
        });
        console.log(videos);
    }
    return res.render("search", {pageTitle: "Search", videos});
}