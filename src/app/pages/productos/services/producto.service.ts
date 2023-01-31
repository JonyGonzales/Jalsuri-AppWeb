import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CambioEstado } from 'src/app/interfaces/cambio-estado.interface';
import { environment } from 'src/environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Producto } from '../models/producto';

// Conexion al Api Server del Backend
const URLSUBFIJO = '/productos'
const URL = environment.URLBASE + URLSUBFIJO

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  // Este metodo nos sirve para obtener las Productos
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${URL}`);
  }
  // Este metodo nos sirrve para Registrar una Productoc
  newProducto(producto: RegisterForm): Observable<Object> {
    return this.http.post(`${URL}`, producto, { responseType: 'text' });
  }

  editar(id: number, editData: RegisterForm) {
    return this.http.put(`${URL}/${id}`, editData);
  }

  // Cambia de Estado de Productos
  actualizaEstadoProducto(id: number, editData: CambioEstado) {
    return this.http.put(`${URL}/cambiaEstado/${id}`, editData);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${URL}/${id}`);
  }


  // Buscar por Id
  buscarXid(id:number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${URL}/${id}`);
  }
}
