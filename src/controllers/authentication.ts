import express from "express";
import { getUserByEmail, createUser} from "../../db/users";
import { random, authentication } from "../helpers/index";




export const login = async (req: express.Request, res: express.Response) => {
try {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const hashedPassword = authentication(user.authentication!.salt!,password);

  if(user.authentication!.password !== hashedPassword){
    return res.status(400).json({ message: "password is incorrect" });
  }
  const salt = random()
  user.authentication!.sessionToken = authentication(salt,user!._id.toString());
  await user.save();
  res.cookie("sessionToken", user.authentication!.sessionToken, {
    domain: "localhost",
    path: "/",
  });
  return res.status(200).json({ message: "Logged in", user }).end();
} catch (error) {
  
  console.log(error);
  res.status(500).json({ message: "Internal server error" });

}

 
}







export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: {
        password: authentication(salt,password),
        salt,
      },
    });

    res.status(201).json({ message: "User created", user }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
