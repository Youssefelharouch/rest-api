import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

// This function retrieves all users from the database
export const getUser = () => {
  UserModel.find();
};
// This function retrieves a user from the database by their email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// This function retrieves a user from the database by their session token
export const getUserBySessionToken = (sessionToken: string) => {
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
};

// This function retrieves a user from the database by their ID
export const getUserById = (id: string) => {
  UserModel.findById(id);
};

// This function creates a new user in the database
export const createUser = (values: Record<string, any>) =>
  // Create a new UserModel instance with the provided values
  // Save the new user to the database
  // Convert the saved user document to a plain JavaScript object and return it
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUser = (id: string) => {
  UserModel.findOneAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
