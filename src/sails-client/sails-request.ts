import { IRawSailsResponse, ISailsResponse } from './interfaces';
import { SailsError, SailsResponse } from './sails-response';

import { ISailsRequest } from './index';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SocketIOSocket } from '../io';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';

export class SailsRequest {
  static send(request: ISailsRequest, io: SocketIOSocket, errorsSubject: Subject<SailsError>) {
    const { method } = request;

    request.headers = lowerCaseHeaders(request.headers);

    return Observable.create((obs: Observer<IRawSailsResponse>) => {
      io.emit(method, request, (rawResponse: IRawSailsResponse) => {
        if (rawResponse.statusCode >= 400) {
          const error = new SailsError(rawResponse, request);
          errorsSubject.next(error);
          obs.error(error);
        } else {
          obs.next(rawResponse);
        }
        obs.complete();
      });
    }).pipe(map((response: IRawSailsResponse) => new SailsResponse(response, request)));
  }
}

function lowerCaseHeaders(headers: any) {
  Object.keys(headers).forEach(header => {
    if (header.toLowerCase() !== header) {
      headers[header.toLowerCase()] = headers[header];
      delete headers[header];
    }
  });

  return headers;
}
