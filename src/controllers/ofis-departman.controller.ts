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
  Ofis,
  Departman,
} from '../models';
import { OfisRepository } from '../repositories/ofis.repository';

export class OfisDepartmanController {
  constructor(
    @repository(OfisRepository) protected ofisRepository: OfisRepository,
  ) { }

  @get('/ofis/{id}/departmen', {
    responses: {
      '200': {
        description: 'Array of Ofis has many Departman',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departman)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Departman>,
  ): Promise<Departman[]> {
    return this.ofisRepository.departmen(id).find(filter);
  }

  @post('/ofis/{id}/departmen', {
    responses: {
      '200': {
        description: 'Ofis model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departman)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ofis.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {
            title: 'NewDepartmanInOfis',
            exclude: ['id'],
            optional: ['lokasyon_id']
          }),
        },
      },
    }) departman: Omit<Departman, 'id'>,
  ): Promise<Departman> {
    return this.ofisRepository.departmen(id).create(departman);
  }

  @patch('/ofis/{id}/departmen', {
    responses: {
      '200': {
        description: 'Ofis.Departman PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {partial: true}),
        },
      },
    })
    departman: Partial<Departman>,
    @param.query.object('where', getWhereSchemaFor(Departman)) where?: Where<Departman>,
  ): Promise<Count> {
    return this.ofisRepository.departmen(id).patch(departman, where);
  }

  @del('/ofis/{id}/departmen', {
    responses: {
      '200': {
        description: 'Ofis.Departman DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departman)) where?: Where<Departman>,
  ): Promise<Count> {
    return this.ofisRepository.departmen(id).delete(where);
  }
}
