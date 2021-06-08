import { Action } from '@ngrx/store';
import { ListItemConfig } from '../models/list-item';

// Required actions in the applications
export enum ListActionTypes {
  ADD_ITEM = '[List] Add Item',
  MOVE_ITEM = '[List] Move Item',
  DELETE_ITEM = '[List] Delete Item',
}

export class AddItem implements Action {
  readonly type = ListActionTypes.ADD_ITEM;
  constructor(public payload: { itemConfig: ListItemConfig }) {}
}

export class MoveItem implements Action {
  readonly type = ListActionTypes.MOVE_ITEM;
  constructor(
    public payload: {
      source: string;
      target: string;
      selectedItems: Array<ListItemConfig>;
    }
  ) {}
}

export class DeleteItem implements Action {
  readonly type = ListActionTypes.DELETE_ITEM;
  constructor(
    public payload: {
      selectedItems: Array<ListItemConfig>;
      selectedListItem: string;
    }
  ) {}
}

export type ListActions = AddItem | MoveItem | DeleteItem;
