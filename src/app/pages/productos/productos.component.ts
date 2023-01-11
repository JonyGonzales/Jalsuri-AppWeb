import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UnidadMedida } from 'src/app/models/unidad-medida';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import Swal from 'sweetalert2';
import { Categoria } from '../categoria/models/categoria';
import { CategoriaService } from '../categoria/services/categoria.service';
import { Proveedor } from '../proveedor/model/proveedor';
import { ProveedorService } from '../proveedor/service/proveedor.service';
import { Producto } from './models/producto';
import { ProductoService } from './services/producto.service';

declare var $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit, OnDestroy {
  dtOptions: any = {};
  productos: Producto[] = [];
  categoria: Categoria[] = [];
  unidadMedidas: UnidadMedida[] = [];
  proveedores: Proveedor[]=[];
  dtTrigger: Subject<any> = new Subject<any>();

  formSubmitted = false;
  // con estos Valores enviamos al Web Service
  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
      id_unidad_medida: ['', [Validators.required]],
      id_proveedor: ['', [Validators.required]],
    },
    {
      Validators,
    }
  );

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private unidadMedidaService: UnidadMedidaService,
    private proveedorService: ProveedorService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pageLength: 10,
      searching: true,
      responsive: true,
      info: true,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json' },
      dom: 'Bfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
    };
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.productoService.listarProductos().subscribe((dato: any) => {
      this.productos = dato;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  llenarSelects(){
    this.obtenerProveedor(),
    this.obtenerCategorias(),
    this.obtenerUnidadMedidas()
  }
  obtenerProveedor() {
    this.proveedorService.obtenerProveedor().subscribe((dato: any) => {
      this.proveedores = dato;
    });
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe((dato: any) => {
      this.categoria = dato;
    });
  }

  obtenerUnidadMedidas() {
    this.unidadMedidaService.obtenerUnidadMedidas().subscribe((dato: any) => {
      this.unidadMedidas = dato;
    });
  }

  get estados() {
    return this.registerForm.get('est');
  }

  changeStatus(evento) {
    this.estados.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crearProductos() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    //Realizar posteo
    this.productoService.newProducto(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Producto creado correctamente',
          showConfirmButton: true,
        }).then((result) => {   
          location.reload();
        });
      },
      (err) => {
        const errorServer = JSON.parse(err.error);
        Swal.fire('Error', errorServer.message, 'error');
      }
    );
    console.log(this.registerForm.value);
  }

  // llenarForm(id: number) {
  //   this.productoService.obtenerIdProducto(id).subscribe((res) => {
  //     this.registerForm.setValue({
  //       nombre: res['nombre']
  //       });

  //     $('#editarProducto').modal('toggle');
  //     $('#editarProducto').modal('show');

  //     localStorage.setItem('idCat', res['id']);
  //   });
  // }

  // editarProducto() {
  //   this.productoService
  //     .editarProducto(
  //       parseInt(localStorage.getItem('idCat')),
  //       this.registerForm.value
  //     )
  //     .subscribe(
  //       (res) => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Exito',
  //           text: 'El producto se actualizo correctamente',
  //           confirmButtonText: 'Ok',
  //         }).then((result) => {
  //           if (result) {
  //             localStorage.removeItem('idCat');
  //             location.reload();
  //           }
  //         });
  //       },
  //       (err) => {
  //         Swal.fire('Error', err.error.message, 'error');
  //       }
  //     );
  // }

  // eliminarProducto(id: number) {
  //     Swal.fire({
  //       icon: 'question',
  //       title: 'Desea eliminar este producto?',
  //       showCancelButton: true,
  //       confirmButtonText: 'Confirmar',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.productoService.deleteProducto(id).subscribe(
  //           (res: any) => {
  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Producto eliminado correctamente',
  //               confirmButtonText: 'Ok',
  //             }).then((result) => {
  //               if (result) {
  //                 location.reload();
  //               }
  //             });
  //           },
  //           (err) => {
  //             Swal.fire('Error', err.error.message, 'error');
  //           }
  //         );
  //       }
  //     });
  // }

  get categorias() {
    return this.registerForm.get('id_categoria');
  }

  categoriaSeleccionada(evento) {
    this.categorias.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get unidadMedida() {
    return this.registerForm.get('id_unidad_medida');
  }

  unidadMedidaSeleccionada(evento) {
    this.unidadMedida.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get proveedorGet() {
    return this.registerForm.get('id_proveedor');
  }
  proveedorSeleccionada(evento){
    this.proveedorGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }
  

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  cambiaEstado(id: number, est: String) {
    if (est == 'Inactivo') {
      var dato = { estado: 'Activo' };
    }
    if (est == 'Activo') {
      var dato = { estado: 'Inactivo' };
    }
    Swal.fire({
      icon: 'question',
      title: 'Desea Modificar el estado de este producto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.actualizaEstadoProducto(id, dato).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Producto Actualizado correctamente',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result) {
                this.productoService
                  .listarProductos()
                  .subscribe((dato: any) => {
                    this.productos = dato;
                  });
                //location.reload();
                //this.ngOnDestroy();
              }
            });
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      }
    });
  }
}
