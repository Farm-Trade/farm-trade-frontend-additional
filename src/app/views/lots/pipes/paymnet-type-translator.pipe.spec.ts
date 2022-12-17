import { PaymentTypeTranslatorPipe } from './paymnet-type-translator.pipe';

describe('PaymentTypeTranslatorPipe', () => {
  it('create an instance', () => {
    const pipe = new PaymentTypeTranslatorPipe();
    expect(pipe).toBeTruthy();
  });
});
