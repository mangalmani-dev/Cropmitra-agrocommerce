export const adminOnly = (req, res, next) => {
  // 1️⃣ First, make sure req.user exists
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  // 2️⃣ Check role
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "admin access only" });
  }

  // 3️⃣ Proceed if admin
  next();
};
