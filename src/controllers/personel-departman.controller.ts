import { authenticate } from '@loopback/authentication';
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
  Departman,
} from '../models';
import {PersonelRepository} from '../repositories';

@authenticate('jwt')
export class PersonelDepartmanController {
  constructor(
    @repository(PersonelRepository) protected personelRepository: PersonelRepository,
  ) { }

  @get('/manager/{id}/departman', {
    responses: {
      '200': {
        description: 'Personel has one Departman',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departman),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Departman>,
  ): Promise<Departman> {
    return this.personelRepository.managerDepartmani(id).get(filter);
  }

  @post('/manager/{id}/departman', {
    responses: {
      '200': {
        description: 'Personel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departman)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Personel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {
            title: 'NewDepartmanInPersonel',
            exclude: ['id'],
            /*optional: ['manager_id'],*/
          }),
        },
      },
    }) departman: Omit<Departman, 'id'>,
  ): Promise<Departman> {
    return this.personelRepository.managerDepartmani(id).create(departman);
  }

  @patch('/manager/{id}/departman', {
    responses: {
      '200': {
        description: 'Personel.Departman PATCH success count',
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
    return this.personelRepository.managerDepartmani(id).patch(departman, where);
  }

  @del('/manager/{id}/departman', {
    responses: {
      '200': {
        description: 'Personel.Departman DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departman)) where?: Where<Departman>,
  ): Promise<Count> {
    return this.personelRepository.managerDepartmani(id).delete(where);
  }
}
