import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente/model/cliente';
import { ClienteService } from '../cliente/service/cliente.service';
import { Proveedor } from '../proveedor/model/proveedor';
import { ProveedorService } from '../proveedor/service/proveedor.service';
import { Movimiento_almacen } from './models/movimiento_almacen';
import { Tipo_documento } from './models/tipo_documento';
import { Tipo_movimiento } from './models/tipo_movimiento';
import { Movimiento_almacenService } from './services/movimientoAlmacen.service';
import { TipoDocumentoService } from './services/tipoDocumento.service';
import { TipoMovimientoService } from './services/tipoMovimiento.service';

@Component({
  selector: 'app-movimientos-almacen',
  templateUrl: './movimientos-almacen.component.html',
  styleUrls: ['./movimientos-almacen.component.css'],
})
export class MovimientosAlmacenComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  movimientos: Movimiento_almacen[] = [];
  tipoDoc: Tipo_documento[] = [];
  tipoMov: Tipo_movimiento[] = [];
  usuarios: Usuario[] = [];
  proveedores: Proveedor[] = [];
  clientes: Cliente[] = [];

  movSelec: Tipo_movimiento[] = [];

  formSubmitted = false;

  // con estos Valores enviamos al Web Service
  public registerForm = this.fb.group(
    {
      observaciones: [''],
      tipo_movimiento: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required]],
      proveedor: [''],
      cliente: [''],
      usuario: ['', [Validators.required]],
    },
    {
      Validators
    }
  );

  constructor(
    private movimientoAlmacenService: Movimiento_almacenService,
    private tipoDocumentoService: TipoDocumentoService,
    private proveedorService: ProveedorService,
    private clienteService: ClienteService,
    private tipoMovimientoService: TipoMovimientoService,
    private usuarioService: UsuarioService,
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
      //buttons: ['colvis', 'copy', 'print', 'excel'],
    };
    this.obtenerMovimientos();
  }

  obtenerMovimientos() {
    this.movimientoAlmacenService.listar().subscribe((dato: any) => {
      this.movimientos = dato;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  llenarSelects() {
    this.obtenerTipoMov(),
      this.obtenerTipoDoc(),
      this.obtenerUsuarios(),
      this.obtenerCliente(),
      this.obtenerProveedor();
  }
  obtenerTipoMov() {
    this.tipoMovimientoService.listar().subscribe((dato: any) => {
      this.tipoMov = dato;
    });
  }

  obtenerTipoDoc() {
    this.tipoDocumentoService.listar().subscribe((dato: any) => {
      this.tipoDoc = dato;
    });
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((dato: any) => {
      this.usuarios = dato;
    });
  }
  obtenerProveedor() {
    this.proveedorService.obtenerProveedor().subscribe((dato: any) => {
      this.proveedores = dato;
    });
  }

  obtenerCliente() {
    this.clienteService.obtenerCliente().subscribe((dato: any) => {
      this.clientes = dato;
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

  crearMovimiento() {
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value)
    //Realizar posteo
    this.movimientoAlmacenService.agregar(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Movimiento creado correctamente',
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

  get usuarioGet() {
    return this.registerForm.get('usuario');
  }

  usuarioSeleccionado(evento) {
    this.usuarioGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get tipoDocGet() {
    return this.registerForm.get('tipo_documento');
  }

  tipoDocSeleccionado(evento) {
    this.tipoDocGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get tipoMovGet() {
    return this.registerForm.get('tipo_movimiento');
  }
  tipoMovSeleccionado(evento) {
    this.tipoMovGet.setValue(evento.target.value, {
      onlySelf: true,
    });
    this.tipoMovimientoService
      .buscarXid(this.registerForm.get('tipo_movimiento').value)
      .subscribe((dato: any) => {
        this.movSelec = dato; 
      });
      console.log(this.movSelec);
  }

  get proveedorGet() {
    return this.registerForm.get('proveedor');
  }
  proveedorSeleccionado(evento) {
    this.proveedorGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get clienteGet() {
    return this.registerForm.get('cliente');
  }
  clienteSeleccionado(evento) {
    this.clienteGet.setValue(evento.target.value, {
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
        this.movimientoAlmacenService.cambioEstado(id, dato).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Movimiento Actualizado correctamente',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result) {
                location.reload();
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
