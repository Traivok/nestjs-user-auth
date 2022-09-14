import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard }                  from '@nestjs/passport';

export const ApiLocalAuth = () => applyDecorators(
  UseGuards(AuthGuard('local')));


