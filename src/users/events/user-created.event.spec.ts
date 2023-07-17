import { UserCreatedEvent } from './user-created.event';

describe('UserCreatedEvent', () => {
  it('should be defined', () => {
    expect(new UserCreatedEvent()).toBeDefined();
  });
});
