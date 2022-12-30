import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CambioEstado } from 'src/app/interfaces/cambio-estado.interface';
import { EditForm } from 'src/app/interfaces/edit-form-interface';
import { RegisterForm } from 'src/app/interfaces/register-form.interface';
import { Categoria } from '../models/categoria';


// http://localhost:8080/api/v1
//const URL = environment.urlServer;

const URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  newCategoria(formData: RegisterForm) {
    return this.http.post(`${URL}/categorias`, formData, {
      responseType: 'text',
    });
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${URL}/categorias`);
  }

  deleteCategoria(id: number) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    return this.http.delete(`${URL}/categorias/${id}`);
  }

  obtenerIdCategoria(id: number) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.get(`${URL}/categoria/${id}`,{headers});
    return this.http.get(`${URL}/categorias/${id}`);
  }

  editarCategoria(id: number, editData: EditForm) {
    //     let headers = new HttpHeaders({
    //       'token': this.token
    //     });
    //     return this.http.put(`${URL}/categoria/${id}`, editData, {headers});
    return this.http.put(`${URL}/categorias/${id}`, editData);
  }

  actualizaEstadoCategoria(id: number, editData: CambioEstado) {
    return this.http.put(`${URL}/categorias/cambiaEstado/${id}`, editData);
  }
}
