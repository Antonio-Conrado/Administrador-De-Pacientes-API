import express from 'express';
const router = express.Router();

//veterinarioController
import { 
    registrar,
    cofirmarCuenta,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
    actualizarPerfil
} from '../controllers/veterinarioController.js';

//middleware auth
import checkAuth from '../middleware/auth.js';

//veterinarioController
router.post('/registrar' , registrar);
router.get('/confirmar-cuenta/:token' , cofirmarCuenta);
router.post('/login', autenticar);
router.post('/reset-password', olvidePassword);
router.route('/reset-password/:token').get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth,perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
export default router;