import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { Proveedor } from './model/proveedor';
import { ProveedorService } from './service/proveedor.service';


declare var $: any;

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit, OnDestroy{
  dtOptions: any = {};
  proveedores: Proveedor[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  formSubmitted = false;
  Estados: any = ['Activo', 'Inactivo'];
  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
    },
    {
      Validators
    }
  );

   constructor(
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
    this.obtenerProveedor();
  }

  obtenerProveedor() {
    this.proveedorService.obtenerProveedor().subscribe((dato: any) => {
      this.proveedores = dato;
      this.dtTrigger.next(this.dtOptions);
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

  crearProveedor() {
    console.log(this.registerForm.value)
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    //Realizar posteo
    this.proveedorService.newProveedor(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Proveedor creado correctamente',
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

  llenarForm(id: number) {
    this.proveedorService.obtenerIdProveedor(id).subscribe((res) => {
      this.registerForm.setValue({
        nombre: res['nombre'],
        documento: res['documento'],
        telefono: res['telefono'],
        email: res['email'],

        });

      $('#editarProveedor').modal('toggle');
      $('#editarProveedor').modal('show');

      localStorage.setItem('idCat', res['id']);
    });
  }

  editarProveedor() {
    this.proveedorService
      .editarProveedor(
        parseInt(localStorage.getItem('idCat')),
        this.registerForm.value
      )
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'El proveedor se actualizo correctamente',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result) {
              localStorage.removeItem('idCat');
              location.reload();
            }
          });
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
  }

  eliminarProveedor(id: number) {
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar este proveedor?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.proveedorService.deleteProveedor(id).subscribe(
            (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Proveedor eliminado correctamente',
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
        title: 'Desea Modificar el estado de este proveedor?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.proveedorService.actualizaEstadoProveedor(id, dato).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Proveedor Actualizado correctamente',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result) {
                  //this.proveedorService.obtenerProveedors().subscribe((dato: any) => {this.proveedors = dato;});
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
