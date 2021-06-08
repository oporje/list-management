import { ActionReducerMap } from '@ngrx/store';
import * as fromListReducer from './list.reducer';

export interface AppState {
  listState: fromListReducer.ListState;
}

export const reducers: ActionReducerMap<AppState> = {
  listState: fromListReducer.reducer,
  // future root level states should go here
};
