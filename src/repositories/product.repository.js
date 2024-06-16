import ProductModel from "../models/product.model.js";

class ProductRepository {
    async addProduct(newObject) {
        try {
            let { title, description, price, img, thumbnails, code, category, stock } =
            newObject;
            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const productExist = await ProductModel.findOne({ code: code });

            if (productExist) {
                console.log("El código debe ser único");
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

            return newProduct;

        } catch (error) {
            throw new Error("Error");
        }
    }

    async getProducts(limit = 10, page = 1, sort, query) {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const products = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            
            const totalPages = Math.ceil(totalProducts / limit);
            
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            console.log("Error al recuperar productos en product manager", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                console.log("Producto no encontrado");
                return null;
            }

            console.log("Producto encontrado!");
            return producto;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, productoActualizado);
            if (!actualizado) {
                console.log("No se encuentra che el producto");
                return null;
            }

            console.log("Producto actualizado con exito, como todo en mi vidaa!");
            return actualizado;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async deleteProduct(id) {
        try {
            const deleteado = await ProductModel.findByIdAndDelete(id);

            if (!deleteado) {
                console.log("No se encuentra!");
                return null;
            }

            console.log("Producto eliminado correctamente!");
            return deleteado;
        } catch (error) {
            throw new Error("Error");
        }
    }
}

export default ProductRepository;