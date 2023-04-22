export interface Entity {
  id: string;
  name: string;
}

export interface FiltersEntity extends Entity {
  categories: FilterCategoryEntity[];
}

export interface FilterCategoryEntity extends Entity {
  id: string;
  name: string;
  selected?: boolean;
  tags: TagEntity[];
}

export interface TagEntity extends Entity {
  id: string;
  name: string;
  selected: boolean;
}