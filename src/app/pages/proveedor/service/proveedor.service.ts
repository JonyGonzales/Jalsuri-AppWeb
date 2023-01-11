import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { CambioEstado } from '../interfaces/cambio-estado.interface';
import { EditForm } from '../interfaces/edit-form-interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Proveedor } from '../model/proveedor';

const URLSUBFIJO = '/proveedores'
const URL = environment.URLBASE + URLSUBFIJO

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {constructor(private http: HttpClient) {}

newProveedor(formData: RegisterForm) {
  return this.http.post(`${URL}`, formData, {
    responseType: 'text',
  });
}

// Este metodo nos sirve para obtener las Productos
obtenerProveedor(): Observable<Proveedor[]> {
  return this.http.get<Proveedor[]>(`${URL}`);
}
deleteProveedor(id: number) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  return this.http.delete(`${URL}/${id}`);
}

obtenerIdProveedor(id: number) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  //     return this.http.get(`${URL}/categoria/${id}`,{headers});
  return this.http.get(`${URL}/${id}`);
}

editarProveedor(id: number, editData: EditForm) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  //     return this.http.put(`${URL}/categoria/${id}`, editData, {headers});
  return this.http.put(`${URL}/${id}`, editData);
}

actualizaEstadoProveedor(id: number, editData: CambioEstado) {
  return this.http.put(`${URL}/cambiaEstado/${id}`, editData);
}
}
