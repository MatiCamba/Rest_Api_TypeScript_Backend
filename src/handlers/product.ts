import { Request, Response } from 'express';
/* import { check, validationResult } from 'express-validator'; */
import Product from '../models/Product.model';
import colors from "colors";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price', 'availability'],
            order: [['id', 'ASC']],
            limit: 10
        });
        res.json({ data: products });

    } catch (error) {
        console.log(colors.bgRed (error));
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ data: product });

    } catch (error) {
        console.log(colors.bgRed (error));
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        /* // Validacion
        await check('name')
            .notEmpty().withMessage('Ingresa un nombre')
            .run(req);
            
        await check('price')
            .notEmpty().withMessage('Ingresa un precio')
            .isNumeric().withMessage('El precio debe ser un Numero')
            .custom((value) => value > 0).withMessage('El precio debe ser mayor a 0')
            .run(req);

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } */

        const product = await Product.create(req.body);
        res.status(201).json({ data: product });

    } catch (error) {
        console.log(colors.bgRed (error));
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await product.update(req.body);
        await product.save(); // lo guardamos en la base de datos
        res.json({ data: product, message: 'Producto actualizado' });

    } catch (error) {
        console.log(colors.bgRed (error));
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateProductAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        product.availability = !product.dataValues.availability;
        await product.save(); // lo guardamos en la base de datos
        res.json({ data: product, message: 'Producto actualizado' });

    } catch (error) {
        console.log(colors.bgRed (error));
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await product.destroy();
        res.json({ message: 'Producto eliminado' });

    } catch (error) {
        console.log(colors.bgRed (error));
        res.status(500).json({ message: 'Internal Server Error' });
    }
}