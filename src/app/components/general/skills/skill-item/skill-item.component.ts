import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { linkTypes } from 'src/app/components/components.constants';
import { LinkTypes } from 'src/app/components/components.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { Direction } from 'src/app/components/components.constants';
import { TooltipComponent } from '../../tooltip/tooltip.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project/project.service';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TooltipComponent, NgIf, NgFor]
})
export class SkillItemComponent implements OnInit {
  @Input() skill!: SkillEntity;
  @Input() showPercent!: boolean;
  skillText: string = '';
  lt: LinkTypes = linkTypes;
  direction = Direction;
  showTooltip = false;

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.skillText = this.showPercent
      ? this.skill.knowledgepercent + '% ' + this.skill.name
      : this.skill.name;
  }
  hasProjects(): boolean {
    return this.projectService.getProjectsBySkill(this.skill.skill_id).length > 0;
  }
  goToProjects() {
    this.router.navigate(['/projects'], { queryParams: { skillID: this.skill.skill_id }, queryParamsHandling: "merge" });
  }
}
