import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const SERVICE_BASE_URL: string = environment.apiBaseUrl + '/games';

@Injectable({
  providedIn: 'root'
})
export class GameApi {

  constructor(
    private http: HttpClient
  ) { }
}
