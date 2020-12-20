import {Model, model, property} from '@loopback/repository';

@model()
export class DepartmanMaas extends Model {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  departmanId: number;

  @property({
    type: 'number',
    required: true,
  })
  maasOrtalamasi: number;

  @property({
    type: 'number',
    required: true,
    hidden: true,
  })
  maasToplam: number;

  @property({
    type: 'number',
    required: true,
    hidden: true,
  })
  calisanSayisi: number;


  constructor(data?: Partial<DepartmanMaas>) {
    super(data);
  }
}

export interface DepartmanMaasRelations {
  // describe navigational properties here
}

export type DepartmanMaasWithRelations = DepartmanMaas & DepartmanMaasRelations;
