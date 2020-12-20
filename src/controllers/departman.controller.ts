import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Departman, Ofis, Personel} from '../models';
import {DepartmanRepository} from '../repositories';

@authenticate('jwt')
export class DepartmanController {
  constructor(
    @repository(DepartmanRepository)
    public departmanRepository : DepartmanRepository,
  ) {}

  @post('/departmen', {
    responses: {
      '200': {
        description: 'Departman model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departman)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {
            title: 'NewDepartman',
            exclude: ['id'],
          }),
        },
      },
    })
    departman: Omit<Departman, 'id'>,
  ): Promise<Departman> {
    return this.departmanRepository.create(departman);
  }

  @get('/departmen/count', {
    responses: {
      '200': {
        description: 'Departman model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Departman) where?: Where<Departman>,
  ): Promise<Count> {
    return this.departmanRepository.count(where);
  }

  @get('/departmen', {
    responses: {
      '200': {
        description: 'Array of Departman model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Departman, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Departman) filter?: Filter<Departman>,
  ): Promise<Departman[]> {
    return this.departmanRepository.find(filter);
  }

  @patch('/departmen', {
    responses: {
      '200': {
        description: 'Departman PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {partial: true}),
        },
      },
    })
    departman: Departman,
    @param.where(Departman) where?: Where<Departman>,
  ): Promise<Count> {
    return this.departmanRepository.updateAll(departman, where);
  }

  @get('/departmen/{id}', {
    responses: {
      '200': {
        description: 'Departman model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departman, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Departman, {exclude: 'where'}) filter?: FilterExcludingWhere<Departman>
  ): Promise<Departman> {
    return this.departmanRepository.findById(id, filter);
  }

  @patch('/departmen/{id}', {
    responses: {
      '204': {
        description: 'Departman PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {partial: true}),
        },
      },
    })
    departman: Departman,
  ): Promise<void> {
    await this.departmanRepository.updateById(id, departman);
  }

  @put('/departmen/{id}', {
    responses: {
      '204': {
        description: 'Departman PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() departman: Departman,
  ): Promise<void> {
    await this.departmanRepository.replaceById(id, departman);
  }

  @del('/departmen/{id}', {
    responses: {
      '204': {
        description: 'Departman DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departmanRepository.deleteById(id);
  }

  @get('/departmen/{id}/manager', {
    responses: {
      '200': {
        description: 'Yönetici personel belonging to Departman',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personel)},
          },
        },
      },
    },
  })
  async getPersonel(
    @param.path.number('id') id: typeof Departman.prototype.id,
  ): Promise<Personel> {
    return this.departmanRepository.manager(id);
  }
  
  @get('/departmen/{id}/ofis', {
    responses: {
      '200': {
        description: 'Ofis belonging to Departman',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ofis)},
          },
        },
      },
    },
  })
  async getOfis(
    @param.path.number('id') id: typeof Departman.prototype.id,
  ): Promise<Ofis> {
    return this.departmanRepository.lokasyon(id);
  }

}
