import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import { CellValue } from 'src/app/contracts/shared/cell-value.model';

const SERVICE_BASE_URL: string = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class DefaultUserServiceService {

  constructor(
    private http: HttpClient
  ) { }

  //get defaultUser
  getDefaultUserCellValue():Observable<CellValue>{
    console.log(SERVICE_BASE_URL+ `/default-player-color`);
    return this.http.get<CellValue>(`${SERVICE_BASE_URL}/default-player-color`);
  }
}
