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
  Personel,
} from '../models';
import {DepartmanRepository} from '../repositories';

export class DepartmanPersonelController {
  constructor(
    @repository(DepartmanRepository) protected departmanRepository: DepartmanRepository,
  ) { }

  @get('/departmen/{id}/personels', {
    responses: {
      '200': {
        description: 'Array of Departman has many Personel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Personel>,
  ): Promise<Personel[]> {
    return this.departmanRepository.personels(id).find(filter);
  }

  @post('/departmen/{id}/personels', {
    responses: {
      '200': {
        description: 'Departman model instance',
        content: {'application/json': {schema: getModelSchemaRef(Personel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departman.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personel, {
            title: 'NewPersonelInDepartman',
            exclude: ['id'],
            optional: ['departman_id']
          }),
        },
      },
    }) personel: Omit<Personel, 'id'>,
  ): Promise<Personel> {
    return this.departmanRepository.personels(id).create(personel);
  }

  @patch('/departmen/{id}/personels', {
    responses: {
      '200': {
        description: 'Departman.Personel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personel, {partial: true}),
        },
      },
    })
    personel: Partial<Personel>,
    @param.query.object('where', getWhereSchemaFor(Personel)) where?: Where<Personel>,
  ): Promise<Count> {
    return this.departmanRepository.personels(id).patch(personel, where);
  }

  @del('/departmen/{id}/personels', {
    responses: {
      '200': {
        description: 'Departman.Personel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Personel)) where?: Where<Personel>,
  ): Promise<Count> {
    return this.departmanRepository.personels(id).delete(where);
  }
}
