import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltersEntity, SortEntity, FullSortEntity } from 'src/app/services/filter/filter.model';
import { FilterComponent } from '../filter/filter.component';
import { SortComponent } from '../sort/sort.component';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-full-filter',
  templateUrl: './full-filter.component.html',
  styleUrls: ['./full-filter.component.scss'],
  standalone: true,
  imports: [FilterComponent, SortComponent, NgIf],
  host: { 'class': 'filters menu-item' }
})
export class FullFilterComponent {
  @Input() filters!: FiltersEntity[];
  @Input() lockedCount?: number;
  @Input() additionalFilters$?: BehaviorSubject<FiltersEntity[]>;
  @Input() count!: number;
  @Output() filterEmitter = new EventEmitter<FiltersEntity[]>();
  @Input() sortFields!: SortEntity[];
  @Output() sortEmitter = new EventEmitter<FullSortEntity>();
  loggedIn: boolean = false;
  isActive: boolean = false;
  selectedFilter: FiltersEntity[] = [];

  constructor(authService: AuthService, private cdref: ChangeDetectorRef) {
    authService.isLoggedIn.subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  emitFilter(filter: FiltersEntity[]) {
    this.selectedFilter = filter;
    this.filterEmitter.emit(filter)
  }
  emitSort(sort: FullSortEntity) {
    this.sortEmitter.emit(sort)
  }
}
