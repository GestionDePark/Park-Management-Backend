import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';
import { JobModule } from './job/job.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './empolyee/employee.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        CryptoModule,
        JobModule,
        PrismaModule,
        EmployeeModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, CryptoService],
})
export class AppModule {}
