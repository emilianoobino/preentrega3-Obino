import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        required: true,
        index: true, 
        unique: true 
    },
    password: {
        type: String,
        //required: true
    },
    age: {
        type: Number,
        //required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    cart: {
        type: Object
    }
})

const UsuarioModel = mongoose.model("usuario", schema);

export default UsuarioModel; 