import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';

//import routes
import veterinarioRoutes from  './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';


const app = express();
app.use(express.json());//leer datos JSON enviados en una solicitud HTTP.

dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin : function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //el origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
};

app.use(cors(corsOptions));
//url de routes
app.use('/veterinarios', veterinarioRoutes); 
app.use('/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT);