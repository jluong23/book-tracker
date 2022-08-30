const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const requireAuth = async (req, res, next) => {
    // verify authentication, used for protecting routes. 
    // JWT in req.headers, sent by login request on frontend
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "Authorization token required"});
    }

    const token = authorization.split(' ')[1] //in form Bearer <token>, get the token
    try{
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        // set req.user for next middleware
        req.user = await User.findOne({_id}).select('_id');
        next();
    } catch(error){
        // JWT exists but has been tampered with
        return res.status(401).json({error: "Request is not authorized"});
    }

}

module.exports = {requireAuth}