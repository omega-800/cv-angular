import { Component, Input, OnInit } from '@angular/core';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent implements OnInit {
  @Input() skill!: SkillEntity;
  @Input() showPercent!: boolean;
  skillText: string = "";
  constructor() {
  }

  ngOnInit() {
    this.skillText = this.showPercent ? this.skill.knowledgepercent + "% " + this.skill.name : this.skill.name;
  }
}
