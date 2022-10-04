import { Handler } from "express";
import { User } from "../models";


export const all: Handler = async (req, res) => {
    try {
        const users = await User.all()

        res.json(users)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const findByID: Handler = async (req, res) => {
    try {
        const user = await User.findByID(req.params.id);

        if (user) return res.status(200).json(user);

        res.status(404).json({ message: "No se encontro el usuario." });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}


export const addRole: Handler = async (req, res) => {
    try {
        const { userId, role } = req.body
        const success = await User.addRole(userId, role)

        return res.json(success);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const popRole: Handler = async (req, res) => {
    try {
        const { userId, role } = req.body
        const success = await User.popRole(userId, role)

        return res.json(success);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

