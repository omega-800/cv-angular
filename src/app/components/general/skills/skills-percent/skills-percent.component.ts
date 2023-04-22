import { Component, Input } from '@angular/core';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Component({
  selector: 'app-skills-percent',
  templateUrl: './skills-percent.component.html',
  styleUrls: ['./skills-percent.component.scss']
})
export class SkillsPercentComponent {
  @Input() skills!: SkillEntity[];
  @Input() name!: string;

}
