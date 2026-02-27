const AuthorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Role '${req.user.role}' is not permitted to perform this action. Required: ${allowedRoles.join(", ")}.`,
      });
    }
    next();
  };
};

export default AuthorizeRole;
