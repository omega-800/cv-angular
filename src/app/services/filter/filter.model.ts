import { Entity } from "../entities.model"

export interface SelectedFilterEntity extends Entity {
  category: string;
  value: TagType;
}

export interface FiltersEntity extends Entity {
  categories: FilterCategoryEntity[];
}

export interface FilterCategoryEntity extends Entity {
  selected?: boolean;
  tags: TagEntity[];
}

export interface TagEntity extends Entity {
  value: TagType;
  selected: boolean;
}

export interface SortEntity extends Entity {
  value: string;
}

export interface FullSortEntity extends Entity {
  value: SortEntity;
  ascending: boolean;
}

export type TagType = string | boolean | number;