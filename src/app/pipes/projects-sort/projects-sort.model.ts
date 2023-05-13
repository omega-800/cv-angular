import { SortEntity } from "src/app/services/filter/filter.model";

export interface ProjectSortEntity extends SortEntity {
    value:ProjectProp;
}

export type ProjectProp = "date" | "career" | "client" | "authors" | "name";

export const projectProps:ProjectSortEntity[] = [
    {id:"projectsortentity_date",name:"Datum",value:"date"},
    {id:"projectsortentity_career",name:"Karriere",value:"career"},
    {id:"projectsortentity_client",name:"Klient",value:"client"},
    {id:"projectsortentity_authors",name:"Author",value:"authors"},
    {id:"projectsortentity_name",name:"Name",value:"name"}
];

export function isOfTypeProjectProp (prop: string): prop is ProjectProp {
  return ["date", "career", "client", "authors", "name"].includes(prop);
}