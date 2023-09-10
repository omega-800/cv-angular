import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { arrowIcon } from '../../icons.constants';
import { FullSortEntity, SortEntity } from 'src/app/services/filter/filter.model';
import { ImageComp } from '../../components.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Interest } from 'src/app/store/app/app.model';
import { SelectComponent } from '../select/select.component';
import { Entity } from 'src/app/services/entities.model';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule, SelectComponent],
  host: { 'class': 'sortComp flex-e2e' }
})
export class SortComponent implements OnInit {
  @Input() fields!: SortEntity[];
  @Output() selectedEmitter = new EventEmitter<FullSortEntity>();

  editedFields: SortEntity[] = [];
  ascdescFields: SortEntity[] = [{ id: "DESC", name: "Absteigend", value: "false" }, { id: "ASC", name: "Aufsteigend", value: "true" }];
  selectedValue: SortEntity = { id: "", name: "", value: "" };
  selectedAsc: SortEntity = { id: "DESC", name: "Absteigend", value: "false" };
  arrowIcon: ImageComp = arrowIcon;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
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

  selectField(field: Entity[]) {
    this.selectedValue = field[0] as SortEntity;
    this.selectItem();
  }

  selectAsc(field: Entity[]) {
    this.selectedAsc = field[0] as SortEntity;
    this.selectItem();
  }

  selectItem() {
    this.selectedEmitter.emit({ id: `sort_${this.selectedValue.value}_${this.selectedAsc.id}`, name: `Sort by ${this.selectedValue.name}`, value: this.selectedValue, ascending: this.selectedAsc.value == "true" });
  }
}
