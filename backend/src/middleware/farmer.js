export const farmerOnly = (req, res, next) => {
  if (req.user.role !== "Farmer" || !req.user.isFarmerApproved) {
    return res.status(403).json({ message: "Approved farmer access only" });
  }
  next();
};
