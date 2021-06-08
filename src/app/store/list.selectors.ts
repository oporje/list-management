import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAppState from './app.state';

// getters.
export const getListA = (state: fromAppState.AppState) => state.listState;

// Derivers
export const selectListState: MemoizedSelector<object, fromAppState.AppState> =
  createFeatureSelector<fromAppState.AppState>('listState');
