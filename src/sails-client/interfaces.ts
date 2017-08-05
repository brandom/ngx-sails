import { RequestMethod } from './enums';

export interface ISailsRequest {
  url: string
  method: RequestMethod
  headers?: any
  data?: any
  params?: any
}

export interface ISailsRequestOpts {
  headers?: any
  params?: any
  search?: any
}

export interface IRawSailsResponse {
  body: any
  statusCode: number
  headers: any
}

export interface ISailsResponse {
  data: any
  status: number
  headers: any
  config: ISailsRequest
}
