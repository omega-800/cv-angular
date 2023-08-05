import { FilterCategoryEntity, FiltersEntity, TagEntity } from "src/app/services/filter/filter.model";

export class ToggleFilter {
  static readonly type = '[ProjectsFilter] Toggle Filter';
  constructor(public filter: FiltersEntity, public category: FilterCategoryEntity, public tag: TagEntity, public forceTag: boolean = false) { }
}

export class ResetFilters {
  static readonly type = '[ProjectsFilter] Reset Filters';
  constructor() { }
}
