import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading = false;
  subscripcion: Subscription = new Subscription();
  constructor(private authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
  this.subscripcion = this.store.select('ui').subscribe(r => this.loading = r.isLoading);
  }

  submit(data: any ) {
    this.authService.crear_usuario(data.nombre, data.mail, data.pass);
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

}
