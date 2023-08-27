import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterCategoryEntity } from 'src/app/services/filter/filter.model';
import { arrowIcon } from '../../icons.constants';
import { ImageComp } from '../../components.model';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  host: { 'class': 'default-grid slimpill' },
  standalone: true
})
export class RangeComponent {
  @Input() range!: FilterCategoryEntity;
  @Output() rangeEmitter = new EventEmitter<FilterCategoryEntity>();
  arrowIcon: ImageComp = arrowIcon;

  changeRange(
    sliderOne: HTMLInputElement,
    sliderTwo: HTMLInputElement,
    outputOne: HTMLOutputElement,
    outputTwo: HTMLOutputElement
  ) {
    let [smaller, larger] = parseInt(sliderOne.value) < parseInt(sliderTwo.value)
      ? [sliderOne.value, sliderTwo.value]
      : [sliderTwo.value, sliderOne.value];
    let rangeFilter: FilterCategoryEntity = JSON.parse(JSON.stringify(this.range));
    rangeFilter.tags = [{ ...rangeFilter.tags.find(elem => elem.value == smaller)!, value: parseInt(smaller) }, { ...rangeFilter.tags.find(elem => elem.value == larger)!, value: parseInt(larger) }];
    [outputOne.innerHTML, outputTwo.innerHTML] = [smaller, larger];
    this.rangeEmitter.emit(rangeFilter);
  }
}
