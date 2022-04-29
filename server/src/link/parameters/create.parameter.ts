import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class CreateParameter {
  @ApiProperty({
    type: 'string',
    example: 'https://example.com/something?param1=value1&param2=value2#hash',
  })
  public readonly origin: string;

  @ApiProperty({ type: User, example: 1 })
  public readonly user: User;
}
