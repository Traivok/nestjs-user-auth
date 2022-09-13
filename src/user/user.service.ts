import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto }      from './dto/create-user.dto';
import { UpdateUserDto }      from './dto/update-user.dto';
import { User }               from './entities/user.entity';
import { InjectRepository }   from '@nestjs/typeorm';
import { Repository }         from 'typeorm';
import { PageDto }            from '../commons/pagination/page.dto';
import { PageOptionsDto }     from '../commons/pagination/page-options.dto';
import PageMetaDto            from '../commons/pagination/page-meta.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(createUserDto);

    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findAllPaginated(options: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.userRepo.createQueryBuilder('user');

    queryBuilder.orderBy('user.createdAt', options.order)
      .skip(options.skip)
      .take(options.take);

    const [ users, itemCount ] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: options });

    return new PageDto<User>(users, pageMetaDto)
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepo.findOneBy({ id }) ?? undefined;
  }

  async findOneOrFail(id: number): Promise<User> {
    return await this.userRepo.findOneByOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneOrFail(id);
    return this.userRepo.save({ ...user, ...updateUserDto });
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneOrFail(id);
    return await this.userRepo.remove(user);
  }
}
