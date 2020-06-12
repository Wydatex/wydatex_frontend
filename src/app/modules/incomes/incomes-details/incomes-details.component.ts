import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Income, IncomeActions} from '@state/incomes';

@Component({
  selector: 'app-incomes-details',
  templateUrl: './incomes-details.component.html',
  styleUrls: ['./incomes-details.component.scss']
})
export class IncomesDetailsComponent implements OnInit {

  @Input() income: Income;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editExpense(item: Income) {
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeExpense(item: Income) {
    this.store.dispatch(IncomeActions.removeDialog(item));
  }
}