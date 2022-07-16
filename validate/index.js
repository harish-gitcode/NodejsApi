exports.PostValidator = (req, rees, next) => {

    req.check("title", "Title can't be empty").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4, max: 150
    });

    req.check("body", "Body can't be empty").notEmpty();
    req.check("body", "Body must be between 4 to 2000 characters").isLength({
        min: 4, max: 2000
    });

    const errors=req.validateErrors();

    if(errors){
        const firstError=errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError});
    }
    next();
}