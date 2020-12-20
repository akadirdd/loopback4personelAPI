import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Unvan} from './unvan.model';
import {Personel} from './personel.model';
import {Ofis} from './ofis.model';

@model()
export class Departman extends Entity {
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
  ad: string;

  @hasMany(() => Unvan, {keyTo: 'departman_id'})
  unvans: Unvan[];

  /*@hasMany(() => Personel, {keyTo: 'departman_id'})
  personels: Personel[];*/

  @belongsTo(() => Personel, {name: 'manager'})
  manager_id: number;

  @belongsTo(() => Ofis, {name: 'lokasyon'})
  lokasyon_id: number;

  @hasMany(() => Personel, {keyTo: 'departman_id'})
  personels: Personel[];

  @property({
    type: 'number',
  })
  locationbox_lokasyon_id: number;

  constructor(data?: Partial<Departman>) {
    super(data);
  }
}

export interface DepartmanRelations {
  // describe navigational properties here
  unvans?: DepartmanWithRelations[];

  personels?: DepartmanWithRelations[];

  manager?: DepartmanWithRelations;

  lokasyon?: DepartmanWithRelations;
}

export type DepartmanWithRelations = Departman & DepartmanRelations;
