import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Link } from './entities/link.entity';

import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>
  ) {}

  public async create(data: CreateParameter): Promise<any> {
    const link = new Link();

    try {
      new URL(data.origin);
    } catch (e) {
      throw new HttpException(
        'Origin URL is not valid',
        HttpStatus.BAD_REQUEST
      );
    }

    link.origin = data.origin;
    link.short = CommonService.generateBytes(10);
    link.user = data.user;

    try {
      return this.linkRepository.save(link);
    } catch (e) {
      throw new HttpException(
        'Link create unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findAll(
    filter: FindParameter = {},
    relations: string[] = []
  ): Promise<Link[]> {
    try {
      return this.linkRepository.find({ where: filter, relations });
    } catch (e) {
      throw new HttpException(
        'Links find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findOneById(
    id: number,
    relations: string[] = []
  ): Promise<Link> {
    try {
      return this.linkRepository.findOne({
        where: { id },
        relations,
      });
    } catch (e) {
      throw new HttpException(
        'Link find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async update(id: number, data: UpdateParameter): Promise<Link> {
    try {
      return this.linkRepository.save({ id, ...data });
    } catch (e) {
      throw new HttpException(
        'Link update unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async remove(id: number): Promise<DeleteResponse> {
    try {
      return {
        isLinkDeleted:
          (await this.linkRepository.delete({ id })).affected === 1,
      };
    } catch (e) {
      throw new HttpException(
        'Link remove unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
