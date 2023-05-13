import { SkillProp } from "src/app/pipes/skills-sort/skills-sort.model";
import { Entity } from "../../entities.model";
import { FiltersEntity, FilterCategoryEntity, TagEntity, SortEntity } from "../filter.model";

export interface SkillFiltersEntity extends FiltersEntity {
  categories?: FilterCategoryEntity[];
}

export interface SkillFilterCategoryEntity extends FilterCategoryEntity {
  tags: SkillTagEntity[];
}

export interface SkillTagEntity extends TagEntity {
    value:SkillProp;
}
