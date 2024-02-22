import express from 'express';
import dotenv  from 'dotenv';
import conectarDB from './config/db.js';

//import routes
import veterinarioRoutes from  './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';


const app = express();
app.use(express.json());//leer datos JSON enviados en una solicitud HTTP.

dotenv.config();
conectarDB();


//url de routes
app.use('/veterinarios', veterinarioRoutes); 
app.use('/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT);