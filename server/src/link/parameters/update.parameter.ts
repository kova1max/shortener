import { ApiProperty } from '@nestjs/swagger';

export class UpdateParameter {
  @ApiProperty({
    type: 'string',
    example: 'https://example.com/something?param1=value1&param2=value2#hash',
    required: false,
  })
  public readonly origin?: string;
}
