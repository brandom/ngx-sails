import { InjectionToken } from '@angular/core';
import { SocketIOConnectOpts } from '../io';

export class ISailsClientConfig {
  uri?: string;
  headers?: any;
  options?: SocketIOConnectOpts;
}

export let SAILS_CLIENT_CONFIG = new InjectionToken<ISailsClientConfig>('sails.client.config');
