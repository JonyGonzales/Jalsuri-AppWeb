import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  dtOptions: any = {};
  usuarios: Usuario[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  formSubmitted = false;
  Roles: any = ['admin', 'user'];

  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      role: ['', [Validators.required]],
      area: ['', [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  public cambioContrasenaForm = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    newPassword2: ['', [Validators.required]],

  },
  {
    validators: this.passwordsIguales('newPassword', 'newPassword2'),
  });

  constructor(
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
      buttons: ['copy', 'print', 'excel'],
    };
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.usuarioService.obtenerUsuarios().subscribe((dato: any) => {
      this.usuarios = dato;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crearUsuarios() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value)
    //Realizar posteo
    this.usuarioService.newUsuario(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Usuario creado correctamente',
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

  cambiarPass(id: number) {

    let idUser = id.toString();

    $('#cambiarPassword').modal('toggle');
    $('#cambiarPassword').modal('show');

    localStorage.setItem('userId', idUser);
    this.formSubmitted = false;

  }

  llenarForm(id: number) {
    this.usuarioService.obtenerIdUsuario(id).subscribe((res) => {
      this.registerForm.setValue({
        nombre: res['nombre'],
        email: res['email'],
        password: '',
        password2: '',
        role: res['role'],
        area: res['area'],
      });

      $('#editarUsuario').modal('toggle');
      $('#editarUsuario').modal('show');

      localStorage.setItem('idUser', res['id']);
    });
  }

  editarUsuario() {
    this.usuarioService
      .editarUsuario(
        parseInt(localStorage.getItem('idUser')),
        this.registerForm.value
      )
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'El usuario se actualizo correctamente',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result) {
              localStorage.removeItem('idUser');
              localStorage.removeItem('userId');
              location.reload();
            }
          });
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
  }

  changePassword() {
    this.formSubmitted = true;
    if (this.cambioContrasenaForm.invalid) {
      return;
    }
     this.usuarioService.cambioPassword(parseInt(localStorage.getItem('userId')),this.cambioContrasenaForm.value).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'El password se actualizo correctamente',
           confirmButtonText: 'Ok',
         }).then((result) => {
           if (result) {
             location.reload();
             localStorage.removeItem('userId');
           }
         });
        },
       (err) => {
         const errorPass = JSON.parse(err.error);

          Swal.fire('Error', errorPass.message, 'error');
         }
       );
  }
  eliminarUsuario(id: number) {
    if (id == parseInt(localStorage.getItem('usuarioId'))) {
      Swal.fire('Error', 'No puede eliminar un usuario activo', 'error');
    } else {
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar este usuario?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.deleteUsuario(id).subscribe(
            (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado correctamente',
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
  }

  get roles() {
    return this.registerForm.get('role');
  }

  changeRole(evento) {
    this.roles.setValue(evento.target.value, {
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

  campoNoValido2(campo: string): boolean {
    if (this.cambioContrasenaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  constrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  constrasenasNoValidas2() {
    const pass1 = this.cambioContrasenaForm.get('newPassword').value;
    const pass2 = this.cambioContrasenaForm.get('newPassword2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  cambiaEstado(id: number, est: String) {
    if (est == 'Inactivo') {
      var dato = { estado: 'Activo' };
    }
    if (est == 'Activo') {
      var dato = { estado: 'Inactivo' };
    }
    if (id == parseInt(localStorage.getItem('usuarioId'))) {
      Swal.fire('Error', 'No puede Deshabilitar un usuario activo', 'error');
    } else {
      Swal.fire({
        icon: 'question',
        title: 'Desea Modificar el estado de este usuario?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.actualizaEstadoUsuario(id, dato).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Usuario Actualizado correctamente',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result) {
                  //this.usuarioService.obtenerUsuarios().subscribe((dato: any) => {this.usuarios = dato;});
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
}
