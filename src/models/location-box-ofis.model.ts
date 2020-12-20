import {Model, model, property} from '@loopback/repository';

@model()
export class LocationBoxOfis extends Model {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  isim: string;

  @property({
    type: 'string',
    required: true,
  })
  adres: string;


  constructor(data?: Partial<LocationBoxOfis>) {
    super(data);
  }
}

export interface LocationBoxOfisRelations {
  // describe navigational properties here
}

export type LocationBoxOfisWithRelations = LocationBoxOfis & LocationBoxOfisRelations;
