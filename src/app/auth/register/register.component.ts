import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submit(data: any ) {
    console.log(data);
    this.authService.crear_usuario(data.nombre, data.mail, data.pass);
  }

}
