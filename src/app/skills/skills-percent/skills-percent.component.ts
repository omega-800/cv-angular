import { Component, Input } from '@angular/core';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill } from 'src/app/services/skill/skill.model';

@Component({
  selector: 'app-skills-percent',
  templateUrl: './skills-percent.component.html',
  styleUrls: ['./skills-percent.component.scss']
})
export class SkillsPercentComponent {
  @Input() skills!: Skill[];
  @Input() name!: string;
}
