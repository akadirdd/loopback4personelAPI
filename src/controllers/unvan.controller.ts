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
import {Departman, Personel} from '../models';
import { Unvan } from '../models/unvan.model';
import { UnvanRepository } from '../repositories/unvan.repository';

export class UnvanController {
  constructor(
    @repository(UnvanRepository)
    public unvanRepository : UnvanRepository,
  ) {}

  @post('/unvans', {
    responses: {
      '200': {
        description: 'Unvan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Unvan)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvan, {
            title: 'NewUnvan',
            exclude: ['id'],
          }),
        },
      },
    })
    unvan: Omit<Unvan, 'id'>,
  ): Promise<Unvan> {
    return this.unvanRepository.create(unvan);
  }

  @get('/unvans/count', {
    responses: {
      '200': {
        description: 'Unvan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Unvan) where?: Where<Unvan>,
  ): Promise<Count> {
    return this.unvanRepository.count(where);
  }

  @get('/unvans', {
    responses: {
      '200': {
        description: 'Array of Unvan model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Unvan, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Unvan) filter?: Filter<Unvan>,
  ): Promise<Unvan[]> {
    return this.unvanRepository.find(filter);
  }

  @patch('/unvans', {
    responses: {
      '200': {
        description: 'Unvan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvan, {partial: true}),
        },
      },
    })
    unvan: Unvan,
    @param.where(Unvan) where?: Where<Unvan>,
  ): Promise<Count> {
    return this.unvanRepository.updateAll(unvan, where);
  }

  @get('/unvans/{id}', {
    responses: {
      '200': {
        description: 'Unvan model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Unvan, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Unvan, {exclude: 'where'}) filter?: FilterExcludingWhere<Unvan>
  ): Promise<Unvan> {
    return this.unvanRepository.findById(id, filter);
  }

  @patch('/unvans/{id}', {
    responses: {
      '204': {
        description: 'Unvan PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvan, {partial: true}),
        },
      },
    })
    unvan: Unvan,
  ): Promise<void> {
    await this.unvanRepository.updateById(id, unvan);
  }

  @put('/unvans/{id}', {
    responses: {
      '204': {
        description: 'Unvan PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() unvan: Unvan,
  ): Promise<void> {
    await this.unvanRepository.replaceById(id, unvan);
  }

  @del('/unvans/{id}', {
    responses: {
      '204': {
        description: 'Unvan DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.unvanRepository.deleteById(id);
  }

  @get('/unvans/{id}/personel', {
    responses: {
      '200': {
        description: 'Personel belonging to Unvan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personel)},
          },
        },
      },
    },
  })
  async getPersonel(
    @param.path.number('id') id: typeof Unvan.prototype.id,
  ): Promise<Personel> {
    return this.unvanRepository.personel(id);
  }

  @get('/unvans/{id}/departman', {
    responses: {
      '200': {
        description: 'Departman belonging to Unvan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departman)},
          },
        },
      },
    },
  })
  async getDepartman(
    @param.path.number('id') id: typeof Unvan.prototype.id,
  ): Promise<Departman> {
    return this.unvanRepository.departman(id);
  }


  
}
