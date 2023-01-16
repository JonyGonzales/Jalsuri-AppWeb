import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../../categoria/models/categoria';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Insumo } from '../models/insumo';

// http://localhost:8080/api/v1
const URLSUBFIJO = '/categorias'
const URL = environment.URLBASE + URLSUBFIJO;

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  constructor(private http: HttpClient) {}

  newInsumo(formData: RegisterForm) {
    return this.http.post(`${URL}`, formData, {
      responseType: 'text',
    });
  }

  obtenerInsumos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${URL}`);
  }

  deleteInsumo(id: number) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    return this.http.delete(`${URL}/${id}`);
  }

  obtenerIdInsumo(id: number) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.get(`${URL}/${id}`,{headers});
    return this.http.get(`${URL}/${id}`);
  }

  // editarInsumo(id: number, editData: EditForm) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.put(`${URL}/${id}`, editData, {headers});
  //   return this.http.put(`${URL}/${id}`, editData);
  // }

  // actualizaEstadoInsumo(id: number, editData: CambioEstado) {
  //   return this.http.put(`${URL}/cambiaEstado/${id}`, editData);
  // }
}
