import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ProtocolResponse} from '../../contracts/response/protocol.response';

const SERVICE_BASE_URL: string = environment.apiBaseUrl + '/protocols';

@Injectable({
  providedIn: 'root'
})
export class ProtocolApi {

  constructor(
    private http: HttpClient
  ) { }

  getAllProtocols(): Observable<ProtocolResponse[]> {
    return this.http.get<ProtocolResponse[]>(SERVICE_BASE_URL);
  }
}
