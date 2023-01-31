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
  dtTrigger= new Subject();

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
    this.llenarSelects();
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

  llenarForm(id: number) {
    this.productoService.buscarXid(id).subscribe((res) => {
      this.registerForm.patchValue({
        nombre: res['nombre'],
        stock: res['stock'],
        precio: res['precio'],
        id_categoria: this.categoriaService.obtenerIdCategoria(res['id_categoria']),
        id_unidad_medida: res['id_unidad_medida'],
        id_proveedor: res['id_proveedor'],
        });

      $('#editarProducto').modal('toggle');
      $('#editarProducto').modal('show');

      localStorage.setItem('idPro', res['id']);
    });
  }

  editarProductos() {
    this.productoService
      .editar(
        parseInt(localStorage.getItem('idPro')),
        this.registerForm.value
      )
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'El producto se actualizo correctamente',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result) {
              localStorage.removeItem('idPro');
              location.reload();
            }
          });
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
  }

  eliminar(id: number) {
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar este producto?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.productoService.eliminar(id).subscribe(
            (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Producto eliminado correctamente',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result) {
                  location.reload();
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
    var dato = null;
    if (est == 'Inactivo') {
      dato = { estado: 'Activo' };
    }
    if (est == 'Activo') {
      dato = { estado: 'Inactivo' };
    }
    Swal.fire({
      icon: 'question',
      title: 'Desea Modificar el estado de este producto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(dato);
        this.productoService.actualizaEstadoProducto(id, dato.value).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Producto Actualizado correctamente',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result) {
                location.reload();
                //this.ngOnDestroy();
              }
              console.log(res)
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
