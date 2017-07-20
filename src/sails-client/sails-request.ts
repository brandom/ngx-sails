import 'rxjs/add/operator/map';

import { IRawSailsResponse, ISailsResponse } from './interfaces';
import { SailsError, SailsResponse } from './sails-response';

import { ISailsRequest } from './index';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SocketIOSocket } from '../io';

export class SailsRequest {
  static send(request: ISailsRequest, io: SocketIOSocket) {
    const { method } = request;

    request.headers = lowerCaseHeaders(request.headers);

    return Observable.create((obs: Observer<IRawSailsResponse>) => {
      io.emit(method, request, (rawResponse: IRawSailsResponse) => {
        if (rawResponse.statusCode >= 400) {
          obs.error(new SailsError(rawResponse, request));
        } else {
          obs.next(rawResponse);
        }
        obs.complete();
      });
    }).map((response: IRawSailsResponse) => new SailsResponse(response, request));
  }
}

function lowerCaseHeaders(headers: any) {
  if (!headers) {
    return undefined;
  }

  Object.keys(headers).forEach(header => {
    if (header.toLowerCase() !== header) {
      headers[header.toLowerCase()] = headers[header];
      delete headers[header];
    }
  });

  return headers;
}
