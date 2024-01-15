import express from "express";
import { getUserByEmail, createUser } from "../../db/users";
import { random, authentication } from "../helpers/index";

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
        password: authentication(password, salt),
        salt,
      },
    });

    res.status(201).json({ message: "User created", user }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
