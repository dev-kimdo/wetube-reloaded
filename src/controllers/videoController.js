let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views:1,
        id:1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views:59,
        id:2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views:59,
        id:3,
    },
];

export const trending = (req,res) => {
    return res.render("home", {pageTitle: "Home", videos});
};
export const watch = (req, res) => {
    const { id } = req.params;  //const id = req.params.id; 와 동일함 (현재 작성된 것은 ES6를 사용한 거임)
    const video = videos[id-1];
    return res.render("watch", {pageTitle: `Watching: ${video.title}`, video});
};
export const getEdit = (req,res) => {
    const { id } = req.params;  //const id = req.params.id; 와 동일함 (현재 작성된 것은 ES6를 사용한 거임)
    const video = videos[id-1];
    return res.render("edit", {pageTitle: `Editing: ${video.title}`, video});
};
export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body; //const title = req.body.title; 과 동일
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
};
export const search = (req, res) => res.send("Search");
export const upload = (req,res) => res.send("Upload");
export const deleteVideo = (req,res) => {
    return res.send("Delete Video");
};