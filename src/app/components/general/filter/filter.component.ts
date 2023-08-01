import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FilterRangeEntity,
  FiltersEntity,
  SelectedFilterEntity,
  FilterType,
  RangeType,
} from 'src/app/services/filter/filter.model';
import { ImageComp } from '../../components.model';
import { arrowIcon } from '../../components.constants';
import { RangeComponent } from '../range/range.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [RangeComponent, NgIf, NgFor]
})
export class FilterComponent {
  @Input() filters!: FiltersEntity;
  @Input() filterName!: string;
  @Output() filterEmitter = new EventEmitter<SelectedFilterEntity[]>();
  selectedFilter: SelectedFilterEntity[] = [];
  //selectedFilter: FiltersEntity = {id:'selected-filter',name:'Selected Filter',categories:[], ranges:[]};
  arrowIcon: ImageComp = arrowIcon;

  constructor(private cdref: ChangeDetectorRef) { }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  getName(categoryID: string, value: FilterType): string {
    return this.filters.categories.filter(cat => cat.id == categoryID)[0].tags.filter(tag => tag.value == value)[0].name;
  }

  toggleTag(categoryID: string, categoryName: string, tagValue: FilterType) {
    let htmlElem = document.getElementById(this.filters.categories.filter(cat => cat.id == categoryID)[0].tags.filter(tag => tag.value == tagValue)[0].id);
    let catIndex: number = this.selectedFilter.findIndex(elem => (elem.category == categoryID));
    if (catIndex >= 0) {
      let elem = this.selectedFilter[catIndex];
      let valIndex = elem.value.indexOf(tagValue);
      if (valIndex >= 0) {
        if (elem.value.length == 1) {
          this.selectedFilter.splice(catIndex, 1);
        } else {
          elem.value.splice(valIndex, 1);
        }
        htmlElem?.classList.remove('active');
      } else {
        elem.value.push(tagValue);
        htmlElem?.classList.add('active');
      }
    } else {
      this.selectedFilter.push({
        id: categoryID,
        name: categoryName,
        range: false,
        category: categoryID,
        value: [tagValue],
      });
      htmlElem?.classList.add('active');
    }
    this.emitFilter();
  }

  emitFilter() {
    this.filterEmitter.emit(
      this.selectedFilter.sort((a, b) =>
        a.range == b.range ? 0 : a.range ? -1 : 1
      )
    );
  }

  updateRange(newRangeFilter: SelectedFilterEntity) {
    let rangeIndex: number = this.selectedFilter.findIndex(elem => (elem.range && elem.category == newRangeFilter.id));
    if (rangeIndex >= 0) {
      if (this.isDefaultRangeValue(newRangeFilter)) {
        this.selectedFilter.splice(rangeIndex, 1);
      } else {
        this.selectedFilter[rangeIndex] = newRangeFilter;
      }
    } else {
      this.selectedFilter.push(newRangeFilter);
    }
    this.emitFilter();
  }

  resetRange(selectedRange: SelectedFilterEntity) {
    let rangeValues = this.filters.ranges?.filter((range) => range.id == selectedRange.id)[0].values;
    if (rangeValues !== undefined) {
      this.selectedFilter.filter((elem) => elem.category == selectedRange.id)[0].value = [
        rangeValues[0], rangeValues[rangeValues.length - 1]
      ];
      this.resetRangeDOM(selectedRange.id, rangeValues[0], rangeValues[rangeValues.length - 1]);
    }
  }

  reset() {
    this.selectedFilter = [];
    this.filterEmitter.emit(this.selectedFilter);
    this.filters.ranges?.forEach((range) => {
      this.resetRangeDOM(range.id, range.values[0], range.values[range.values.length - 1]);
    });
    document
      .querySelectorAll('.tag')
      .forEach((elem) => elem.classList.remove('active'));
  }

  isDefaultRangeValue(range: SelectedFilterEntity): boolean {
    let selected = this.filters.ranges?.filter(
      (elem) => elem.id == range.id
    )[0];
    return (
      selected?.values[0] == range.value[0] &&
      selected?.values[selected?.values.length - 1] == range.value[1]
    );
  }

  resetRangeDOM(rangeID: string, minVal: RangeType, maxVal: RangeType) {
    (document.getElementById(rangeID + "_1") as HTMLInputElement).value = minVal.toString();
    (document.getElementById(rangeID + "_1_out") as HTMLOutputElement).innerHTML = minVal.toString();
    (document.getElementById(rangeID + "_2") as HTMLInputElement).value = maxVal.toString();
    (document.getElementById(rangeID + "_2_out") as HTMLOutputElement).innerHTML = maxVal.toString();
  }

  /*@Input() filterValues!:{[key:string]:string};
  @Input() name!: string;
  @Input() filters!: FiltersEntity[];
  filtersSelected$:Observable<FiltersEntity[]>;
  
  constructor(private store:Store) {
    for (const [key, value] of Object.entries(this.filterValues)) {
      this.filtersSelected[value] = false;
    };
    this.filtersSelected$ = this.store
      .select(FilterState.filters)
      .pipe();
  }

  onFilterChange(){
    //elem.classList.add('selected');
  } */
}
