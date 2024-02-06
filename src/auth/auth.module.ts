import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_PASS,
            signOptions: {
                expiresIn: '31d',
            },
        }),
        CryptoModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
