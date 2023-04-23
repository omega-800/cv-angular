import { Entity } from "../entities.model"

export interface FiltersEntity extends Entity {
  categories?: FilterCategoryEntity[];
}

export interface FilterCategoryEntity extends Entity {
  selected?: boolean;
  tags: TagEntity[];
}

export interface TagEntity extends Entity {
  value:string|boolean|number;
  selected: boolean;
}
