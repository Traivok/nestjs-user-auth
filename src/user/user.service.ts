import { Injectable, Logger, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDto }                                                  from './dto/create-user.dto';
import { UpdateUserDto }                                                  from './dto/update-user.dto';
import { User }                                                           from './entities/user.entity';
import { InjectRepository }                                               from '@nestjs/typeorm';
import { Repository }                                                     from 'typeorm';

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
