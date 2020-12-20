import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Personel} from './personel.model';
import {Departman} from './departman.model';

@model()
export class Unvan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  baslangic_tarih: string;

  @property({
    type: 'date',
  })
  bitis_tarih: string;

  @property({
    type: 'string',
    required: true,
  })
  unvan_isim: string;

  @belongsTo(() => Personel, {name: 'personel'})
  personel_id: number;

  @belongsTo(() => Departman, {name: 'departman'})
  departman_id: number;

  constructor(data?: Partial<Unvan>) {
    super(data);
  }
}

export interface UnvanRelations {
  // describe navigational properties here
  personel ?: UnvanWithRelations;

  departman ?: UnvanWithRelations;
}

export type UnvanWithRelations = Unvan & UnvanRelations;
