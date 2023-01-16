import { UnidadMedida } from "src/app/models/unidad-medida";
import { Categoria } from "../../categoria/models/categoria";
import { Proveedor } from "../../proveedor/model/proveedor";

export class Insumo {
    id : number;
    nombre: String;
    stock: number;
    precio: number;
    fecha_ingreso: String;
    fecha_vencimiento: String;
    categoria: Categoria;
    unidad_medida: UnidadMedida;
    proveedor:Proveedor;
    estado: String
    
}
