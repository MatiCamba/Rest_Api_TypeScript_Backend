import  express from "express";
import colors from "colors";
import router from "./router";
import  db  from "./config/db";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";


// Conectar Base de Datos 
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        //console.log( colors.magenta( 'Conectado a la base de datos'));
    } catch (error) {
        console.log(error);
        console.log( colors.bgRed.white ('No se pudo conectar a la base de datos'));
    }
}
connectDB();

const server = express();

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }

}
server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan('dev'));


server.use('/api/products', router);
/* server.get('/api', (req, res) => {
    res.json({msg: 'Bienvenido a la API de productos'});
}) */

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export default server;