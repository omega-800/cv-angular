import { SortEntity } from "src/app/services/filter/filter.model";

export interface SkillSortEntity extends SortEntity {
    value:SkillProp;
}

export type SkillProp = "knowledgepercent" | "skillcategories" | "skillsubcategories" | "type" | "name" /*| "applicationtype"*/;

export const skillProps:SkillSortEntity[] = [
    {id:"skillsortentity_knowledgepercent",name:"Prozent",value:"knowledgepercent"},
    {id:"skillsortentity_category",name:"Kategorie",value:"skillcategories"},
    {id:"skillsortentity_subcategory",name:"Sub-Kategorie",value:"skillsubcategories"},
    {id:"skillsortentity_type",name:"Typ",value:"type"},
    {id:"skillsortentity_name",name:"Name",value:"name"}/*,
    "applicationType"*/
 ];

export function isOfTypeSkillProp (prop: string): prop is SkillProp {
  return ['knowledgepercent', 'skillcategories', 'skillsubcategories', 'type', 'name'].includes(prop);
}