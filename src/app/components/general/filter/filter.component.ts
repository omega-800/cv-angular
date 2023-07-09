import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FilterCategoryEntity,
  FilterRangeEntity,
  FiltersEntity,
  SelectedFilterEntity,
  TagEntity,
} from 'src/app/services/filter/filter.model';
import { ImageComp } from '../../components.model';
import { arrowIcon } from '../../components.constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filters!: FiltersEntity;
  @Input() filterName!: string;
  @Output() filterEmitter = new EventEmitter<SelectedFilterEntity[]>();
  selectedFilter: SelectedFilterEntity[] = [];
  arrowIcon: ImageComp = arrowIcon;

  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit() {
    this.filters.ranges?.forEach((range) =>
      this.selectedFilter.push({
        id: range.id,
        name: range.name,
        range: true,
        category: range.id,
        value: [range.values[0], range.values[range.values.length - 1]],
      })
    );
  }

  toggleTag(category: FilterCategoryEntity, tag: TagEntity) {
    let changed = false;
    this.selectedFilter.forEach((elem) => {
      if (elem.category == category.id) {
        if (elem.value.includes(tag.value)) {
          elem.value.splice(elem.value.indexOf(tag.value), 1);
          if (elem.value.length == 0) {
            this.selectedFilter.splice(
              this.selectedFilter.findIndex((el) => el.category == category.id),
              1
            );
          }
        } else {
          elem.value.push(tag.value);
        }
        changed = true;
      }
    });
    if (!changed) {
      this.selectedFilter.push({
        id: category.id,
        name: category.name,
        range: false,
        category: category.id,
        value: [tag.value],
      });
    }
    this.filterEmitter.emit(
      this.selectedFilter.sort((a, b) =>
        a.range == b.range ? 0 : a.range ? -1 : 1
      )
    );
  }

  changeRange(
    range: FilterRangeEntity,
    sliderOne: HTMLInputElement,
    sliderTwo: HTMLInputElement,
    outputOne: HTMLOutputElement,
    outputTwo: HTMLOutputElement
  ) {
    let isFirstSmaller = sliderOne.value <= sliderTwo.value;
    let [smaller, larger] = isFirstSmaller
      ? [sliderOne.value, sliderTwo.value]
      : [sliderTwo.value, sliderOne.value];
    this.selectedFilter.filter((elem) => elem.category == range.id)[0].value = [
      smaller,
      larger,
    ];
    [outputOne.innerHTML, outputTwo.innerHTML] = [sliderOne.value, sliderTwo.value] = isFirstSmaller 
    ? [smaller, larger] 
    : [larger, smaller];
    this.filterEmitter.emit(this.selectedFilter);
  }

  reset() {
    this.selectedFilter = [];
    this.filters.ranges?.forEach((range) =>
      this.selectedFilter.push({
        id: range.id,
        name: range.name,
        category: range.id,
        range: true,
        value: [range.values[0], range.values[range.values.length - 1]],
      })
    );
    this.filterEmitter.emit(this.selectedFilter);
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
