import { TestBed, inject } from '@angular/core/testing';

import { ISailsClientConfig } from './sails-client.config';
import { SailsClient } from './sails-client.service';
import { SailsClientModule } from './sails-client.module';

describe('SailsClientProvider', () => {

  it('should work with no config', () => {
    TestBed.configureTestingModule({
      imports: [SailsClientModule.configureClient()]
    });
    let service: SailsClient = TestBed.get(SailsClient);
    expect(service).toBeTruthy();
  });

});
