const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists (set by auth.js)
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    // Check user's role
    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource.",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;