import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { linkTypes } from 'src/app/components/components.constants';
import { LinkTypes } from 'src/app/components/components.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { Direction } from 'src/app/components/components.constants';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillItemComponent implements OnInit {
  @Input() skill!: SkillEntity;
  @Input() showPercent!: boolean;
  skillText: string = '';
  lt: LinkTypes = linkTypes;
  direction = Direction;

  constructor() {}

  ngOnInit() {
    this.skillText = this.showPercent
      ? this.skill.knowledgepercent + '% ' + this.skill.name
      : this.skill.name;
  }
}
