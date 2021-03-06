export const localsMiddleware = (req, res, next) => {
    // if(req.session.loggedIn) {
    //     res.locals.loggedIn = true;
    // }
    res.locals.loggedIn = Boolean(req.session.loggedIn);  // 바로 위의 if 문과 동일한 의미
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    console.log(req.session.user);
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req,res,next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};                                          