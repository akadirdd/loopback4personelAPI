import { authenticate } from '@loopback/authentication';
import { Application, inject } from '@loopback/core';
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
  HttpErrors,
  getJsonSchema,
} from '@loopback/rest';
import { Ofis } from '../models';
import { LocationBoxOfis } from '../models/location-box-ofis.model';
import { DepartmanRepository } from '../repositories';
import { getQueryResult, Locationbox, queryResult } from '../services/locationbox.service';

@authenticate('jwt')
export class LocationBoxController {
  constructor(
    @repository(DepartmanRepository)
    public departmanRepository : DepartmanRepository,
    @inject('services.Locationbox') protected locationBoxService: Locationbox,
  ) {}

  readonly userAPIkey = "3130000205000125007300080008080X60211090060050270005069";

  /**
   * Ofis nesnesini parametre olarak alır.
   * bu nesnenin adres, postakodu, şehir, ülke özelliklerini birleştirerek
   * locationbox address kısmına kaydeder.
   * @param ofiskonum 
   */
  @post('/locationbox', {
    responses: {
      '200': {
        description: 'LocationBox servisine ofis ekle',
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
    ofiskonum: Omit<Ofis, 'id'>,
  ): Promise<queryResult> {
    // Girilen değerleri birleştir.
    let adres = ofiskonum.adresi+", "+ofiskonum.postakodu+", "+ofiskonum.sehir+", "+ofiskonum.ulke;
    
    // locationbox servisine AddUserPoint isteği gönder ve
    // birleştirilen adresi locationbox sunucusunda userpoint nesnesi içindeki
    // address kısmına kaydet 
    const sonuc = await this.locationBoxService.insertLocation(this.userAPIkey,
    "AddUserPoint","JSON", ofiskonum.isim, adres);

    if (sonuc.status == 1) {
      // address not found
      throw new HttpErrors.BadRequest(
        "ADRES EKLENEMEDİ",
      );
    }
    
    return sonuc;
  }

  /**
   * locationbox sunucusunda kayıtlı lokasyon Id'sini parametre olarak girilir.
   * ID'ye sahip lokasyonu dönürür.
   * @param id 
   */
  @get('/locationbox/{id}', {
    responses: {
      '200': {
        description: 'ID ile seçili LocationBox lokasyonu getir',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ofis),
            },
          },
        },
      },
    },
  })
  async findbyId(
    @param.path.number('id') id: number,
  ): Promise<getQueryResult> {
    
    const sonuc = await this.locationBoxService.getLocation(this.userAPIkey,
      "GetUserPoint","JSON", id);

      if (sonuc.status == 1) {
        // address not found
        throw new HttpErrors.BadRequest(
          "ADRESLER GETİRİLEMEDİ",
        );
      }      
      
      return sonuc;
  }

  /**
   * ID parametre olarak alınan userpoint locationbox sunucularından silinir.
   * @param id 
   */
  @del('/locationbox/{id}', {
    responses: {
      '204': {
        description: 'ID seçili locationbox konumunu sil',
      },
    },
  })
  async deleteById(
    @param.path.number('id') id: number
  ): Promise<queryResult> {
    return this.locationBoxService.deleteLocation(this.userAPIkey,
      "RemoveUserPoint","JSON", id);
  }




}
