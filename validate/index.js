exports.PostValidator = (req, res, next) => {

    req.check("title", "Title can't be empty").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4, max: 150
    });

    req.check("body", "Body can't be empty").notEmpty();
    req.check("body", "Body must be between 4 to 2000 characters").isLength({
        min: 4, max: 2000
    });

    const errors=req.validationErrors();

    if(errors){
        const firstError=errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError});
    }
    next();
}

exports.userValidator= (req,res,next)=>{

    req.check("name","Name can't be empty").notEmpty();
    req.check("name","Name must be between 3 to 40 characters").isLength({
        min:3,max: 40
    });
    req.check("email","email must be between 3 to 100 character").matches(/.+\@.+\.+/)
    .withMessage("Email must contain @")
    .isLength({min:3,max:100})

    req.check("password","password can't be empty").notEmpty();
    req.check("password").isLength({
        min:6,max: 40
    }).withMessage("Password must contain at least 6 character")
    .matches(/\d/).withMessage("Password must contain a number")

    const errors=req.validationErrors();

    if(errors){
        const firstError=errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError});
    }
    next();

}