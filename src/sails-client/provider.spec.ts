import { TestBed } from '@angular/core/testing';

import { ISailsClientConfig } from './sails-client.config';
import { SailsClient } from './sails-client.service';
import { SailsClientModule } from './sails-client.module';

describe('SailsClientProvider', () => {
  it('should work with no config', () => {
    TestBed.configureTestingModule({
      imports: [ SailsClientModule.configureClient() ],
    });
    let service: SailsClient = TestBed.get(SailsClient);
    expect(service).toBeTruthy();
  });

  it('should extend socket query params', () => {
    const config: ISailsClientConfig = { uri: '', options: { query: 'custom=query' } };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ SailsClientModule.configureClient(config) ],
    });

    let service: SailsClient = TestBed.get(SailsClient);

    expect(service.configuration.options.query).toEqual('custom=query');
  });
});
