import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:27167/api/reading/";

  constructor(private httpClient: HttpClient) { }

  public getParamList() {
    return this.httpClient.get(this.REST_API_SERVER+'GetParamList');
  }

  public getReadingList(buildingId: number, objectId: number, dataFieldId: number, from: string, to: string) {
    return this.httpClient.get(this.REST_API_SERVER + 'GetTimeSeriesDataList?buildingId=' + buildingId + '&objectId=' + objectId
      + '&dataFieldId=' + dataFieldId + '&from=' + from+'&to=' + to);
  }
}
