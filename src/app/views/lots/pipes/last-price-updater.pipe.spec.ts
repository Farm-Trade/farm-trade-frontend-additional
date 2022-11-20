import { LastPriceUpdaterPipe } from './last-price-updater.pipe';

describe('LastPriceUpdaterPipe', () => {
  it('create an instance', () => {
    const pipe = new LastPriceUpdaterPipe();
    expect(pipe).toBeTruthy();
  });
});
