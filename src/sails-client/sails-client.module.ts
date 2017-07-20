import { ISailsClientConfig, SAILS_CLIENT_CONFIG } from './sails-client.config';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IO_INSTANCE } from './../io';
import { SailsClient } from './sails-client.service';

export function provideSailsClient(config: ISailsClientConfig, io?: any) {
  return new SailsClient(config, io);
}

@NgModule({
  imports: [
    CommonModule
  ]
})
export class SailsClientModule {
  public static configureClient(config: ISailsClientConfig, ioInstance?: any): ModuleWithProviders {
    return {
      ngModule: SailsClientModule,
      providers: [
        { provide: SAILS_CLIENT_CONFIG, useValue: config },
        { provide: IO_INSTANCE, useValue: ioInstance },
        {
          provide: SailsClient,
          useFactory: provideSailsClient,
          deps: [SAILS_CLIENT_CONFIG, IO_INSTANCE]
        }
      ]
    };
  }
}
