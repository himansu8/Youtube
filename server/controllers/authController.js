import mongoose from "mongoose";
import userModel from '../models/userModel.js'
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


export async function signup(req, res, next) {
  try {
    let { name, email, password } = req.body;
    password = await bcrypt.hash(password, 12)

    let userData = {
      name,
      email,
      password
    }

    await userModel.create(userData);

    res.status(200).json("user signup successfully")
  } catch (error) {
    console.log(error)
    next(error)
    //next(createError(404,"signup error"))
  }
}

export async function signin(req, res, next) {
  try {
    let { name } = req.body;
    let userFound = await userModel.findOne({ name: name })
    if (!userFound) {
      return next(createError(404, "User Not Found"))
    }

    let matchPassword = await bcrypt.compare(req.body.password, userFound.password)
    if (!matchPassword) {
      return next(createError(404, "invalid password"))
    }
    const token = jwt.sign({ id: userFound._id }, config.PRIVATE_KEY)
    const {password, ...others} =  userFound._doc

    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json(others)

  } catch (error) {
    console.log(error)
    next(error)
    //next(createError(404,"signup error"))
  }
}
