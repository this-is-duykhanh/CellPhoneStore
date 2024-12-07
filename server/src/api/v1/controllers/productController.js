const productService = require('~v1/services/ProductService');

class ProductController {
    async getProductById(req, res) {
        const id = req.params.id;
        try {
            const {code ,message} = await productService.getProductById(id);
            
            
            
            res.status(code).json(message);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async List(req, res) {
        try {
            const product = await productService.List(req.query);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Internal error', error });
        }
    }

    async getProductsByCategory(req, res) {
        const category = req.params.category;
        try {
            const products = await productService.getProductsByCategory({
                category,
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async createProduct(req, res) {
        const data = req.body;
        const files = req.files;
        try {
            const { code, message, product } =
                await productService.createProduct(data, files);
            res.status(code).json({ message, product });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async searchProducts(req, res) {
        const { query } = req.query;

        if (!query) {
            return res
                .status(400)
                .json({ message: 'Query parameter is required.' });
        }

        try {
            const searchResults = await productService.searchProducts(query);
            if (searchResults.status === 200) {
                res.status(200).json(searchResults.data);
            } else {
                res.status(searchResults.status).json(searchResults.message);
            }
        } catch (error) {
            res.status(500).json({
                message: 'Error searching products',
                error,
            });
        }
    }

    async updateProduct(req, res) {
        const id = req.params.id;
        const data = req.body;

        const files = req.files;
        try {
            const { code, message } = await productService.updateProduct(
                id,
                data,
                files,
            );

            res.status(code).json({ message: message, data });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const { code, message } = await productService.deleteProduct(id);
            res.status(code).json({ message: message });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    // async searchProducts(req, res) {
    //     const { q, sort, category, minPrice, maxPrice, minRating, maxRating } =
    //         req.query;

    //     try {
    //         const products = await productService.searchProducts({
    //             q,
    //             sort,
    //             category,
    //             minPrice,
    //             maxPrice,
    //             minRating,
    //             maxRating,
    //         });
    //         res.status(200).json({ success: true, products });
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message,
    //         });
    //     }
    // }


    async addComment(req, res) {
        const { productId } = req.params;
        const { comment } = req.body;

        console.log('req.user', req.user);
        
        const username = req.user?.username || 'Anonymous';

        console.log('username', username);

        try {
            const { code, message, newcomment } = await productService.addComment({
                productId,
                comment,
                username,
            });

            res.status(code).json({ message, newcomment });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getComments(req, res) {
        const { productId } = req.params;

        try {
            const comments = await productService.getComments(productId);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getRatingScore(req, res) {
        const { productId } = req.params;

        try {
            const {code, message} = await productService.getRatingScore(productId);
            res.status(code).json(message);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getProductsByCategory(req, res) {
        const { category } = req.params;

        try {
            const products = await productService.getProductsByCategory({
                category,
            });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }



}

module.exports = new ProductController();
