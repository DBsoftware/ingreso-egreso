import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string;
  sub: Subscription =  new Subscription();
  constructor(private store: Store<AppState>,
        public ingresoEgresoService: IngresoEgresoService,
        public authService: AuthService) { }

  ngOnInit() {
    this.sub = this.store.select('auth')
    .pipe(filter(res => res.user != null))
    .subscribe(res => this.nombre = res.user.nombre);
  }

  ngOnDestroy(): void {
  this.sub.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
    this.ingresoEgresoService.cancelarSubs();
  }
}
