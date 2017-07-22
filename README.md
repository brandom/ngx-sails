# ngx-sails

[![npm version](https://badge.fury.io/js/ngx-sails.svg)](https://badge.fury.io/js/ngx-sails)
[![Build Status](https://travis-ci.org/brandom/ngx-sails.svg?branch=master)](https://travis-ci.org/brandom/ngx-sails)
[![Coverage Status](https://coveralls.io/repos/github/brandom/ngx-sails/badge.svg?branch=master)](https://coveralls.io/github/brandom/ngx-sails?branch=master)

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

* get(url: `string`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* post(url: `string`, body: `any`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* put(url: `string`, body: `any`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* patch(url: `string`, body: `any`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* delete(url: `string`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* head(url: `string`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* options(url: `string`, options: `ISailsRequestOpts`): `Observable<ISailsResponse>`
* on(event: `string`): `Observable<any>`

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

interface ISailsResponse {
  data: any
  status: number
  headers: any
  config: ISailsRequest
}
```
