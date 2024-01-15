import express from "express";
import {register} from "../src/controllers/authentication";

export default (router:express.Router) => {
    router.post("/auth/register",register );
}