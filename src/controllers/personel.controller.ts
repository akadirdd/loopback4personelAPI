import { inject } from '@loopback/core';
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
import { DepartmanMaas } from '../models/departman-maas.model';
import {PersonelRepository} from '../repositories';
import { HesaplamaService, MAAS_HESAPLAMA_SERVICE } from '../services';

export class PersonelController {
  constructor(
    @repository(PersonelRepository)
    public personelRepository : PersonelRepository,
    @inject(MAAS_HESAPLAMA_SERVICE) private hesapService: HesaplamaService,
  ) {}

  @post('/personels', {
    responses: {
      '200': {
        description: 'Yeni bir çalışan bilgisi kaydedebilmek',
        content: {'application/json': {schema: getModelSchemaRef(Personel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personel, {
            title: 'NewPersonel',
            exclude: ['id'],
          }),
        },
      },
    })
    personel: Omit<Personel, 'id'>,
  ): Promise<Personel> {
    return this.personelRepository.create(personel);
  }

  @get('/personels/count', {
    responses: {
      '200': {
        description: 'Personel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Personel) where?: Where<Personel>,
  ): Promise<Count> {
    return this.personelRepository.count(where);
  }

  @get('/personels', {
    responses: {
      '200': {
        description: 'Şirketin çalışanlarını listelemek',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Personel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Personel) filter?: Filter<Personel>,
  ): Promise<Personel[]> {
    return this.personelRepository.find(filter);
  }

  @patch('/personels', {
    responses: {
      '200': {
        description: 'Personel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personel, {partial: true}),
        },
      },
    })
    personel: Personel,
    @param.where(Personel) where?: Where<Personel>,
  ): Promise<Count> {
    return this.personelRepository.updateAll(personel, where);
  }

  @get('/personels/{id}', {
    responses: {
      '200': {
        description: 'Personel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Personel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Personel, {exclude: 'where'}) filter?: FilterExcludingWhere<Personel>
  ): Promise<Personel> {
    return this.personelRepository.findById(id, filter);
  }

  @patch('/personels/{id}', {
    responses: {
      '204': {
        description: 'patch : Bir çalışana ait bilgileri güncellemek',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personel, {partial: true}),
        },
      },
    })
    personel: Personel,
  ): Promise<void> {
    await this.personelRepository.updateById(id, personel);
  }

  @put('/personels/{id}', {
    responses: {
      '204': {
        description: 'put : Bir çalışana ait bilgileri güncellemek',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() personel: Personel,
  ): Promise<void> {
    await this.personelRepository.replaceById(id, personel);
  }

  @del('/personels/{id}', {
    responses: {
      '204': {
        description: 'Personel DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personelRepository.deleteById(id);
  }

  /**
   * Personelin yöneticisini döndürür.
   * @param id personel ID
   */
  @get('/personels/{id}/manager', {
    responses: {
      '200': {
        description: 'Personelin yöneticisini döndürür.',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personel)},
          },
        },
      },
    },
  })
  async getPersonel(
    @param.path.number('id') id: typeof Personel.prototype.id,
  ): Promise<Personel> {
    return this.personelRepository.yonetici(id);
  }
  
  /**
   * Seçili yöneticinin altında çalışan yöneticiler ve çalışanları 
   * hiyerarşik bir şekilde döndürülür.
   * @param id yönetici ID
   */
  @get('/personels/hiyerarsik/{id}', {
    responses: {
      '200': {
        description: 'Seçili yöneticinin altında çalışan yöneticiler ve çalışanları hiyerarşik bir şekilde döndürülür.',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Personel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findByIdAndListAsc(
    @param.path.number('id') id: number,
  ): Promise<Personel> {
    return this.personelRepository.findById(id, this.personelRepository.nestedIncludeTemplate);
  }


  @get('/personels/ortalama', {
    responses: {
      '200': {
        description: 'Departmanların maaş ortalamalarını programatik şekilde hesaplayan servis(veri tabanında hesaplanmasın)',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DepartmanMaas, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findPersonelAndCalculate(
    @param.filter(Personel) filter?: Filter<Personel>,
  ): Promise<DepartmanMaas[]> {
    const personelArray = await this.personelRepository.find(filter);
    const ortalamaMaasArray = this.hesapService.departmanMaasOrtalamasiHesapla(personelArray);
    return ortalamaMaasArray;
  }

  /**
   * Seçili personeli, ünvan tarihçesiyle birlikte döndürür.
   * @param id personel ID
   * @param filter 
   */
  @get('/personels/withUnvan/{id}', {
    responses: {
      '200': {
        description: 'Personel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Personel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findByIdAndList(
    @param.path.number('id') id: number,
    @param.filter(Personel, {exclude: 'where'}) filter?: FilterExcludingWhere<Personel>
  ): Promise<Personel> {
    return this.personelRepository.findById(id, {include: [{
      relation: 'unvansWithHistory',
      scope: {
        order: ['baslangic_tarih ASC'],
      },
    },]});
    // {order: ['baslangic_tarih DESC'], include: ['unvansWithHistory']}
    //await customerRepository.find({include: ['orders']});
  }


}
