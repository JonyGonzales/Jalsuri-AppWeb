import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tipo_documento } from '../models/tipo_documento';


// http://localhost:8080/api/v1
//const URL = environment.urlServer;

const URLSUBFIJO = '/tipodocumento'
const URL = environment.URLBASE+URLSUBFIJO


@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  
constructor(private http: HttpClient) {}

listar(): Observable<Tipo_documento[]> {
  return this.http.get<Tipo_documento[]>(`${URL}`);
}

buscarXid(id: number) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  //     return this.http.get(`${URL}/movimiento_almacens/${id}`,{headers});
  return this.http.get(`${URL}/${id}`);
}
}
