import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { arrowIcon } from '../../components.constants';
import { FullSortEntity, SortEntity } from 'src/app/services/filter/filter.model';
import { ImageComp } from '../../components.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Interest } from 'src/app/store/app/app.model';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule]
})
export class SortComponent implements OnInit {
  @Input() fields!: SortEntity[];
  @Output() selectedEmitter = new EventEmitter<FullSortEntity>();

  editedFields: SortEntity[] = [];
  ascending: boolean = false;
  selectedValue: SortEntity = { id: "", name: "", value: "" };
  arrowIcon: ImageComp = arrowIcon;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.ascending = false;
    this.selectedValue = this.fields[0];
    this.selectItem();
    this.store.select(state => state.app.interest).subscribe(res => this.setRelevanceSort(res));
  }

  setRelevanceSort(interest: Interest) {
    let relevanceSort = this.fields.find(field => field.value == interest);
    if (relevanceSort) {
      this.selectedValue = relevanceSort;
      this.editedFields = [this.selectedValue, ...this.fields.filter(field => field.name != "Relevanz")];
    } else {
      this.editedFields = [...this.fields.filter(field => field.name != "Relevanz")];
      this.selectedValue = this.editedFields[0];
    }
    this.selectItem();
  }

  selectItem() {
    this.selectedEmitter.emit({ id: "sort_" + this.selectedValue.value + "_" + this.ascending ? "ASC" : "DESC", name: "Sort Entity", value: this.selectedValue, ascending: this.ascending });
  }
}
