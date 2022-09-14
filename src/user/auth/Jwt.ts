import { ApiExposedProperty } from '../../commons/decorators/api-exposed-property.decorator';

export class JwtPayload  {
  @ApiExposedProperty()
  id: number;
}

export class Jwt {
  @ApiExposedProperty()
  access_token: string;
}