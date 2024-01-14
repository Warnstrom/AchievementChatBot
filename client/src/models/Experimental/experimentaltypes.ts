export type Option<T> = Some<T> | None;
export class Some<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

export class None {
  isNone(): boolean {
    return true;
  }
}