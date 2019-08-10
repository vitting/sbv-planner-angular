import { NameOfUserPipe } from './name-of-user.pipe';

describe('NameOfUserPipe', () => {
  it('create an instance', () => {
    const pipe = new NameOfUserPipe();
    expect(pipe).toBeTruthy();
  });
});
