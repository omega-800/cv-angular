import { SortEntity } from "src/app/services/filter/filter.model";
import { Interest } from "src/app/store/app/app.model";

export const projectSortValues = {
  date: "date",
  career: "career",
  client: "client",
  author: "authors",
  name: "name",
  relevance_it: Interest.IT,
  relevance_art: Interest.ART,
  relevance_health: Interest.HEALTH,
  relevance_education: Interest.EDUCATION
} as const;

export const projectSortProps: SortEntity[] = [
  { id: "projectsortentity_relevance_it", name: "Relevanz", value: projectSortValues.relevance_it },
  { id: "projectsortentity_relevance_art", name: "Relevanz", value: projectSortValues.relevance_art },
  { id: "projectsortentity_relevance_health", name: "Relevanz", value: projectSortValues.relevance_health },
  { id: "projectsortentity_relevance_education", name: "Relevanz", value: projectSortValues.relevance_education },
  { id: "projectsortentity_date", name: "Datum", value: projectSortValues.date },
  { id: "projectsortentity_career", name: "Karriere", value: projectSortValues.career },
  { id: "projectsortentity_client", name: "Klient", value: projectSortValues.client },
  { id: "projectsortentity_authors", name: "Author", value: projectSortValues.author },
  { id: "projectsortentity_name", name: "Name", value: projectSortValues.name }
];
