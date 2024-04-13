const { UserModel } = require("../Models/userModel");
const ErrorResponse = require("../utils/errorResponce");
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies;
    if (!token) {
        return next (new ErrorResponse("you are not authenticated", 401));
    }
    try {
        const decoded = jwt.verify(token, 'kdjljfkldjsklfjkl')
        req.user = await UserModel.findById(decoded.id)
        next()
    } catch (error) {
        return next (new ErrorResponse("you are not authenticated", 401));
    }
}


exports.isAdmin = (req, res, next)=>{
    if (req.user.role===0) {
        return next (new ErrorResponse("Access denied you must be an admin", 401));
    }
    next()
}