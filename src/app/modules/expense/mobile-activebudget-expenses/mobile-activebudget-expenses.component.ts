import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Expense, ExpenseActions, ExpenseSelectors} from '@state/expenses';

@Component({
  selector: 'app-mobile-activebudget-expenses',
  templateUrl: './mobile-activebudget-expenses.component.html',
  styleUrls: ['./mobile-activebudget-expenses.component.scss']
})
export class MobileActivebudgetExpensesComponent implements OnInit {

  expenseList$ = this.store.select(ExpenseSelectors.activeBudget);
  displayDetails = false;
  selectedExpense: Expense = {amount: 0, budgetId: 0, categoryId: 0, date: undefined, label: '', name: '', id: -1};

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  editExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }
  removeExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }

  showDetails(expense: Expense) {
    this.displayDetails = true;
    this.selectedExpense = expense;
  }

}