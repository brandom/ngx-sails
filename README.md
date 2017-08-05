# ngx-sails

[![npm version](https://badge.fury.io/js/ngx-sails.svg)](https://badge.fury.io/js/ngx-sails)
[![Build Status](https://travis-ci.org/brandom/ngx-sails.svg?branch=master)](https://travis-ci.org/brandom/ngx-sails)
[![Coverage Status](https://coveralls.io/repos/github/brandom/ngx-sails/badge.svg?branch=master&cacheBuster=1)](https://coveralls.io/github/brandom/ngx-sails?branch=master)

A socket client for Angular (2+) applications that connect to a Sails socket.io API.

## Installation

 ```bash
 npm install ngx-sails
 ```

## Usage

Add `SailsClientModule` to your application module.

 ```ts
 // Optional, the URI will default to origin
const socketConfig: ISailsClientConfig = { uri: 'http://localhost:3000' };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SailsClientModule.configureClient(socketConfig),
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
 ```

 Inject the `SailsClient` into your component.

 ```ts
class ExampleComponent implements OnInit {

  someData: any;

  constructor(private sails: SailsClient) { }

  $onInit() {
    this.sails.get('/api/url').subscribe(res => {
      this.someData = res.data;
    });
  }

}
 ```

## API

### Methods

* get(url: `string`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* post(url: `string`, body: `any`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* put(url: `string`, body: `any`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* patch(url: `string`, body: `any`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* delete(url: `string`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* head(url: `string`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* options(url: `string`, options: `ISailsRequestOpts`): `Observable<SailsResponse>`
* on(event: `string`): `Observable<any>`

### Properties

* requestErrors: `Observable<SailsError>`

```ts
interface ISailsClientConfig {
  uri?: string,
  headers?: any,
  options?: SocketIOConnectOpts
}

interface ISailsRequestOpts {
  headers?: any
  params?: any
  search?: any
}

class SailsResponse {
  data: any
  status: number
  headers: any
  config: ISailsRequest
}

class SailsError {
  error: any
  headers: any
  status: number
  config: ISailsRequest
}

interface ISailsRequest {
  url: string
  method: RequestMethod
  headers?: any
  data?: any
  params?: any
}
```
