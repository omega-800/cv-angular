import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterCategoryEntity, FilterRangeEntity, FiltersEntity, SelectedFilterEntity, TagEntity } from 'src/app/services/filter/filter.model';
import { FilterState } from 'src/app/store/filter/filter.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filters!: FiltersEntity;
  @Output() filterEmitter = new EventEmitter<SelectedFilterEntity[]>();
  selectedFilter: SelectedFilterEntity[] = [];

  toggleTag(category: FilterCategoryEntity, tag: TagEntity) {
    /*
    this.selectedFilter.map(elem => {
      return elem.category == category.id && elem.value.includes(tag.value) ? elem.value.splice(elem.value.indexOf(tag.value)):elem;
    })*/

    if (this.selectedFilter.some(elem => elem.category == category.id)) {
      if (this.selectedFilter.filter(elem => elem.category == category.id)[0].value.includes(tag.value)) {
        this.selectedFilter.filter(elem => elem.category == category.id)[0].value.splice(this.selectedFilter.filter(elem => elem.category == category.id)[0].value.indexOf(tag.value), 1);
        if (this.selectedFilter.filter(elem => elem.category == category.id)[0].value.length == 0) {
          this.selectedFilter.splice(this.selectedFilter.findIndex(elem => elem.category == category.id), 1)
        }
      } else {
        this.selectedFilter.filter(elem => elem.category == category.id)[0].value.push(tag.value);
      }
    } else {
      this.selectedFilter.push({ id: category.id, name: category.name, category: category.id, value: [tag.value] })
    }
    this.filterEmitter.emit(this.selectedFilter);
  }

  changeRange(range: FilterRangeEntity, ref: HTMLInputElement) {
    if (this.selectedFilter.some(elem => elem.category == range.id)) {

    }
    ref.value = ref.value;
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
