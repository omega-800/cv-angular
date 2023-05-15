import { Component, Input, OnInit } from '@angular/core';
import { skillSortProps} from 'src/app/pipes/skills-sort/skills-sort.model';
import { FiltersEntity, FullSortEntity, SelectedFilterEntity, SortEntity } from 'src/app/services/filter/filter.model';
import { SkillsFilterService } from 'src/app/services/filter/skills-filter/skills-filter.service';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Component({
  selector: 'app-skills-percent',
  templateUrl: './skills-percent.component.html',
  styleUrls: ['./skills-percent.component.scss']
})
export class SkillsPercentComponent implements OnInit {
  @Input() skills!: SkillEntity[];
  @Input() name!: string;
  sortFields:SortEntity[] = skillSortProps;
  sortValue: SortEntity = {id:"knowledgepercent",value:"knowledgepercent",name:'knowledgepercent'};
  sortAsc:boolean=true;
  filter:FiltersEntity;
  selectedFilter:SelectedFilterEntity[] = [];

  constructor(private skillsFilterService:SkillsFilterService){
    this.filter = this.skillsFilterService.getSkillFilters();
  }

  ngOnInit(): void {
    this.filter = this.skillsFilterService.getSkillFiltersOfSkills(this.skills);
  }

  sortSkillsBy(selected:FullSortEntity){
    this.sortValue = selected.value;
    this.sortAsc = selected.ascending; 
  }

  filterSkillsBy(selected:SelectedFilterEntity[]) {
    this.selectedFilter = selected;
  }

}
