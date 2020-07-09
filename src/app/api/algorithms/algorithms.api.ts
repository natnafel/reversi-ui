import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlgorithmResponse} from '../../contracts/response/algorithm.response';

const SERVICE_BASE_URL: string = environment.apiBaseUrl + '/algorithms';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsApi {

  constructor(
    private http: HttpClient
  ) { }

  getAllAlgorithms(): Observable<AlgorithmResponse[]>{
    return this.http.get<AlgorithmResponse[]>(SERVICE_BASE_URL);
  }
}
