import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CambioEstado } from 'src/app/interfaces/cambio-estado.interface';
import { environment } from 'src/environments/environment.prod';
import { EditForm } from '../interfaces/edit-form-interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Cliente } from '../model/cliente';

const URLSUBFIJO = '/clientes'
const URL = environment.URLBASE + URLSUBFIJO

@Injectable({
  providedIn: 'root'
})
export class ClienteService {constructor(private http: HttpClient) {}

newCliente(formData: RegisterForm) {
  return this.http.post(`${URL}`, formData, {
    responseType: 'text',
  });
}

// Este metodo nos sirve para obtener las Productos
obtenerCliente(): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(`${URL}`);
}
deleteCliente(id: number) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  return this.http.delete(`${URL}/${id}`);
}

obtenerIdCliente(id: number) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  //     return this.http.get(`${URL}/categoria/${id}`,{headers});
  return this.http.get(`${URL}/${id}`);
}

editarCliente(id: number, editData: EditForm) {
  //     let headers = new HttpHeaders({
  //       'token': this.token
  //     });
  //     return this.http.put(`${URL}/categoria/${id}`, editData, {headers});
  return this.http.put(`${URL}/${id}`, editData);
}

actualizaEstadoCliente(id: number, editData: CambioEstado) {
  return this.http.put(`${URL}/cambiaEstado/${id}`, editData);
}
}
