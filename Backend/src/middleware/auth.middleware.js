
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || (req.header("Authorization")?.replace("Bearer ", "") || "");

        if (!token) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        const decodedUserData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedUserData._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid access token", data: error.message });
    }
};

export default verifyJWT;
