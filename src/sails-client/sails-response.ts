import { IRawSailsResponse, ISailsRequest } from './interfaces';

export class Response {

  public headers: any;
  public status: number;
  public config: ISailsRequest;

  constructor(response: IRawSailsResponse, request: ISailsRequest) {
    if (typeof response === 'string') {
      try {
        response = JSON.parse(response);
      } catch (e) {
        throw new Error(`Malformed response ${response}. Could not be parsed to JSON`);
      }
    }
    this.config = request;
    this.headers = response.headers || {};
    this.status = response.statusCode || 200
  }
}

export class SailsResponse extends Response {

  public data: any;

  constructor(response: IRawSailsResponse, request: ISailsRequest) {
    super(response, request);
    this.data = response.body || {};
  }
}

export class SailsError extends Response {

  public error: any;

  constructor(response: IRawSailsResponse, request: ISailsRequest) {
    super(response, request);
    this.error = response.body || {};
  }
}


