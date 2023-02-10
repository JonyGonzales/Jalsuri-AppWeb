import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService
  ) {}

  ngOnInit(): void {
    localStorage.clear()
  }


  login() {
    this.usuarioSvc.login(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        Swal.fire('Error', err.error?.message + ' Error al Inicial Sesion, Revisar el Email y/o Contraseña', 'error');
      }
    );
  }
}
