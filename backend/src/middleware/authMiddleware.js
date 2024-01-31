import { verifyToken } from "../services/jwtService";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// xác thực quyền

// chỉ admin
const authAdminMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                EM: err.message,
                EC: 1,
            });
        }
        // console.log(user);
        if (user?.role === "admin") {
            let tokenDecode = verifyToken(token)
            if (tokenDecode) {
                req.user = tokenDecode
                req.token = token
                next();
            } else {
                return res.status(401).json({
                    EM: "not found admin token decode !",
                    EC: 1,
                });
            }
        } else {
            return res.status(401).json({
                EM: "admin authorization error",
                EC: 1,
            });
        }
    });
};

// chỉ user có id giống id trên param
const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = req.params.userId;
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                EM: err.message,
                EC: 1,
            });
        }
        // console.log(user.id === userId);
        if (user?.id === userId) {
            req.loggedInUserRole = user.role;
            next();
        } else {
            return res.status(401).json({
                EM: "user authorization error",
                EC: 1,
            });
        }
    });
};

// chỉ admin và user đã login
const authLoginMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                EM: err.message,
                EC: 1,
            });
        }
        // console.log(user);
        if (user) {
            next();
        } else {
            return res.status(401).json({
                EM: "user admin authorization error",
                EC: 1,
            });
        }
    });
};

// chỉ admin và user có id giống id trên param
const authAdminUserMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const userId = Number(req.params.id);
    console.log(req.params.id);
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                EM: err.message,
                EC: 1,
            });
        }
        console.log(user);
        if ((user?.role === "admin" || user?.id === userId)) {
            next();
        } else {
            return res.status(401).json({
                EM: "user admin authentication error",
                EC: 1,
            });
        }
    });
};

module.exports = {
    authAdminMiddleWare,
    authUserMiddleWare,
    authLoginMiddleware,
    authAdminUserMiddleWare
};
