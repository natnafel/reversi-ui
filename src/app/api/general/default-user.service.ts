import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CellValue} from '../../contracts/shared/cell-value.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultUserService {

  constructor(
    private http: HttpClient
  ) { }

  getDefaultUserCellValue(): Observable<CellValue> {
    return this.http.get<CellValue>(`${environment.apiBaseUrl}/default-player-color`);
  }
}
