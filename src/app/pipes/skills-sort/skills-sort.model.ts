import { SortEntity } from "src/app/services/filter/filter.model";

export const skillSortValues = {
  knowledge: "knowledgepercent",
  category: "skillcategories",
  subcategory: "skillsubcategories",
  type: "type",
  name: "name"
} as const;

export const skillSortProps: SortEntity[] = [
  { id: "skillsortentity_knowledgepercent", name: "Prozent", value: skillSortValues.knowledge },
  { id: "skillsortentity_category", name: "Kategorie", value: skillSortValues.category },
  { id: "skillsortentity_subcategory", name: "Sub-Kategorie", value: skillSortValues.subcategory },
  { id: "skillsortentity_type", name: "Typ", value: skillSortValues.type },
  { id: "skillsortentity_name", name: "Name", value: skillSortValues.name }/*,
    "applicationType"*/
];
