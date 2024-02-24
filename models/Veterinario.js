import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const veterinarioSchema = mongoose.Schema({
    nombre : {
        type : String,
        required : true,
        trim : true,
        maxlength : 120
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    telefono : {
        type : String,
        default : null,
        trim : true
    },
    web : {
        type : String,
        default : null
    },
    token : {
        type : String,
        default :  uuidv4()
    },
    confirmado : {
        type : Boolean,
        default : false
    }
    
});

//hashear el password antes de guardar en la DB
veterinarioSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();

    this.password =  await bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
})

veterinarioSchema.methods.comprobarPassword =  async function(passwordForm){
    return await bcrypt.compareSync(passwordForm, this.password);
};


const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;