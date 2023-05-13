import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterCategoryEntity, FiltersEntity, SelectedFilterEntity, TagEntity } from 'src/app/services/filter/filter.model';
import { FilterState } from 'src/app/store/filter/filter.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filters!:FiltersEntity;
  @Output() filterEmitter = new EventEmitter<SelectedFilterEntity[]>();
  selectedFilter:SelectedFilterEntity[] = [];

  toggleTag(category:FilterCategoryEntity, tag:TagEntity){
    this.selectedFilter.some(elem => elem.category == category.id && elem.value == tag.value) ? this.selectedFilter.splice(this.selectedFilter.findIndex(elem => elem.category == category.id && elem.value == tag.value), 1) : this.selectedFilter.push({id:tag.id, name:tag.name, category:category.id, value:tag.value});
    this.filterEmitter.emit(this.selectedFilter);
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
