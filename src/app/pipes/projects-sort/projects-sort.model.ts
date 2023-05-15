import { SortEntity } from "src/app/services/filter/filter.model";

export const projectSortValues = {
  date: "date",
  career: "career",
  client: "client",
  author: "authors",
  name: "name"
} as const;

export const projectSortProps: SortEntity[] = [
  { id: "projectsortentity_date", name: "Datum", value: projectSortValues.date },
  { id: "projectsortentity_career", name: "Karriere", value: projectSortValues.career },
  { id: "projectsortentity_client", name: "Klient", value: projectSortValues.client },
  { id: "projectsortentity_authors", name: "Author", value: projectSortValues.author },
  { id: "projectsortentity_name", name: "Name", value: projectSortValues.name }
];
