import Veterinario from "../models/Veterinario.js";

const registrar = async(req,res,next) =>{
    const{email} = req.body;

    const existeUsuario = await Veterinario.findOne({email});
    if(existeUsuario){
        const error = new Error('Usuario ya registrado!');
        return res.status(400).json({msg : error.message});
    };

    try {
        const veterinario = new Veterinario(req.body);
        await veterinario.save();
        res.json(veterinario)
    } catch (error) {
        res.send(error);
        next();
    };
    

};

const cofirmarCuenta = async(req,res,next) =>{
    const {token} = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});
    if(!usuarioConfirmar) {
        const error = new Error('Token no válido!');
        return res.status(404).json({msg : error.message});
    };

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.status(200).json({msg : 'Usuario confirmado correctamente!'});
    } catch (error) {
        res.status(500).json({msg : `${error}`});
    }

};


export { 
    registrar,
    cofirmarCuenta
}