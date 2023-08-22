const Category = require('../models/Category');

exports.getCategory = async (req, res) => {
    try {
      const { category } = req.body;
      console.log(category);
      const categoriesWithProducts = await Category.find({ category: category })
        .populate("product")
        .exec();
      res.json(categoriesWithProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}