import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filterValues!:{[key:string]:string};
  @Input() name!: string;
  filtersSelected:{[key:string]:boolean} = {};
  
  constructor() {
    /*for (const [key, value] of Object.entries(this.filterValues)) {
      this.filtersSelected[value] = false;
    };*/
  }

  onFilterChange(){
    //elem.classList.add('selected');
  }

}
