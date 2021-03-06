import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {
  closeResult;
  listItem: string = 'listItemA';
  @ViewChild('addInput') inputName;
  @Output('onItemAdd') onItemAdd = new EventEmitter();
  @Input('listItems') listItems;
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {}

  addItem(): void {
    this.onItemAdd.emit({
      name: this.inputName.nativeElement.value,
      listId: this.listItem
    });
    this.closeModal();
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  onListItemSelection(selectedListItem: string): void {
    this.listItem = selectedListItem;
  }

}
