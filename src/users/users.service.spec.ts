import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const users = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
  },
];

const user = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
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

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
      };
      expect(
        usersService.create({
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await usersService.findAll();
      expect(users).toEqual(users);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(usersRepository, 'findOneBy');
      expect(usersService.findOne(1)).resolves.toEqual(user);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('update()', () => {
    it('should successfully update user with the passed value', async () => {
      const updatedUserDto = {
        firstName: 'firstName #3',
        lastName: 'lastName #3',
      };
      expect(usersService.update(2, updatedUserDto)).resolves.toEqual(
        updatedUserDto,
      );
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(usersRepository, 'delete');
      const retVal = await usersService.remove(2);
      expect(removeSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });
});
