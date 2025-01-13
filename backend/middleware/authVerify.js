const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY;
        const token =req.headers.authorization.split(' ')[1];

        if (!req.headers.authorization) {
            return res.status(401).json({
                data: [],
                status: "error",
                error: "Login required",
            });
        }
        console.log('Received Token:', token);
         // Extract token
        const decoded = jwt.verify(token, secretKey);
         // Log the token
        console.log('Decoded Token:', decoded);
        if (!decoded) {
            return res.status(401).json({
                data: [],
                status: "error",
                error: "Login required",
            });
        }

        req.user = decoded; // Attach decoded token data to request
        next();
    } catch (error) {
        res.status(403).json({
            data: [],
            status: "error",
            error: "Invalid or expired token",
        });
    }
};

module.exports = authVerify;
