import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth }              from '@nestjs/swagger';
import { AuthGuard }                  from '@nestjs/passport';

export const ApiJwtAuth = (name: string = 'access_token') => applyDecorators(
  ApiBearerAuth(name),
  UseGuards(AuthGuard('jwt')));
