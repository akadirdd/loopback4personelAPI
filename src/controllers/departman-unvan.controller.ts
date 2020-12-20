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
  Departman,
  Unvan,
} from '../models';
import {DepartmanRepository} from '../repositories';

export class DepartmanUnvanController {
  constructor(
    @repository(DepartmanRepository) protected departmanRepository: DepartmanRepository,
  ) { }

  @get('/departmen/{id}/unvans', {
    responses: {
      '200': {
        description: 'Array of Departman has many Unvan',
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
    return this.departmanRepository.unvans(id).find(filter);
  }

  @post('/departmen/{id}/unvans', {
    responses: {
      '200': {
        description: 'Departman model instance',
        content: {'application/json': {schema: getModelSchemaRef(Unvan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departman.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvan, {
            title: 'NewUnvanInDepartman',
            exclude: ['id'],
            optional: ['departman_id']
          }),
        },
      },
    }) unvan: Omit<Unvan, 'id'>,
  ): Promise<Unvan> {
    return this.departmanRepository.unvans(id).create(unvan);
  }

  @patch('/departmen/{id}/unvans', {
    responses: {
      '200': {
        description: 'Departman.Unvan PATCH success count',
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
    return this.departmanRepository.unvans(id).patch(unvan, where);
  }

  @del('/departmen/{id}/unvans', {
    responses: {
      '200': {
        description: 'Departman.Unvan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Unvan)) where?: Where<Unvan>,
  ): Promise<Count> {
    return this.departmanRepository.unvans(id).delete(where);
  }
}
