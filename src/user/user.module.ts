import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptoModule } from '../crypto/crypto.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from '../auth/auth.service';

@Module({
    imports: [CryptoModule, PrismaModule],
    controllers: [UserController],
    providers: [UserService, AuthService],
    exports: [UserService],
})
export class UserModule {}
