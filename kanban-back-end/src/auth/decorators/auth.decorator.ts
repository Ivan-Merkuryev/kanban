import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../goards/jwt.goard';

export const Auth = () => UseGuards(JwtAuthGuard);
