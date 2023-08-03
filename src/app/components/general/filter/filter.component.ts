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
  FiltersEntity,
  FilterType,
  FilterTypes,
  TagEntity,
} from 'src/app/services/filter/filter.model';
import { projectFilterProps } from 'src/app/services/filter/project-filter/project-filter.model';
import { ImageComp } from '../../components.model';
import { arrowIcon } from '../../components.constants';
import { RangeComponent } from '../range/range.component';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { Interest } from 'src/app/store/app/app.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [RangeComponent, NgIf, NgFor, JsonPipe]
})
export class FilterComponent implements OnInit {
  @Input() filters!: FiltersEntity[];
  @Output() filterEmitter = new EventEmitter<FiltersEntity[]>();
  selectedFilter: FiltersEntity[] = [];
  arrowIcon: ImageComp = arrowIcon;
  projectFilterProps = projectFilterProps;
  selectedInterest: Interest = Interest.IT;

  constructor(private cdref: ChangeDetectorRef, private store: Store) {
  }

  setInterestFilter(interest: Interest) {
    let filterIndex = this.filters.findIndex((filter) => filter.type == FilterTypes.PROJECT);
    if (filterIndex >= 0) {
      let filterApplies = this.filters[filterIndex];
      let categoryIndex = filterApplies.categories.findIndex(cat => cat.id == projectFilterProps.relevance);
      if (categoryIndex >= 0) {
        let categoryApplies = filterApplies.categories[categoryIndex];
        let tagIndex = categoryApplies.tags.findIndex(tag => tag.id == interest);
        if (tagIndex >= 0) {
          this.toggleTag(filterApplies, categoryApplies, categoryApplies.tags[tagIndex], true);
        } else {
          this.selectedFilter = this.selectedFilter.reduce((result: FiltersEntity[], filter) => {
            let newCategories = filter.categories.filter(cat => cat.id != categoryApplies.id);
            if (newCategories.length > 0) {
              result.push({ ...filter, categories: newCategories });
            }
            return result;
          }, []);
          this.filterEmitter.emit(this.selectedFilter)
        }
      }
    }
  }

  ngOnInit(): void {
    this.store.select(state => state.app.interest).subscribe(res => this.setInterestFilter(res));
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  /*getName(categoryID: string, value: FilterType): string {
    return this.filters.categories.filter(cat => cat.id == categoryID)[0].tags.filter(tag => tag.value == value)[0].name;
  }*/

  toggleTag(passedFilter: FiltersEntity, passedCategory: FilterCategoryEntity, passedTag: TagEntity, force: boolean = false) {
    let categoryCopy = JSON.parse(JSON.stringify(passedCategory));
    let filterCopy = JSON.parse(JSON.stringify(passedFilter));
    let tagCopy = JSON.parse(JSON.stringify(passedTag));
    let htmlElem = document.getElementById(passedTag.id);

    let filterIndex: number = this.selectedFilter.findIndex(elem => (elem.type == passedFilter.type));
    if (filterIndex >= 0) {
      let filter = this.selectedFilter[filterIndex];
      let catIndex: number = filter.categories.findIndex(elem => (elem.id == passedCategory.id));
      if (catIndex >= 0) {
        let category = filter.categories[catIndex];
        let tagIndex = category.tags.findIndex(elem => elem.id == passedTag.id);
        if (force) {
          category.tags = [tagCopy];
        } else if (tagIndex >= 0) {
          if (category.tags.length == 1) {
            filter.categories.splice(catIndex, 1);
            if (filter.categories.length < 1) {
              this.selectedFilter.splice(filterIndex, 1)
            }
          } else {
            category.tags.splice(tagIndex, 1);
          }
          htmlElem?.classList.remove('active');
        } else {
          category.tags.push(tagCopy);
          htmlElem?.classList.add('active');
        }
      } else {
        categoryCopy.tags = [tagCopy];
        filter.categories.push(categoryCopy);
        htmlElem?.classList.add('active');
      }
    } else {
      categoryCopy.tags = [tagCopy];
      filterCopy.categories = [categoryCopy];
      this.selectedFilter.push(filterCopy)
      htmlElem?.classList.add('active');
    }
    this.filterEmitter.emit(this.selectedFilter)
  }

  updateRange(passedFilter: FiltersEntity, newRangeFilter: FilterCategoryEntity) {
    let filter = this.selectedFilter.find(elem => (elem.type == passedFilter.type));
    if (filter != undefined) {
      let rangeIndex: number = filter.categories.findIndex(elem => (elem.isRange && elem.id == newRangeFilter.id));
      if (rangeIndex >= 0) {
        if (this.isDefaultRangeValue(passedFilter, newRangeFilter)) {
          this.selectedFilter.splice(rangeIndex, 1);
        } else {
          filter.categories[rangeIndex] = newRangeFilter;
        }
      } else {
        filter.categories.push(newRangeFilter);
      }
    } else {
      let filterCopy = JSON.parse(JSON.stringify(passedFilter));
      filterCopy.categories = [newRangeFilter];
      this.selectedFilter.push(filterCopy)
    }
    this.filterEmitter.emit(this.selectedFilter)
  }

  resetRange(filter: FiltersEntity, selectedRange: FilterCategoryEntity) {
    let rangeValues = this.filters.find(elem => (elem.type == filter.type))?.categories.find((range) => range.id == selectedRange.id)?.tags;
    if (rangeValues != undefined) {
      this.selectedFilter.find(elem => (elem.type == filter.type))!.categories.find((elem) => elem.id == selectedRange.id)!.tags = [
        rangeValues[0], rangeValues[rangeValues.length - 1]
      ];
      this.resetRangeDOM(selectedRange.id, rangeValues[0].value, rangeValues[rangeValues.length - 1].value);
    }
  }

  reset() {
    this.selectedFilter = [];
    this.filterEmitter.emit(this.selectedFilter);
    this.filters.forEach(filter => filter.categories.filter(cat => cat.isRange).forEach((range) => {
      this.resetRangeDOM(range.id, range.tags[0].value, range.tags[range.tags.length - 1].value);
    }));
    document
      .querySelectorAll('.tag')
      .forEach((elem) => elem.classList.remove('active'));
  }

  isDefaultRangeValue(filter: FiltersEntity, range: FilterCategoryEntity): boolean {
    let selected = this.filters.find(elem => (elem.type == filter.type))!.categories.find((cat) => cat.id == range.id)
    return (
      selected?.tags[0].value == range.tags[0].value &&
      selected?.tags[selected?.tags.length - 1].value == range.tags[1].value
    );
  }

  resetRangeDOM(rangeID: string, minVal: FilterType, maxVal: FilterType) {
    (document.getElementById(rangeID + "_1") as HTMLInputElement).value = minVal.toString();
    (document.getElementById(rangeID + "_1_out") as HTMLOutputElement).innerHTML = minVal.toString();
    (document.getElementById(rangeID + "_2") as HTMLInputElement).value = maxVal.toString();
    (document.getElementById(rangeID + "_2_out") as HTMLOutputElement).innerHTML = maxVal.toString();
  }

  getRelevanceTag(category: FilterCategoryEntity): TagEntity | undefined {
    return category.tags.find(tag => tag.id == this.selectedInterest);
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
