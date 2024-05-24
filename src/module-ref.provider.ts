import { ModuleRef } from '@nestjs/core';
import { Provider } from '@nestjs/common';

export const moduleRefProvider: Provider = {
  provide: ModuleRef,
  useExisting: ModuleRef,
};
