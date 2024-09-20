import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductAvailability,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: "Laptop"
 *         price:
 *           type: number
 *           description: The product price
 *           example: 1000
 *         availability:
 *           type: boolean
 *           description: The product availability
 *       required:
 *         - name
 *         - price
 *         - availability
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get all products
 *          tags: [products]
 *          description: Get all products
 *          responses:
 *             200:
 *                description: Success
 *                content:
 *                 application/json:
 *                  schema:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [products]
 *     description: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [products]
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [products]
 *     description: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 1000
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product availability by ID
 *     tags: [products]
 *     description: Update a product availability by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [products]
 *     description: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: string
 *              value: "Product deleted"
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 */

//Routing
router.get("/", getProducts);

router.get(
  "/:id",

  // Validacion
  param("id")
    .notEmpty()
    .withMessage("Ingresa un ID")
    .isNumeric()
    .withMessage("El ID debe ser un Numero"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",

  // Validacion
  body("name").notEmpty().withMessage("Ingresa un nombre"),

  body("price")
    .notEmpty()
    .withMessage("Ingresa un precio")
    .isNumeric()
    .withMessage("El precio debe ser un Numero")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Ingresa un ID")
    .isNumeric()
    .withMessage("El ID debe ser un Numero"),
  body("name").notEmpty().withMessage("Ingresa un nombre"),

  body("price")
    .notEmpty()
    .withMessage("Ingresa un precio")
    .isNumeric()
    .withMessage("El precio debe ser un Numero")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Ingresa un ID")
    .isNumeric()
    .withMessage("El ID debe ser un Numero"),
  handleInputErrors,
  updateProductAvailability
);

router.delete(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Ingresa un ID")
    .isNumeric()
    .withMessage("El ID debe ser un Numero"),
  handleInputErrors,
  deleteProduct
);

export default router;
