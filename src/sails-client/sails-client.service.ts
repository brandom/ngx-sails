import { ISailsRequest, ISailsRequestOpts, ISailsResponse } from './interfaces';
import { SocketIOConnectOpts, SocketIOSocket, io } from '../io';

import { ISailsClientConfig } from './sails-client.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { RequestMethod } from './enums';
import { SailsRequest } from './sails-request';
import { clean } from './utils';

const SAILS_SDK_VERSION_KEY = '__sails_io_sdk_version';
const SAILS_SDK_VERSION_VALUE = '1.1.12';

@Injectable()
export class SailsClient {

  private io: SocketIOSocket;
  private defaultHeaders: any;

  constructor(config: ISailsClientConfig, ioInstance?: any) {
    const query = { [SAILS_SDK_VERSION_KEY]: SAILS_SDK_VERSION_VALUE };
    const options: SocketIOConnectOpts = { transports: ['websocket'], query };
    let uri;
    try {
      uri = config.uri || window.location.origin;
    } catch (e) {
      throw new Error('SailsClient: Could not configure socket.io connection. Please provide the URI in the socket config.');
    }
    Object.assign(options, config.ioOptions);
    this.defaultHeaders = config.headers;
    ioInstance ? this.io = ioInstance : this.io = io(uri, options);
  }

  get(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.GET, undefined, options);
  }

  post(url: string, body?: any, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.POST, body, options);
  }

  put(url: string, body?: any, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.PUT, body, options);
  }

  delete(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.DELETE, undefined, options);
  }

  options(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.OPTIONS, undefined, options);
  }

  head(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.HEAD, undefined, options);
  }

  patch(url: string, body: any, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.PATCH, body, options);
  }

  on(event: string): Observable<any> {
    let nextFunc: (msg: any) => void;

    return Observable.create((obs: Observer<any>) => {
      nextFunc = (msg: any) => obs.next(msg);
      this.io.on(event, nextFunc);
      return () => this.io.off(event, nextFunc);
    });
  }

  private sendRequest(url: string, method: RequestMethod, body?: any, options: ISailsRequestOpts = {}) {
    let request: ISailsRequest = { url, method, body };
    Object.assign(request,
      {
        params: options.params || options.search,
        headers: Object.assign({}, this.defaultHeaders, options.headers)
      }
    );
    return SailsRequest.send(clean(request), this.io);
  }
}
