import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'locationbox',
  connector: 'rest',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://www.locationbox.com.tr/locationbox/services',
        query: {
          Key: '{locationBoxApiKey}',
          Cmd: '{locationBoxCmd}',
          Typ: '{locationBoxType}',
          Name: '{pointName}',
          Address: '{adres}',
        },
        responsePath: '$',
      },
      functions: {
        insertLocation: ['locationBoxApiKey','locationBoxCmd','locationBoxType',
        'pointName', 'adres'],
      },
      
    },
    {
      template: {
        method: 'GET',
        url: 'http://www.locationbox.com.tr/locationbox/services',
        query: {
          Key: '{locationBoxApiKey}',
          Cmd: '{locationBoxCmd}',
          Typ: '{locationBoxType}',
          Id: '{pointId}',
        },
        responsePath: '$',
      },
      functions: {
        getLocation: ['locationBoxApiKey','locationBoxCmd','locationBoxType','pointId'],
      },
      
    },
    {
      template: {
        method: 'GET',
        url: 'http://www.locationbox.com.tr/locationbox/services',
        query: {
          Key: '{locationBoxApiKey}',
          Cmd: '{locationBoxCmd}',
          Typ: '{locationBoxType}',
          Id: '{pointId}',
        },
        responsePath: '$',
      },
      functions: {
        deleteLocation: ['locationBoxApiKey','locationBoxCmd','locationBoxType','pointId'],
      },
      
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LocationboxDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'locationbox';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.locationbox', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
