import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;

        // If email exist?
        const existing = await prisma.user.findUnique({where: {email}});
        if (existing) return res.status(400).json({error: 'Email already exists!'});

        // Has password
        const hashedPassword = await bcruypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || "buyer"
            },

        });

        return res.status(201).json({message: `${name} created`, user: newUser});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {id: true, name: true, email: true, role: true, createdAt: true},
        });

        return res.json(users);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}