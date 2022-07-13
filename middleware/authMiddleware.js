const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const appUser = require("../models/appUserModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { 
        try {
            
            token = JSON.parse(req.headers.authorization.split(" ")[1]);
            // token = req.headers.authorization
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.appUser = await appUser.findById(decoded.id).select('-password')
            console.log("VERIFIED!")
            next();

    } catch (err) {
        console.log(err);
        res.status(401)
        throw new Error("Not authorized");
    }

    }
    if (!token) {
        res.status(401)
        throw new Error("No token");
    }
    });
module.exports = {protect};
