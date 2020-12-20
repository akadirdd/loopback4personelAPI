import {injectable, /* inject, */ BindingScope, BindingKey} from '@loopback/core';
import { Personel } from '../models';
import { DepartmanMaas } from '../models/departman-maas.model';

export const MAAS_HESAPLAMA_SERVICE = BindingKey.create<HesaplamaService>('service.hesaplama');

@injectable({scope: BindingScope.TRANSIENT})
export class HesaplamaService {
  departmanMaasArray: DepartmanMaas[] = [];

  constructor() {}

  departmanMaasOrtalamasiHesapla(calisanlarArray:Personel[]){
    console.log("ortalama maas hesaplama basladi");

    for(var i = 0; i<calisanlarArray.length; i++) { 
      this.append2array(calisanlarArray[i].maas!, calisanlarArray[i].departman_id!);
    }  

    return this.departmanMaasArray;
  }

  /**
   * Personelin maaşlarını departmanına göre toplayıp,
   * departman özelinde maaş ortalaması hesaplanır.
   * @param maas 
   * @param departmanId 
   */
  private append2array(maas: number, departmanId: number){
      console.log(maas+ " "+ departmanId);
      const indis = this.departmanKayitliMi(departmanId)
      if(indis != -1){
        // departman id dizide mevcut ise
        this.departmanMaasArray[indis].maasToplam += maas;
        this.departmanMaasArray[indis].calisanSayisi++;
        this.departmanMaasArray[indis].maasOrtalamasi = this.departmanMaasArray[indis].maasToplam / this.departmanMaasArray[indis].calisanSayisi;
      }else{
        // departman id dizide mevcut DEĞİL ise
        let newDepartmanMaas = new DepartmanMaas();
        newDepartmanMaas.departmanId = departmanId;
        newDepartmanMaas.calisanSayisi = 1;
        newDepartmanMaas.maasToplam = maas;
        newDepartmanMaas.maasOrtalamasi = maas;
        this.departmanMaasArray.push(newDepartmanMaas);
      }
  }

  /**
   * Deparman ID daha önce diziye kaydolmuş mu bakılır.
   */
  private departmanKayitliMi(departmanId: number){
    let itemIndex = this.departmanMaasArray.findIndex(i => i.departmanId === departmanId);
    return itemIndex;
  }
}
