import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {

    const userId = req.user.id;

    // ✅ If new address is default -> unset old default
    if (req.body.isDefault) {
      await Address.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    const address = await Address.create({
      ...req.body,
      user: userId
    });

    res.status(201).json(address);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({
    user: req.user.id
  }).sort({ isDefault: -1 });

  res.json(addresses);
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (req.body.isDefault) {
    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );
  }

  const updated = await Address.findOneAndUpdate(
    { _id: id, user: userId },
    req.body,
    { new: true }
  );

  res.json(updated);
};

export const deleteAddress = async (req, res) => {

  await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  res.json({
    message: "Address deleted"
  });
};
