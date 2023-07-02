import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../components/general/address/address.component';
import { ButtonComponent } from '../components/general/button/button.component';
import { CarouselComponent } from '../components/general/carousel/carousel.component';
import { ContactpointComponent } from '../components/general/contactpoint/contactpoint.component';
import { ContentboxComponent } from '../components/general/contentbox/contentbox.component';
import { FilterComponent } from '../components/general/filter/filter.component';
import { ImageComponent } from '../components/general/image/image.component';
import { SkillItemComponent } from '../components/general/skills/skill-item/skill-item.component';
import { SkillCategoryPercentComponent } from '../components/general/skills/skillcategory-percent/skillcategory-percent.component';
import { SkillsPercentListComponent } from '../components/general/skills/skills-percent-list/skills-percent-list.component';
import { SkillsPercentComponent } from '../components/general/skills/skills-percent/skills-percent.component';
import { SortComponent } from '../components/general/sort/sort.component';
import { AgePipe } from '../pipes/age/age.pipe';
import { ProjectsFilterPipe } from '../pipes/projects-filter/projects-filter.pipe';
import { ProjectsSortPipe } from '../pipes/projects-sort/projects-sort.pipe';
import { SkillsFilterPipe } from '../pipes/skills-filter/skills-filter.pipe';
import { SkillsSortPipe } from '../pipes/skills-sort/skills-sort.pipe';
import { DatePipe } from '../pipes/date/date.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SkillItemComponent,
    SkillCategoryPercentComponent,
    SkillsPercentListComponent,
    FilterComponent,
    SkillsFilterPipe,
    CarouselComponent,
    ContactpointComponent,
    AddressComponent,
    ImageComponent,
    SkillsSortPipe,
    SortComponent,
    ProjectsSortPipe,
    DatePipe,
    ProjectsFilterPipe,
    ContentboxComponent,
    AgePipe,
    ButtonComponent,
    SkillsPercentComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkillItemComponent,
    SkillCategoryPercentComponent,
    SkillsPercentListComponent,
    FilterComponent,
    SkillsFilterPipe,
    CarouselComponent,
    ContactpointComponent,
    AddressComponent,
    ImageComponent,
    SkillsSortPipe,
    SortComponent,
    ProjectsSortPipe,
    DatePipe,
    ProjectsFilterPipe,
    ContentboxComponent,
    AgePipe,
    ButtonComponent,
    SkillsPercentComponent,
    CommonModule,
    FormsModule
  ],
  providers: [
    SkillsFilterPipe,
    AgePipe,
    ProjectsFilterPipe,
    DatePipe
  ]
})
export class SharedModule { }
