import { ApiExposedProperty } from '../../commons/decorators/api-exposed-property.decorator';

export class JwtPayload {
  @ApiExposedProperty()
  username: string;

  @ApiExposedProperty()
  userId: number;
}

export class Jwt {
  @ApiExposedProperty()
  access_token: string;
}