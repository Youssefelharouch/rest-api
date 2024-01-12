import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt : {type:String,select:false},
    sessionToken: {type:String,select:false}
  },
});

export const UserModel = mongoose.model("User",UserSchema)

// This function retrieves all users from the database
export const getUser  = () => {
    UserModel.find();
}
// This function retrieves a user from the database by their email
export const getUserByEmail = (email:string) => {
    UserModel.findOne({email});
}
// This function retrieves a user from the database by their session token
export const getUserBySessionToken = (sessionToken:string) => {
    UserModel.findOne({'authentication.sessionToken':sessionToken});
}

// This function retrieves a user from the database by their ID
export const getUserById  = (id:string) => {
    UserModel.findById(id);
}
