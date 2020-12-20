import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Unvan} from './unvan.model';
import {Departman} from './departman.model';

@model()
export class Personel extends Entity {

  @property({
    type: 'number',
    id: true,
    required: false,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  ad: string;

  @property({
    type: 'string',
    required: true,
  })
  soyad: string;

  @property({
    type: 'string',
    required: true,
  })
  eposta: string;

  @property({
    type: 'string',
  })
  telefon?: string;

  @property({
    type: 'date',
  })
  ise_giris_tarih?: string;

  @property({
    type: 'number',
  })
  maas?: number;

  @hasMany(() => Personel, {keyTo: 'manager_id'})
  calisanlar: Personel[];

  @belongsTo(() => Personel, {name: 'yonetici'})
  manager_id: number;

  @hasMany(() => Unvan, {keyTo: 'personel_id'})
  unvansWithHistory: Unvan[];

  @belongsTo(() => Departman, {name: 'departman'})
  departman_id: number;

  @hasOne(() => Departman, {keyTo: 'manager_id'})
  managerDepartmani: Departman;

  constructor(data?: Partial<Personel>) {
    super(data);
  }
}

export interface PersonelRelations {
  // describe navigational properties here
  calisanlar?: PersonelWithRelations[];
  yonetici?: PersonelWithRelations;

  unvansWithHistory?: PersonelWithRelations[];

  departman?: PersonelWithRelations;

  managerDepartmani?: PersonelWithRelations;
}

export type PersonelWithRelations = Personel & PersonelRelations;
