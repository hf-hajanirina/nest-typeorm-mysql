import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'email #1',
  password: 'pwd #1',
};

const updateUserDto: UpdateUserDto = {
  firstName: 'firstName #3',
  lastName: 'lastName #3',
  email: 'email #3',
  password: 'pwd #3',
};

const users = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
    email: 'email #1',
    password: 'pwd #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
    email: 'email #2',
    password: 'pwd #2',
  },
];

const user = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'email #1',
  password: 'pwd #1',
};

describe('UserService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const usersTestingModule: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(users),
            findOneBy: jest.fn().mockResolvedValue(user),
            save: jest.fn().mockResolvedValue(user),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    usersService = usersTestingModule.get<UsersService>(UsersService);
    usersRepository = usersTestingModule.get<Repository<User>>(
      getRepositoryToken(User),
    );
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      expect(usersService.create(createUserDto)).resolves.toEqual(user);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const foundUsers = await usersService.findAll();
      expect(foundUsers).toEqual(users);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findOneSpy = jest.spyOn(usersRepository, 'findOneBy');
      expect(usersService.findOne(1)).resolves.toEqual(user);
      expect(findOneSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('update()', () => {
    it('should successfully update user with the passed value', async () => {
      expect(usersService.update(1, updateUserDto)).resolves.toEqual(
        updateUserDto,
      );
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(usersRepository, 'delete');
      const removedUser = await usersService.remove(2);
      expect(removeSpy).toBeCalledWith(2);
      expect(removedUser).toBeUndefined();
    });
  });
});
