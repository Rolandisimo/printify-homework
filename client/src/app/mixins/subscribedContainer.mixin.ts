import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

type Constructor<T = {}> = new (...args: any[]) => T;

export const subscribedContainerMixin = <T extends Constructor>(base: T = class {} as T) => {
  return class extends base implements OnDestroy {
    destroyed$ = new Subject<void>();

    ngOnDestroy() {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
  };
};
