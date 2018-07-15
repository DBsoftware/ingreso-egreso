import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  subscripcion: Subscription;
  constructor(private authService: AuthService,  public store: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ui').subscribe(r => this.loading = r.isLoading);
  }

  login(data: any) {
    this.authService.login(data.email, data.pass);
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

}
