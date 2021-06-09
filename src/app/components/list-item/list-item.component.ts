// presentational/dumb component

import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { ListItemConfig } from '../../models/list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  isSelected = false;
  constructor() { }

  @Input('listItem') listItem: ListItemConfig;
  @Output('onItemSelection') onItemSelection = new EventEmitter();

  ngOnInit(): void { }

  itemClicked(clickedItem): void {
    if (clickedItem) {
      this.isSelected = !this.isSelected;
      const selectedItem = Object.assign({}, clickedItem, {isSelected: this.isSelected});
      this.onItemSelection.emit({
        item: selectedItem
      });
    }
  }

}
