import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EditForm } from '../interfaces/edit-form-interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Detalle_Mov_almacen } from '../models/detalle_Mov_Almacen';



const URLSUBFIJO = '/detalle'
const URL = environment.URLBASE+URLSUBFIJO


@Injectable({
  providedIn: 'root'
})
export class Detalle_mov_almacenService {

  constructor(private http: HttpClient) {}

  agregar(formData: RegisterForm) {
    return this.http.post(`${URL}`, formData, {
      responseType: 'text',
    });
  }

  listar(): Observable<Detalle_Mov_almacen[]> {
    return this.http.get<Detalle_Mov_almacen[]>(`${URL}`);
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

  listarXid(id: number): Observable<Detalle_Mov_almacen[]> {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.get(`${URL}/movimiento_almacens/${id}`,{headers});
    return this.http.get<Detalle_Mov_almacen[]>(`${URL}/listarxId/${id}`);
  }


  editar(id: number, editData: EditForm) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.put(`${URL}/movimiento_almacens/${id}`, editData, {headers});
    return this.http.put(`${URL}/${id}`, editData);
  }


}
