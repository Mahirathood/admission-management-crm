// middleware/roleMiddleware.js
module.exports = function (allowedRoles) {
    return (req, res, next) => {

        const userRole = req.headers.role;

        if (!userRole) {
            return res.status(401).json({
                message: "Role header missing"
            });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};