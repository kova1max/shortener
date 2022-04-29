import { ApiProperty } from '@nestjs/swagger';

export class FindParameter {
  @ApiProperty({ type: 'string', example: 'J. K. Rowling', required: false })
  public readonly fullName?: string;

  @ApiProperty({ type: 'string', example: 'links', required: false })
  public relations?: string;
}
