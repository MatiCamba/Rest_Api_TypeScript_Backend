import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'products',
                description: 'API operation related to products'
            }
        ], 
        info: {
            title: 'REST API node.js / Exprsss / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerOptions = {
    customCss: `.topbar-wrapper .link {
        content: img('./logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        display: block;
        width: auto;
        height: 120px;
    }`,
    customSiteTitle: "Documentación REST API Express / Node.js / TypeScript",
}

export default swaggerSpec
export { swaggerUiOptions }
