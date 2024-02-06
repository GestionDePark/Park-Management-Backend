import { PrismaClient, User } from '@prisma/client';
import 'dotenv/config'
import process from 'process';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import bcrypt from 'bcrypt';

const adminUser: Omit<User, 'id'> = {
    password: process.env.ADMIN_PASS,
    email: process.env.ADMIN_EMAIL,
    lastName: 'admin',
    firstName: 'admin',
    isAdmin: true,
};


(async function() {
    const prisma = new PrismaClient();
    const cryptoSalt = await bcrypt.genSalt();

    if (process.env.ADMIN_PASS && process.env.ADMIN_EMAIL) {
        const databaseAdmin = await prisma.user.findUnique({
            where: {
                email: process.env.ADMIN_EMAIL
            }
        });
        if (databaseAdmin) {
            console.log('Mail already taken, skipping admin seed generation.');
        } else {
            const insertAdmin = await prisma.user.create({
                data: {
                    ...adminUser,
                    password: await bcrypt.hash(adminUser.password, cryptoSalt),
                }
            })
            console.log(`Created seed Admin with email: ${insertAdmin.email} and password: ${adminUser.password}`);
        }
    } else {
        throw new RuntimeException("No admin email and password provided");
    }
})();