import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {mainContentAnimations, sidebarAnimations, SidebarState, headerAnimations, overlayAnimations} from '@shell/shell.animations';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, tap, pluck} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakPointRegistry} from '@angular/flex-layout';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {BudgetActions} from '@state/budgets';
import {CategoryActions} from '@state/categories';

@Component({
  selector: 'app-main-app',
  animations: [sidebarAnimations, mainContentAnimations, headerAnimations, overlayAnimations],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  sidebarVisible$ = new BehaviorSubject<boolean>(false);
  sidebarState$: Observable<SidebarState>;

  sidebarStateEnum = SidebarState;

  constructor(
    @Inject(DOCUMENT) private document,
    public breakpointObserver: BreakpointObserver,
    private registry: BreakPointRegistry,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.injectBackgroundColor();

    this.store.dispatch(BudgetActions.load());
    this.store.dispatch(CategoryActions.load());

    const isSmall$ = this.breakpointObserver.observe(this.registry.findByAlias('mob').mediaQuery).pipe(
      pluck('matches'),
      tap(matches => matches && this.sidebarVisible$.next(false))
    );

    this.sidebarState$ = combineLatest([isSmall$, this.sidebarVisible$]).pipe(
      map(([isSmall, sidebarVisible]) => (isSmall ? (sidebarVisible ? SidebarState.Over : SidebarState.Hidden) : SidebarState.Docked))
    );
  }

  toggleSidebar() {
    const current = this.sidebarVisible$.getValue();
    current ? this.document.body.classList.remove('ui-overflow-hidden') : this.document.body.classList.add('ui-overflow-hidden');
    this.sidebarVisible$.next(!current);
  }

  private injectBackgroundColor() {
    this.document.body.classList.add('background-app');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-app');
  }
}
