import User from "../models/User.js";

/*READ USER*/

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/*UPDATE USER*/

export const updateUser = async (req, res) => {
  try {
    const { _id, name } = req.body;
    await User.updateOne(
      { _id: _id },
      { $set: { name: name } }
    );
    res
      .status(200)
      .json({ message: "Account updated successfully.", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

/*DELETE USER*/

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `Deleted user ${deletedUser.name} and all their branches.`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting user.", error: error });
  }
};
