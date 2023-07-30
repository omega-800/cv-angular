import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterRangeEntity, SelectedFilterEntity } from 'src/app/services/filter/filter.model';
import { arrowIcon } from '../../components.constants';
import { ImageComp } from '../../components.model';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent {
  @Input() range!: FilterRangeEntity;
  @Output() rangeEmitter = new EventEmitter<SelectedFilterEntity>();
  arrowIcon: ImageComp = arrowIcon;

  changeRange(
    range: FilterRangeEntity,
    sliderOne: HTMLInputElement,
    sliderTwo: HTMLInputElement,
    outputOne: HTMLOutputElement,
    outputTwo: HTMLOutputElement
  ) {
    let [smaller, larger] = parseInt(sliderOne.value) < parseInt(sliderTwo.value)
      ? [sliderOne.value, sliderTwo.value]
      : [sliderTwo.value, sliderOne.value];
    let rangeFilter: SelectedFilterEntity = {
      id: range.id,
      name: range.name,
      range: true,
      category: range.id,
      value: [smaller, larger],
    };
    [outputOne.innerHTML, outputTwo.innerHTML] = [smaller, larger];
    this.rangeEmitter.emit(rangeFilter);
  }
}
