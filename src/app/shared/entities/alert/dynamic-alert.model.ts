export class DynamicAlert {
  constructor(
    public message: string,
    public status: 'info' | 'success' | 'warn' | 'error' = 'error'
  ) {
  }
}
