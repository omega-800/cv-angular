import { ImageComp } from "src/app/components/components.model";
import { Entity } from "../entities.model"

export enum FilterTypes {
  PROJECT = 'filter_project',
  SKILL = 'filter_skill'
}

export interface FiltersEntity extends Entity {
  type: FilterTypes;
  categories: FilterCategoryEntity[];
}

export interface FilterCategoryEntity extends Entity {
  selected?: boolean;
  isRange: boolean;
  step?: FilterType;
  tags: TagEntity[];
}

export interface TagEntity extends Entity {
  value: FilterType;
  selected: boolean;
  image?: ImageComp;
}

export interface SortEntity extends Entity {
  value: string;
}

export interface FullSortEntity extends Entity {
  value: SortEntity;
  ascending: boolean;
}

export type FilterType = string | boolean | number | Date;