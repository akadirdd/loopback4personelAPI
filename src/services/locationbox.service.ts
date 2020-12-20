import {getService} from '@loopback/service-proxy';
import {inject, JSONObject, JSONValue, Provider} from '@loopback/core';
import {LocationboxDataSource} from '../datasources/locationbox.datasource';
import { JsonBodyParser } from '@loopback/rest';
import { LocationBoxOfis } from '../models/location-box-ofis.model';

export interface queryResult{
  /*{ "id": "1", "name": "Sample", "type": 0, "address": "Kad?köy", "telno": "02163620500", "faxno": "02163620507", "mahalleid": 34000015024, "mahalleadi": "Kozyata??", "ilceid": 34000015000, "ilceadi": "Kad?köy", "ilid": 34, "iladi": "?stanbul", "string1": "www.infotech.com.tr", "string2": "kurumsal@infotech.com.tr", "string3": "", "string4": "", "string5": "", "string6": "", "string7": "", "string8": "", "string9": "", "number1": 1, "number2": 2, "number3": 0, "number4": 0, "number5": 0, "number6": 0, "number7": 0, "number8": 0, "number9": 0, "latitude": 40.9686, "longitude": 29.1005, "angle": 30.5 }
*/
  transactionid: string;

  status: number;

  //userpoints: [];
}

export interface getQueryResult{
  
  transactionid: string;

  status: number;

  userpoints: any;
}

export interface Locationbox {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  insertLocation(
    locationBoxApiKey: string, locationBoxCmd: string, locationBoxType: string,
    pointName: string, adres: string
  ): Promise<queryResult>;

  getLocation(
    locationBoxApiKey: string, locationBoxCmd: string, locationBoxType: string,
    pointId: number
  ): Promise<getQueryResult>;

  deleteLocation(
    locationBoxApiKey: string, locationBoxCmd: string, locationBoxType: string,
    pointId: number
  ): Promise<queryResult>;

  //Key=key&Cmd=GetUserPoint&Typ=output_format&Id=pointid


}

export class LocationboxProvider implements Provider<Locationbox> {
  constructor(
    // locationbox must match the name property in the datasource json file
    @inject('datasources.locationbox')
    protected dataSource: LocationboxDataSource = new LocationboxDataSource(),
  ) {}

  value(): Promise<Locationbox> {
    return getService(this.dataSource);
  }
}
