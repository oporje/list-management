import * as fromListActions from './list.actions';
import { ListItem } from '../models/list-item';

// List State model
export interface ListState {
  listItemA: Array<ListItem>;
  listItemB: Array<ListItem>;
  selectedListItems: Array<ListItem>;
}

// list state default values/ initial state
export const initialState: ListState = {
  listItemA: [],
  listItemB: [],
  selectedListItems: [],
};

// reducer function for List Actions
export function reducer(
  state = initialState,
  action: fromListActions.ListActions
): ListState {
  switch (action.type) {
    // Add Item to the input list name
    case fromListActions.ListActionTypes.ADD_ITEM: {
      const listName = action.payload.itemConfig.listId;
      return {
        ...state,
        [listName]: [...state[listName], action.payload.itemConfig],
      };
    }

    // Move Item to the clicked list name
    case fromListActions.ListActionTypes.MOVE_ITEM: {
      const sourList = action.payload.source;
      const targetList = action.payload.target;
      const selectedIds = action.payload.selectedItems.map((itemConfig) => {
        return itemConfig.item.id;
      });

      return {
        ...state,
        [sourList]: state[sourList].filter(
          (stateItem) => !selectedIds.includes(stateItem.item.id)
        ),
        [targetList]: [...state[targetList], ...action.payload.selectedItems],
      };
    }

    // Delete selected items from the target List item
    case fromListActions.ListActionTypes.DELETE_ITEM: {
      const targetListItem = action.payload.selectedListItem;
      const selectedIds = action.payload.selectedItems.map((itemConfig) => {
        return {
          id: itemConfig.item.id,
          listId: itemConfig.listId,
        };
      });

      return {
        ...state,
        [targetListItem]: state[targetListItem].filter((stateItem) => {
          let isAvailable = true;
          selectedIds.map((item) => {
            if (
              item.listId === stateItem.listId &&
              item.id === stateItem.item.id
            ) {
              isAvailable = false;
            }
          });
          if (isAvailable) {
            return stateItem;
          }
        }),
      };
    }

    default: {
      return state;
    }
  }
}
