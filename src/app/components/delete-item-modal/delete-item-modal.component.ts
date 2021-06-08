import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-item-modal',
  templateUrl: './delete-item-modal.component.html',
  styleUrls: ['./delete-item-modal.component.scss']
})
export class DeleteItemModalComponent implements OnInit {
  selectedItem;

  @Input('listItems') listItems;
  @Output('onDeleteClick') onDeleteClick = new EventEmitter()
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onCheck(selectedItem) {
    selectedItem.isChecked = !selectedItem.isChecked;
  }

  deleteItem() {
    const selectedLists = this.listItems.filter(list => list.isChecked)
                              .map(list => list.id);

    this.onDeleteClick.emit(selectedLists);
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
