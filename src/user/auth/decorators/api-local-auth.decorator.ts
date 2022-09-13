import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard }                  from '@nestjs/passport';

export const ApiLocalAuth = (name?: string | undefined) => applyDecorators(
  UseGuards(AuthGuard('local')));


