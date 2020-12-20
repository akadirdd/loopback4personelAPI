import {Entity, model, property, hasMany} from '@loopback/repository';
import {Departman} from './departman.model';

@model()
export class Ofis extends Entity {
  
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  isim: string;

  @property({
    type: 'string',
  })
  adresi?: string;

  @property({
    type: 'number',
  })
  postakodu?: number;

  @property({
    type: 'string',
  })
  sehir?: string;

  @property({
    type: 'string',
  })
  ulke?: string;

  @hasMany(() => Departman, {keyTo: 'lokasyon_id'})
  departmen: Departman[];

  constructor(data?: Partial<Ofis>) {
    super(data);
  }
}

export interface OfisRelations {
  // describe navigational properties here
  departmen?: OfisWithRelations[];
}

export type OfisWithRelations = Ofis & OfisRelations;
