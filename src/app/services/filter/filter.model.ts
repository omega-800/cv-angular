import { Entity } from "../entities.model"

export interface SelectedFilterEntity extends Entity {
  category: string;
  value: FilterType[];
}

export interface FiltersEntity extends Entity {
  categories: FilterCategoryEntity[];
  ranges?: FilterRangeEntity[];
}

export interface FilterRangeEntity extends Entity {
  values: RangeType[];
  step: RangeType;
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

export type FilterType = string | boolean | number | Date;
export type TagType = string | boolean | number;
export type RangeType = Date | number;