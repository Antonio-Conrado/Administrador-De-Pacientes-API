import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res, next) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json( pacienteAlmacenado )
    } catch (error) {
        return res.status(500).json({ msg: `${error}` });
    }
};

const obtenerPacientes = async (req, res, next) => {
    const pacientes = await Paciente.find()
        .where('veterinario')
        .equals(req.veterinario);

    if (!pacientes) {
        res.status(400).json({ msg: 'No hay pacientes aún!' });
    } else {
        res.status(200).json(pacientes);
    };
};

const obtenerPaciente = async (req, res, next) => {

    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado!' });
    };

    //validar por string en vez objectID
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(401).json({ msg: 'No está autorizado para ver la información!' });
    } else {
        res.status(200).json(paciente);
    };
};

const actualizarPaciente = async (req, res, next) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado!' });
    };

    //validar por string en vez objectID
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(401).json({ msg: 'No está autorizado para editar la información!' });
    };

    //actualizar paciente
    const pacienteActualizado = await Paciente.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(pacienteActualizado)
};

const eliminarPaciente = async (req, res, next) => {
    const{id} = req.params;

    const paciente = await Paciente.findById(id);
    
    if(!paciente){
        return res.status(404).json({msg:"No encontrado!"});
    };

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json({ msg: 'No está autorizado para eliminar la información!' });
    }

    try {
        await Paciente.findOneAndDelete({_id :id});
        res.status(200).json({msg : 'Se eliminó correctamente!'});
    } catch (error) {
        res.status(500).json({ msg: `${error}` });
    }
    
};


export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};