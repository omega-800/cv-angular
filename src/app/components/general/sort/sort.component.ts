import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FullSortEntity, SortEntity } from 'src/app/services/filter/filter.model';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() fields!: SortEntity[];
  @Output() selectedEmitter = new EventEmitter<FullSortEntity>();

  ascending: boolean = true;
  selectedValue: SortEntity = { id: "", name: "", value: "" };

  ngOnInit(): void {
    this.ascending = true;
    this.selectedValue = this.fields[0];
  }

  selectItem() {
    this.selectedEmitter.emit({ id: "sort_" + this.selectedValue.value + "_" + this.ascending ? "ASC" : "DESC", name: "Sort Entity", value: this.selectedValue, ascending: this.ascending });
  }
}