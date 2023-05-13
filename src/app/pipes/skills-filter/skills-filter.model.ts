import { SelectedFilterEntity, TagType } from "src/app/services/filter/filter.model";

export interface SelectedSkillFilterEntity extends SelectedFilterEntity { 
  category:SkillFilterProp;
  value:TagType;
}

export type SkillFilterProp = "knowledgepercent" | "skillcategories" | "skillsubcategories" | "type" | "hobby" | "applicationtype";