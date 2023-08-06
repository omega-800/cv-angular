import { SortEntity } from "src/app/services/filter/filter.model";
import { Interest } from "src/app/store/app/app.model";

export const skillSortValues = {
  knowledge: "knowledgepercent",
  category: "skillcategories",
  subcategory: "skillsubcategories",
  type: "type",
  name: "name",
  relevance_it: Interest.IT,
  relevance_art: Interest.ART,
  relevance_health: Interest.HEALTH,
  relevance_education: Interest.EDUCATION
} as const;

export const skillSortProps: SortEntity[] = [
  { id: "skillsortentity_relevance_it", name: "Relevanz", value: skillSortValues.relevance_it },
  { id: "skillsortentity_relevance_art", name: "Relevanz", value: skillSortValues.relevance_art },
  { id: "skillsortentity_relevance_health", name: "Relevanz", value: skillSortValues.relevance_health },
  { id: "skillsortentity_relevance_education", name: "Relevanz", value: skillSortValues.relevance_education },
  { id: "skillsortentity_knowledgepercent", name: "Prozent", value: skillSortValues.knowledge },
  { id: "skillsortentity_category", name: "Kategorie", value: skillSortValues.category },
  { id: "skillsortentity_subcategory", name: "Sub-Kategorie", value: skillSortValues.subcategory },
  { id: "skillsortentity_type", name: "Typ", value: skillSortValues.type },
  { id: "skillsortentity_name", name: "Name", value: skillSortValues.name }/*,
    "applicationType"*/
];
