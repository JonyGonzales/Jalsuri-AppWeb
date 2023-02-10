import { Movimiento_almacen } from '../../movimientos-almacen/models/movimiento_almacen';
import { Producto } from '../../productos/models/producto';

export class Detalle_Mov_almacen {

  id_mov_almacen: Movimiento_almacen;
  id: number;
  producto: Producto;
  cantidad: number;
  observaciones:string;
  estado: string;

}
