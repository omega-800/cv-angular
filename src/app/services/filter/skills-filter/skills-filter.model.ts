import { FiltersEntity, FilterCategoryEntity } from "../filter.model";

export interface SkillFiltersEntity extends FiltersEntity {
    category: FilterCategoryEntity,
    subcategory: FilterCategoryEntity,
    type: FilterCategoryEntity,
    hobby: FilterCategoryEntity,
    applicationtype?: FilterCategoryEntity
}