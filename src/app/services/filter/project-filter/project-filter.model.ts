import { FiltersEntity, FilterCategoryEntity } from "../filter.model";

export interface ProjectFiltersEntity extends FiltersEntity {
    withUrl?: FilterCategoryEntity,
    withGithub?: FilterCategoryEntity,
    client: FilterCategoryEntity,
    author: FilterCategoryEntity,
    careerplace: FilterCategoryEntity
}
