import {
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/crypto.service';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedRequest } from '../utils/object.utils';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private cryptoService: CryptoService,
        private configService: ConfigService,
    ) {}

    async signIn(email: string, password: string): Promise<{ token: string }> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        this.logger.log(`User queried: ${user.id}`);
        const isMatch = await this.cryptoService.isMatch(
            password,
            user?.password,
        );
        this.logger.log(`Authorized: ${isMatch}`);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = {
            sub: user.id,
            username: user.email,
        };

        return {
            token: await this.jwtService.signAsync(payload, {
                secret: this.configService.get('SECRET_PASS'),
            }),
        };
    }

    async isAuthenticated(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            request.user = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('SECRET_PASS'),
            });
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    async isAdmin(request: AuthenticatedRequest) {
        const user = await this.userService.findOne(request.user.sub);
        return user.isAdmin;
    }

    private extractTokenFromHeader(request: {
        headers: { authorization: string };
    }): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
