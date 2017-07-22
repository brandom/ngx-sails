import { ISailsClientConfig, SAILS_CLIENT_CONFIG } from './sails-client.config';
import { SailsClientModule, provideSailsClient } from './sails-client.module';
import { TestBed, inject } from '@angular/core/testing';

import { IO_INSTANCE } from '../io';
import { InjectionToken } from '@angular/core';
import { RequestMethod } from './enums';
import { SailsClient } from './sails-client.service';

const { client, server } = require('../../tests/server');

const config: ISailsClientConfig = { uri: '', options: { transports: ['polling'] } };

describe('SailsClientService', () => {
  let service: SailsClient;
  let serverIO: any;

  beforeAll(done => {
    server.on('connect', (socket: any) => {
      serverIO = socket;
      client.off = function () { };
      client.on('connect', () => {
        done();
      });
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SailsClientModule.configureClient(config, client)]
    });
  });

  beforeEach(inject([SailsClient], (sailsClient: SailsClient) => {
    service = sailsClient;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get success', done => {
    service.get('success').subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data.method).toBe(RequestMethod.GET);
      done();
    });
  });

  it('should get error', done => {
    service.get('error').subscribe(res => {
      expect(res).toBeUndefined();
    }, err => {
      expect(err.status).toBe(500);
      expect(err.error).toBe('ERROR');
      done();
    });
  });

  it('should post data', done => {
    service.post('success', { id: 1 }).subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ method: RequestMethod.POST, data: { id: 1 } });
      done();
    });
  });

  it('should put data', done => {
    service.put('success', { id: 2 }).subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ method: RequestMethod.PUT, data: { id: 2 } });
      done();
    });
  });

  it('should delete data', done => {
    service.delete('success', { params: { id: 1 } }).subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ method: RequestMethod.DELETE, data: { id: 1 } });
      done();
    });
  });

  it('should do head request', done => {
    service.head('success').subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data.method).toBe(RequestMethod.HEAD);
      done();
    });
  });

  it('should do patch request', done => {
    service.patch('success', { id: 1 }).subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ method: RequestMethod.PATCH, data: { id: 1 } });
      done();
    });
  });

  it('should do options request', done => {
    service.options('success').subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.data.method).toBe(RequestMethod.OPTIONS);
      done();
    });
  });

  it('should listen to events', done => {
    let sub = service.on('event').subscribe(res => {
      expect(res).toBe('message');
    })
    serverIO.emit('event', 'message');
    sub.unsubscribe();
    server.emit('event', 'no listener');
    setTimeout(() => {
      done();
    }, 500);
  });

  it('should error on invalid json', done => {
    service.get('json-error').subscribe(res => { }, err => {
      expect(err).toMatch(/Could not be parsed to JSON$/);
      done();
    });
  });

  it('should lower case headers keys', done => {
    service.get('success', { headers: { UPPERCASE: 'YES' } }).subscribe(res => {
      expect(res.config.headers).toEqual({ uppercase: 'YES' });
      done();
    });
  });

  it('error on unknown url', done => {
    service.get('unknown').subscribe(res => { }, err => {
      expect(err.status).toBe(404);
      done();
    });
  });

  it('should send default headers', done => {
    const config: ISailsClientConfig = { uri: '', headers: { 'default': 'headers' } };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SailsClientModule.configureClient(config, client)]
    });

    let service: SailsClient = TestBed.get(SailsClient);

    service.get('success').subscribe(res => {
      expect(res.config.headers).toEqual({ default: 'headers' });
      done();
    });
  });

});
