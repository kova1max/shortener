import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class FindParameter {
  @ApiProperty({
    type: 'string',
    example: 'https://example.com/something?param1=value1&param2=value2#hash',
    required: false,
  })
  public readonly origin?: string;

  @ApiProperty({ type: 'number', example: 1, required: false })
  public readonly user?: User;

  @ApiProperty({ type: 'string', example: 'links', required: false })
  public relations?: string;
}
