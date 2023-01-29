import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { Cliente } from './model/cliente';
import { ClienteService } from './service/cliente.service';

declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit, OnDestroy {
  dtOptions: any = {};
  clientees: Cliente[] = [];
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
      Validators,
    }
  );

  constructor(
    private clienteService: ClienteService,
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
    this.obtenerCliente();
  }

  obtenerCliente() {
    this.clienteService.obtenerCliente().subscribe((dato: any) => {
      this.clientees = dato;
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

  crearCliente() {
    console.log(this.registerForm.value);
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    //Realizar posteo
    this.clienteService.newCliente(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Cliente creado correctamente',
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
    this.clienteService.obtenerIdCliente(id).subscribe((res) => {
      this.registerForm.setValue({
        nombre: res['nombre'],
        documento: res['documento'],
        telefono: res['telefono'],
        email: res['email'],
      });

      $('#editarCliente').modal('toggle');
      $('#editarCliente').modal('show');

      localStorage.setItem('idCat', res['id']);
    });
  }

  editarCliente() {
    this.clienteService
      .editarCliente(
        parseInt(localStorage.getItem('idCat')),
        this.registerForm.value
      )
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'El cliente se actualizo correctamente',
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

  eliminarCliente(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Desea eliminar este cliente?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Cliente eliminado correctamente',
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
      title: 'Desea Modificar el estado de este cliente?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.actualizaEstadoCliente(id, dato).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Cliente Actualizado correctamente',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result) {
                //this.clienteService.obtenerClientes().subscribe((dato: any) => {this.clientes = dato;});
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
