import { PartialType }        from '@nestjs/swagger';
import { CreateUserDto }      from './create-user.dto';
import { ApiExposedProperty } from '../../commons/decorators/api-exposed-property.decorator';
import { IsBoolean }          from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiExposedProperty({
    apiOptions: {
      description: 'You should be admin to change this field',
      default:     false,
      required:    false,
    },
  })
  @IsBoolean()
  isAdmin: boolean = false;
}
