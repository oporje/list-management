// container component deals with Store

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as fromListSelector from '../../store/list.selectors';
import * as fromListActions from '../../store/list.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListActions } from '../../models/list-action';
import { AddItemModalComponent } from '../add-item-modal/add-item-modal.component';
import { DeleteItemModalComponent } from '../delete-item-modal/delete-item-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionConfig } from '../../models/section-config.model';
import { ListCheckbox } from '../../models/list-checkbox-model';
@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent implements OnInit {
  public ngDestroyed$ = new Subject();

  listActions: Array<ListActions> = [
    {
      name: 'Move To List A',
      id: 'moveItemToA',
      source: 'listItemB',
      target: 'listItemA',
    },
    {
      name: 'Move To List B',
      id: 'moveItemToB',
      source: 'listItemA',
      target: 'listItemB',
    },
    { name: 'Add', id: 'addItem' },
    { name: 'Delete', id: 'deleteItem' },
  ];

  sectionsList: Array<SectionConfig> = [
    {
      name: 'List A',
      tplName: 'listContainerTpl',
      id: 'listItemA',
      type: 'list',
      data: null,
    },
    {
      name: 'Button container',
      tplName: 'buttonContainerTpl',
      id: 'buttonContainerA',
      type: 'buttons',
      data: this.listActions,
    },
    {
      name: 'List B',
      tplName: 'listContainerTpl',
      data: null,
      type: 'list',
      id: 'listItemB',
    },
  ];
  selectedItems = [];
  constructor(public store: Store<AppState>, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.subscribeToListItems();
  }

  subscribeToListItems(): void {
    this.store
      .select(fromListSelector.selectListState)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((listItems: any) => {
        this.sectionsList[0].data = listItems.listItemA;
        this.sectionsList[2].data = listItems.listItemB;
        this.selectedItems = [];
      });
  }

  callAction(action): void {
    switch (action.id) {
      case 'addItem':
        this.addItem();
        break;

      case 'moveItemToA':
        this.moveItem(action);
        break;

      case 'moveItemToB':
        this.moveItem(action);
        break;

      case 'deleteItem':
        this.deleteItem();
        break;
    }
  }

  onListItemSelection(event): void {
    // maintain selected items
    const item = event.item;
    if (item.isSelected) {
      this.selectedItems = [...this.selectedItems, item];
    } else {
      this.selectedItems = this.selectedItems.filter((selectedItem) => {
        if (
          selectedItem.id !== item.id ||
          selectedItem.listId !== item.listId
        ) {
          return selectedItem;
        }
      });
    }
  }

  getAvailableListItems(): Array<ListCheckbox> {
    // get available list items dynamically
    return this.sectionsList
      .filter((section) => section.type === 'list')
      .map((section) => {
        return {
          id: section.id,
          name: section.name,
          isChecked: false,
        };
      });
  }

  addItem(): void {
    // open add item modal and on confirmation dispatch add action
    const addedLists = this.getAvailableListItems();
    const addModalRef = this.modalService.open(AddItemModalComponent);

    addModalRef.componentInstance.listItems = addedLists;
    addModalRef.componentInstance.onItemAdd.subscribe((addedItem) => {
      this.dispatchAddAction(addedItem);
    });
  }

  dispatchAddAction(item): void {
    const listId = item.listId;
    let currentLength = 0;
    this.sectionsList.filter((section) =>
      section.id === listId ? (currentLength = section.data.length) : null
    );

    // only 10 items allowed
    if (currentLength >= 10) {
      return;
    }
    this.store.dispatch(
      new fromListActions.AddItem({
        itemConfig: {
          isSelected: false,
          item: {
            name: item.name,
            id: currentLength + 1,
          },
          listId: listId,
        },
      })
    );
  }

  moveItem(action) {
    // dispatch move Item action with params

    if (!this.selectedItems.length) {
      return;
    }

    const selectedItems = this.selectedItems.map((item) => {
      item.listId = action.target;
      return item;
    });

    this.store.dispatch(
      new fromListActions.MoveItem({
        source: action.source,
        target: action.target,
        selectedItems: selectedItems,
      })
    );
  }

  deleteItem(): void {
    const deletedListItems = this.getAvailableListItems();
    // open delete modal and on confirmation dispatch delete action
    const deletedList = this.sectionsList.filter((section) => {
      if (section.type === 'list')
        return {
          id: section.id,
          name: section.name,
          isChecked: false,
        };
    });

    if (!this.selectedItems.length) {
      return;
    }

    const deletModalRef = this.modalService.open(DeleteItemModalComponent);
    const selectedItems = [...this.selectedItems];
    deletModalRef.componentInstance.listItems = deletedListItems;
    deletModalRef.componentInstance.onDeleteClick.subscribe((selectedLists) => {
      selectedLists.map((list) => {
        this.dispatchDeleteAction(list, selectedItems);
      });
    });
  }

  dispatchDeleteAction(listId, selectedItems): void {
    this.store.dispatch(
      new fromListActions.DeleteItem({
        selectedItems: selectedItems,
        selectedListItem: listId,
      })
    );
  }

  ngOnDestroy(): void {
    // unsubscribe from selectors
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
