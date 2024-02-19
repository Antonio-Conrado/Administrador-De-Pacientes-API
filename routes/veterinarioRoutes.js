import express from 'express';
const router = express.Router();

//veterinarioController
import { 
    registrar,
    cofirmarCuenta
} from '../controllers/veterinarioController.js';

//veterinarioController
router.post('/' , registrar)
router.get('/confirmar-cuenta/:token' , cofirmarCuenta)
export default router;