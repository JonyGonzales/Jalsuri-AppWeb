export interface RegisterForm{

    id:number;
    fecha_movimiento : Date;
    tipo_movimiento: number;
    tipo_documento: number;
    numero_documento: string;
    cliente?:number;
    proveedor?:number;
    usuario: number;  
    observaciones:string;

}