import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from '../../../../node_modules/rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  nombre: string;
  sub: Subscription =  new Subscription();
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.sub = this.store.select('auth')
    .pipe(filter(res => res.user != null))
    .subscribe(res => this.nombre = res.user.nombre);
  }

  ngOnDestroy(): void {
  this.sub.unsubscribe();
  }

}
