import mongoose from "mongoose";
import shortid from 'shortid';
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
        default :  shortid.generate()
    },
    confirmado : {
        type : Boolean,
        default : false
    }
    
});

//hashear el password antes de guardar en la DB
veterinarioSchema.pre('save', function(next){
    if(!this.isModified('password')) next();

    this.password =  bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
})


const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;