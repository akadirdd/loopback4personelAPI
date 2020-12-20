import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Personel,
} from '../models';
import { Unvan } from '../models/unvan.model';
import {PersonelRepository} from '../repositories';

export class PersonelUnvanController {
  constructor(
    @repository(PersonelRepository) protected personelRepository: PersonelRepository,
  ) { }

  @get('/personels/{id}/unvans', {
    responses: {
      '200': {
        description: 'Array of Personel has many Unvan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Unvan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Unvan>,
  ): Promise<Unvan[]> {
    return this.personelRepository.unvansWithHistory(id).find(filter);
  }

  @post('/personels/{id}/unvans', {
    responses: {
      '200': {
        description: 'Personel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Unvan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Personel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvan, {
            title: 'NewUnvanInPersonel',
            exclude: ['id'],
            optional: ['personel_id']
          }),
        },
      },
    }) unvan: Omit<Unvan, 'id'>,
  ): Promise<Unvan> {
    return this.personelRepository.unvansWithHistory(id).create(unvan);
  }

  @patch('/personels/{id}/unvans', {
    responses: {
      '200': {
        description: 'Personel.Unvan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvan, {partial: true}),
        },
      },
    })
    unvan: Partial<Unvan>,
    @param.query.object('where', getWhereSchemaFor(Unvan)) where?: Where<Unvan>,
  ): Promise<Count> {
    return this.personelRepository.unvansWithHistory(id).patch(unvan, where);
  }

  @del('/personels/{id}/unvans', {
    responses: {
      '200': {
        description: 'Personel.Unvan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Unvan)) where?: Where<Unvan>,
  ): Promise<Count> {
    return this.personelRepository.unvansWithHistory(id).delete(where);
  }
}
