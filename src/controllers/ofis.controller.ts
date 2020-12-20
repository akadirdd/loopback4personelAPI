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
import {Ofis} from '../models';
import {OfisRepository} from '../repositories/ofis.repository';

export class OfisController {
  constructor(
    @repository(OfisRepository)
    public ofisRepository : OfisRepository,
  ) {}

  @post('/ofis', {
    responses: {
      '200': {
        description: 'Ofis model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ofis)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ofis, {
            title: 'NewOfis',
            exclude: ['id'],
          }),
        },
      },
    })
    ofis: Omit<Ofis, 'id'>,
  ): Promise<Ofis> {
    return this.ofisRepository.create(ofis);
  }

  @get('/ofis/count', {
    responses: {
      '200': {
        description: 'Ofis model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ofis) where?: Where<Ofis>,
  ): Promise<Count> {
    return this.ofisRepository.count(where);
  }

  @get('/ofis', {
    responses: {
      '200': {
        description: 'Array of Ofis model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ofis, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ofis) filter?: Filter<Ofis>,
  ): Promise<Ofis[]> {
    return this.ofisRepository.find(filter);
  }

  @patch('/ofis', {
    responses: {
      '200': {
        description: 'Ofis PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ofis, {partial: true}),
        },
      },
    })
    ofis: Ofis,
    @param.where(Ofis) where?: Where<Ofis>,
  ): Promise<Count> {
    return this.ofisRepository.updateAll(ofis, where);
  }

  @get('/ofis/{id}', {
    responses: {
      '200': {
        description: 'Ofis model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ofis, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ofis, {exclude: 'where'}) filter?: FilterExcludingWhere<Ofis>
  ): Promise<Ofis> {
    return this.ofisRepository.findById(id, filter);
  }

  @patch('/ofis/{id}', {
    responses: {
      '204': {
        description: 'Ofis PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ofis, {partial: true}),
        },
      },
    })
    ofis: Ofis,
  ): Promise<void> {
    await this.ofisRepository.updateById(id, ofis);
  }

  @put('/ofis/{id}', {
    responses: {
      '204': {
        description: 'Ofis PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ofis: Ofis,
  ): Promise<void> {
    await this.ofisRepository.replaceById(id, ofis);
  }

  @del('/ofis/{id}', {
    responses: {
      '204': {
        description: 'Ofis DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ofisRepository.deleteById(id);
  }
}
