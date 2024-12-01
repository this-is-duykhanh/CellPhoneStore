const validator = require('validator');

const checkProuductValidation = (req, res, next) => {
    const { name, price, category, stock, variants, image } = req.body;

    // Check if the main image exists in req.files (which is an array)

    const hasMainImage =
        (req.files && req.files.some((file) => file.fieldname === 'image')) ||
        image;

    if (!name || !price || !category || !stock || !hasMainImage) {
        console.log(name, price, category, stock, hasMainImage);
        return res.status(400).json({
            message: 'All fields including the main image are required',
        });
    }

    // Name validation
    if (!validator.isLength(name, { min: 1, max: 255 })) {
        return res
            .status(400)
            .json({ message: 'Name must be between 5 and 255 characters' });
    }

    // Category validation
    if (!validator.isLength(category, { min: 1, max: 255 })) {
        return res
            .status(400)
            .json({ message: 'Category must be between 5 and 255 characters' });
    }

    // Price validation (must be a number)
    if (!validator.isNumeric(price)) {
        return res.status(400).json({ message: 'Price must be a number' });
    }

    // Stock validation (must be a number)
    if (!validator.isNumeric(stock)) {
        return res.status(400).json({ message: 'Stock must be a number' });
    }

    // Variants validation

    if (variants && !Array.isArray(variants)) {
        return res.status(400).json({ message: 'Variants must be an array' });
    }

    if (variants) {
        for (const variant of variants) {
            const { name, stock, price } = variant;

            if (!name || !stock || !price) {
                return res.status(400).json({
                    message: 'Name, stock, and price are required',
                    variant,
                });
            }

            if (!validator.isLength(name, { min: 1, max: 255 })) {
                return res.status(400).json({
                    message: 'Name must be between 1 and 255 characters',
                });
            }

            if (!validator.isNumeric(stock)) {
                return res
                    .status(400)
                    .json({ message: 'Stock must be a number' });
            }

            if (!validator.isNumeric(price)) {
                return res
                    .status(400)
                    .json({ message: 'Price must be a number' });
            }
        }
    }
    next();
};

module.exports = { checkProuductValidation };
