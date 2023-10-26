const { Activity } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.body;
    const activity = await Activity.findByPk(id);
    if (activity) {
      await activity.destroy();
      return res.status(200).json({ message: "Activity deleted" });
    }
    return res.status(404).json({ message: "Activity not found" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
