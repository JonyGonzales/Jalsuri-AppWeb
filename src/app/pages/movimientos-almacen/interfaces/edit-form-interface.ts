export interface EditForm{

    id:number;
    fecha_movimiento : string;
    tipo_movimiento: number;
    tipo_documento: number;
    numero_documento: string;
    proveedor?:number;
    cliente?:number;
    usuario: number;
    observaciones:string;


}