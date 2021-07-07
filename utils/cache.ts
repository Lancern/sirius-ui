export const DEFAULT_TIMEOUT_SEC = 60;
export const DEFUALT_TIMEOUT_MILLISEC = DEFAULT_TIMEOUT_SEC * 1024;  // 1 minute timeout

type PromiseHandle<T> = [
  (value: T) => void,
  (reason?: any) => void,
];

export class CacheBox<T> {
  private readonly _fetcher: () => Promise<T>;
  private readonly _timeout: number;
  private _hasValue: boolean;
  private _isFetching: boolean;
  private _creationTime?: Date;
  private _value?: T;
  private _waitList: PromiseHandle<T>[];

  public constructor(timeout: number, fetcher: () => Promise<T>) {
    this._fetcher = fetcher;
    this._timeout = timeout;
    this._hasValue = false;
    this._isFetching = false;
    this._waitList = [];
  }

  public get(): Promise<T> {
    if (this._hasValue && !this.isStale()) {
      return Promise.resolve(this._value!);
    }

    if (this._hasValue) {
      this._hasValue = false;
      this._creationTime = undefined;
      this._value = undefined;
    }

    if (this._isFetching) {
      return new Promise<T>((resolve, reject) => {
        this._waitList.push([resolve, reject]);
      });
    }

    this._isFetching = true;

    const resolveAllWaitingPromises = (value: T) => {
      for (const [resolve, _] of this._waitList) {
        resolve(value);
      }
      this._waitList = [];
    };
    const rejectAllWaitingPromises = (reason?: any) => {
      for (const [_, reject] of this._waitList) {
        reject(reason);
      }
      this._waitList = [];
    };

    return this._fetcher()
        .then(value => {
          this._hasValue = true;
          this._isFetching = false;
          this._creationTime = new Date();
          this._value = value;
          resolveAllWaitingPromises(value);
          return value;
        }).catch(reason => {
          this._isFetching = false;
          rejectAllWaitingPromises(reason);
          return Promise.reject(reason);
        });
  }

  private isStale(): boolean {
    return new Date().getTime() - this._creationTime!.getTime() > this._timeout;
  }
}
