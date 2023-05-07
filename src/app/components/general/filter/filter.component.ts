import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiltersEntity } from 'src/app/services/filter/filter.model';
import { FilterState } from 'src/app/store/filter/filter.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filterValues!:{[key:string]:string};
  @Input() name!: string;
  @Input() filters!: FiltersEntity[];
  filtersSelected$:Observable<FiltersEntity[]>;
  
  constructor(private store:Store) {
    /*for (const [key, value] of Object.entries(this.filterValues)) {
      this.filtersSelected[value] = false;
    };*/
    this.filtersSelected$ = this.store
      .select(FilterState.filters)
      .pipe();
  }

  onFilterChange(){
    //elem.classList.add('selected');
  }

}
