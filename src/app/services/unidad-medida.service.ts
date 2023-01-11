import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UnidadMedida } from '../models/unidad-medida';
// http://localhost:8080/api/v1
//const URL = environment.urlServer;

const URLSUBFIJO = '/unidadmedida'
const URL = environment.URLBASE+URLSUBFIJO

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  constructor(private http: HttpClient) {}

  obtenerUnidadMedidas(): Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>(`${URL}`);
  }

  obtenerIdUnidadMedida(id: number) {
    return this.http.get(`${URL}/${id}`);
  }

}