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
import { NgIf, NgFor } from '@angular/common';
import { Store } from '@ngxs/store';
import { Interest } from 'src/app/store/app/app.model';
import { DropDownAnimation } from 'src/app/animations';
import { SelectComponent } from '../select/select.component';
import { Entity } from 'src/app/services/entities.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NgVar } from 'src/app/directives/ng-var.directive';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [RangeComponent, NgIf, NgFor, SelectComponent, NgVar],
  animations: [DropDownAnimation],
})
export class FilterComponent implements OnInit {
  @Input() filters!: FiltersEntity[];
  @Input() additionalFilters$?: BehaviorSubject<FiltersEntity[]>;
  @Input() count!: number;
  @Output() filterEmitter = new EventEmitter<FiltersEntity[]>();
  selectedFilter: FiltersEntity[] = [];
  arrowIcon: ImageComp = arrowIcon;
  projectFilterProps = projectFilterProps;
  selectedInterest: Interest = Interest.IT;
  isActive = false;
  additionalFilters: FiltersEntity[] = [];

  //selectedFilter$: Observable<FiltersEntity[]> = of(this.selectedFilter);

  constructor(private cdref: ChangeDetectorRef, private store: Store) {}

  ngOnInit(): void {
    if (this.additionalFilters$ != undefined) {
      this.additionalFilters$.subscribe((res) => {
        this.setAdditionalFilters(res);
      });
    }
    this.store
      .select((state) => state.app.interest)
      .subscribe((res) => this.setInterestFilter(res));
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setAdditionalFilters(addFilters: FiltersEntity[]) {
    this.additionalFilters = addFilters;
    addFilters.forEach((filter) => {
      filter.categories.forEach((category) => {
        category.tags.forEach((tag) => {
          this.toggleTag(filter, category, tag, true);
        });
      });
    });
  }

  setInterestFilter(interest: Interest) {
    this.selectedInterest = interest;
    if (
      this.additionalFilters.length == null ||
      this.additionalFilters.length == 0
    ) {
      let filter = this.filters.find(
        (filter) => (filter.type as FilterTypes) == FilterTypes.PROJECT
      );
      if (filter != undefined) {
        let category = filter.categories.find(
          (cat) => cat.id == projectFilterProps.relevance
        );
        if (category != undefined) {
          let tag = category.tags.find((tag) => tag.id == interest);
          if (tag != undefined) {
            this.toggleTag(filter, category, tag, true);
          } else {
            this.selectedFilter = this.selectedFilter.reduce(
              (result: FiltersEntity[], filter) => {
                let newCategories = filter.categories.filter(
                  (cat) => cat.id != category!.id
                );
                if (newCategories.length > 0) {
                  result.push({ ...filter, categories: newCategories });
                }
                return result;
              },
              []
            );
            this.filterEmitter.emit(this.selectedFilter);
          }
        }
      }
    }
  }
  /*getSelectedCategoryTags(passedFilter: FiltersEntity, passedCategory: FilterCategoryEntity): Observable<TagEntity[]> {
    return of(this.selectedFilter.find((filter) => filter.id == passedFilter.id)?.categories.find(cat => cat.id == passedCategory.id)?.tags || []);
  }

  getName(categoryID: string, value: FilterType): string {
    return this.filters.categories.filter(cat => cat.id == categoryID)[0].tags.filter(tag => tag.value == value)[0].name;
  }

  setCategory(passedFilter: FiltersEntity, passedCategory: FilterCategoryEntity, passedTags: Entity[]) {
    let categoryCopy = JSON.parse(JSON.stringify(passedCategory));
    let filterCopy = JSON.parse(JSON.stringify(passedFilter));
    let tagsCopy = JSON.parse(JSON.stringify(passedTags));
    categoryCopy.tags = tagsCopy;
    let filterIndex: number = this.selectedFilter.findIndex(elem => (elem.id == passedFilter.id));
    if (filterIndex >= 0) {
      let filter = this.selectedFilter[filterIndex];
      let catIndex: number = filter.categories.findIndex(elem => (elem.id == passedCategory.id));
      if (catIndex >= 0) {
        filter.categories[catIndex] = categoryCopy;
      } else {
        filter.categories.push(categoryCopy);
      }
    } else {
      filterCopy.categories = [categoryCopy];
      this.selectedFilter.push(filterCopy)
    }
    this.filterEmitter.emit(this.selectedFilter)
  }*/

  toggleTag(
    passedFilter: FiltersEntity,
    passedCategory: FilterCategoryEntity,
    passedTag: TagEntity,
    forceTag: boolean = false
  ) {
    let categoryCopy = JSON.parse(JSON.stringify(passedCategory));
    let filterCopy = JSON.parse(JSON.stringify(passedFilter));
    let tagCopy = JSON.parse(JSON.stringify(passedTag));
    let htmlElem = document.getElementById(passedTag.id);

    let filterIndex: number = this.selectedFilter.findIndex(
      (elem) => elem.id == passedFilter.id
    );
    if (filterIndex >= 0) {
      let filter = this.selectedFilter[filterIndex];
      let catIndex: number = filter.categories.findIndex(
        (elem) => elem.id == passedCategory.id
      );
      if (catIndex >= 0) {
        let category = filter.categories[catIndex];
        let tagIndex = category.tags.findIndex(
          (elem) => elem.id == passedTag.id
        );
        if (forceTag) {
          category.tags = [tagCopy];
        } else if (tagIndex >= 0) {
          if (category.tags.length == 1) {
            filter.categories.splice(catIndex, 1);
            if (filter.categories.length < 1) {
              this.selectedFilter.splice(filterIndex, 1);
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
      this.selectedFilter.push(filterCopy);
      htmlElem?.classList.add('active');
    }
    this.filterEmitter.emit(this.selectedFilter);
  }

  updateRange(
    passedFilter: FiltersEntity,
    newRangeFilter: FilterCategoryEntity
  ) {
    let filterIndex = this.selectedFilter.findIndex(
      (elem) => elem.id == passedFilter.id
    );
    let defaultValues = this.isDefaultRangeValue(passedFilter, newRangeFilter);
    if (filterIndex >= 0) {
      let filter = this.selectedFilter[filterIndex];
      let rangeIndex: number = filter.categories.findIndex(
        (elem) => elem.isRange && elem.id == newRangeFilter.id
      );
      if (rangeIndex >= 0) {
        if (defaultValues) {
          filter.categories.splice(rangeIndex, 1);
          if (filter.categories.length < 1) {
            this.selectedFilter.splice(filterIndex, 1);
          }
        } else {
          filter.categories[rangeIndex] = newRangeFilter;
        }
      } else if (!defaultValues) {
        filter.categories.push(newRangeFilter);
      }
    } else if (!defaultValues) {
      let filterCopy = JSON.parse(JSON.stringify(passedFilter));
      filterCopy.categories = [newRangeFilter];
      this.selectedFilter.push(filterCopy);
    }
    this.filterEmitter.emit(this.selectedFilter);
  }

  resetRange(filter: FiltersEntity, selectedRange: FilterCategoryEntity) {
    let rangeValues = this.filters
      .find((elem) => elem.id == filter.id)
      ?.categories.find((range) => range.id == selectedRange.id)?.tags;
    if (rangeValues != undefined) {
      this.selectedFilter
        .find((elem) => elem.id == filter.id)!
        .categories.find((elem) => elem.id == selectedRange.id)!.tags = [
        rangeValues[0],
        rangeValues[rangeValues.length - 1],
      ];
      this.resetRangeDOM(
        selectedRange.id,
        rangeValues[0].value,
        rangeValues[rangeValues.length - 1].value
      );
    }
  }

  reset() {
    this.selectedFilter = [];
    this.filterEmitter.emit(this.selectedFilter);
    this.filters.forEach((filter) =>
      filter.categories
        .filter((cat) => cat.isRange)
        .forEach((range) => {
          this.resetRangeDOM(
            range.id,
            range.tags[0].value,
            range.tags[range.tags.length - 1].value
          );
        })
    );
    document
      .querySelectorAll('.tag')
      .forEach((elem) => elem.classList.remove('active'));
  }

  isDefaultRangeValue(
    filter: FiltersEntity,
    range: FilterCategoryEntity
  ): boolean {
    let selected = this.filters
      .find((elem) => elem.id == filter.id)!
      .categories.find((cat) => cat.id == range.id);
    return (
      selected?.tags[0].value == range.tags[0].value &&
      selected?.tags[selected?.tags.length - 1].value == range.tags[1].value
    );
  }

  resetRangeDOM(rangeID: string, minVal: FilterType, maxVal: FilterType) {
    (document.getElementById(rangeID + '_1') as HTMLInputElement).value =
      minVal.toString();
    (
      document.getElementById(rangeID + '_1_out') as HTMLOutputElement
    ).innerHTML = minVal.toString();
    (document.getElementById(rangeID + '_2') as HTMLInputElement).value =
      maxVal.toString();
    (
      document.getElementById(rangeID + '_2_out') as HTMLOutputElement
    ).innerHTML = maxVal.toString();
  }

  getRelevanceTag(category: FilterCategoryEntity): TagEntity | undefined {
    return category.tags.find((tag) => tag.id == this.selectedInterest);
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
