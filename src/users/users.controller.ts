import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Public, ResponseMessage, User} from 'src/decorator/customize';
import {IUser} from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create a new User')
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    let newUser = await this.usersService.create(createUserDto, user);

    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  @Get()
  @ResponseMessage("Fetch user with paginate")
  findAll(
    @Query("page") currentPage: string,
    @Query("limit") limit: string,
    @Query() qs: string,) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch user by id")
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(id);
    return foundUser;
  }

  @Patch()
  @ResponseMessage('Update a User')
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    let updateUser = await this.usersService.update(updateUserDto, user)
    return updateUser;
  }

  @Delete(':id')
  @ResponseMessage("Delete a User")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
