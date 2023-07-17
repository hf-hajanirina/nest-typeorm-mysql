import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCreatedListener } from './listeners/user-created.listener';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

const updateUserDto: UpdateUserDto = {
  firstName: 'firstName #3',
  lastName: 'lastName #3',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UserCreatedListener,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createUserDto: CreateUserDto) =>
                Promise.resolve({ id: 1, ...createUserDto }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #2',
                lastName: 'lastName #1',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id, updateUserDto: UpdateUserDto) =>
                Promise.resolve({ id, ...updateUserDto }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(usersController.create(createUserDto)).resolves.toEqual({
        id: 1,
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne(1)).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        id: 1,
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update the user', async () => {
      const id = 1;
      expect(usersController.update(id, updateUserDto)).resolves.toEqual({
        id,
        ...updateUserDto,
      });
      expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      expect(usersController.remove(2)).toBeUndefined();
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
