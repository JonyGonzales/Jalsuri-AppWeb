import { Usuario } from 'src/app/models/usuario';
import { Cliente } from '../../cliente/model/cliente';
import { Proveedor } from '../../proveedor/model/proveedor';
import { Tipo_documento } from './tipo_documento';
import { Tipo_movimiento } from './tipo_movimiento';

export class Movimiento_almacen {
  id: number;
  fecha_movimiento: string;
  tipo_movimiento: Tipo_movimiento;
  tipo_documento: Tipo_documento;
  numero_documento: string;
  proveedor?: Proveedor;
  cliente?: Cliente;
  usuario: Usuario;
  observaciones:string;
  estado: string;
}
