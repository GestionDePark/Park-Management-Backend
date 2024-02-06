import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    private readonly logger = new Logger(AdminGuard.name);
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.logger.log(
            `Received admin auth request: ${context.switchToHttp().getRequest().headers}`,
        );

        if (!(await this.authService.isAuthenticated(context))) {
            throw new UnauthorizedException();
        }

        return this.authService.isAdmin(context.switchToHttp().getRequest());
    }
}
