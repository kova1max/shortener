import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Link } from './entities/link.entity';
import { LinkService } from './link.service';
import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  public async create(@Body() data: CreateParameter): Promise<any> {
    return this.linkService.create(data);
  }

  @Get()
  public async findAll(@Query() filter: FindParameter = {}): Promise<Link[]> {
    return this.linkService.findAll(
      { ...filter, relations: undefined },
      filter?.relations?.split(',')
    );
  }

  @Get(':id')
  public async findOneByID(
    @Param('id') id: string,
    @Query('relations') relations: string
  ): Promise<Link | null> {
    return this.linkService.findOneById(+id, relations?.split(','));
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateParameter
  ): Promise<Link> {
    return this.linkService.update(+id, data);
  }

  @Delete(':id')
  public async removeById(@Param('id') id: string): Promise<DeleteResponse> {
    return this.linkService.remove(+id);
  }
}
