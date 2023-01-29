import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CambioEstado } from 'src/app/interfaces/cambio-estado.interface';
import { environment } from 'src/environments/environment.prod';
import { EditForm } from '../interfaces/edit-form-interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Movimiento_almacen } from '../models/movimiento_almacen';


const URLSUBFIJO = '/movimientoalmacen'
const URL = environment.URLBASE+URLSUBFIJO


@Injectable({
  providedIn: 'root'
})
export class Movimiento_almacenService {

  constructor(private http: HttpClient) {}

  agregar(formData: RegisterForm) {
    return this.http.post(`${URL}`, formData, {
      responseType: 'text',
    });
  }

  listar(): Observable<Movimiento_almacen[]> {
    return this.http.get<Movimiento_almacen[]>(`${URL}`);
  }

  eliminar(id: number) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    return this.http.delete(`${URL}/${id}`);
  }

  buscarXid(id: number) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.get(`${URL}/movimiento_almacens/${id}`,{headers});
    return this.http.get(`${URL}/${id}`);
  }

  editar(id: number, editData: EditForm) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.put(`${URL}/movimiento_almacens/${id}`, editData, {headers});
    return this.http.put(`${URL}/${id}`, editData);
  }

  cambioEstado(id: number, editData: CambioEstado) {
    return this.http.put(`${URL}/cambiaEstado/${id}`, editData);
  }
}
