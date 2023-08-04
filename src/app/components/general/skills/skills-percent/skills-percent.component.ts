import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { skillSortProps } from 'src/app/pipes/skills-sort/skills-sort.model';
import { FiltersEntity, FullSortEntity, SortEntity } from 'src/app/services/filter/filter.model';
import { SkillsFilterService } from 'src/app/services/filter/skills-filter/skills-filter.service';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { FilterComponent } from '../../filter/filter.component';
import { SortComponent } from '../../sort/sort.component';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { NgFor, NgIf } from '@angular/common';
import { SkillsFilterPipe } from 'src/app/pipes/skills-filter/skills-filter.pipe';
import { SkillsSortPipe } from 'src/app/pipes/skills-sort/skills-sort.pipe';

@Component({
  selector: 'app-skills-percent',
  templateUrl: './skills-percent.component.html',
  styleUrls: ['./skills-percent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FilterComponent, SortComponent, SkillItemComponent, NgFor, SkillsFilterPipe, SkillsSortPipe, NgIf]
})
export class SkillsPercentComponent implements OnInit {
  @Input() skills!: SkillEntity[];
  @Input() name!: string;
  sortFields: SortEntity[] = skillSortProps;
  sortValue: SortEntity = { id: "knowledgepercent", value: "knowledgepercent", name: 'knowledgepercent' };
  sortAsc: boolean = true;
  filter: FiltersEntity[] = [];
  selectedFilter: FiltersEntity[] = [];

  constructor(private skillsFilterService: SkillsFilterService) {
  }

  ngOnInit(): void {
    this.filter = [this.skillsFilterService.getSkillFiltersOfSkills(this.skills)];
  }

  sortSkillsBy(selected: FullSortEntity) {
    this.sortValue = selected.value;
    this.sortAsc = selected.ascending;
  }

  filterSkillsBy(selected: FiltersEntity[]) {
    this.selectedFilter = selected;
  }

}
