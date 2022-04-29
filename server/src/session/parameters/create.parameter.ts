import { ApiProperty } from '@nestjs/swagger';

export class CreateParameter {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly secret: string;
}
