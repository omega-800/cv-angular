import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ResetFilters, ToggleFilter } from './projectsfilter.actions';
import { Injectable } from '@angular/core';
import { FilterTypes, FiltersEntity } from 'src/app/services/filter/filter.model';


export interface ProjectsFilterStateModel {
  filters: FiltersEntity[];
}

@State<ProjectsFilterStateModel>({
  name: 'projectsfilter',
  defaults: {
    filters: [],
  },
})
@Injectable()
export class FilterState {

  @Action(ToggleFilter)
  toggleFilter(ctx: StateContext<ProjectsFilterStateModel>, { filter, category, tag, forceTag }: ToggleFilter) {
    const state = ctx.getState();

    /*let newFilters = state.filters.reduce((result: FiltersEntity[], filter) => {
      let newCategories = filter.categories.filter(cat => cat.id != category!.id);
      if (newCategories.length > 0) {
        result.push({ ...filter, categories: newCategories });
      }
      return result;
    }, []);*/

    let filterCopy = JSON.parse(JSON.stringify(filter));
    let categoryCopy = JSON.parse(JSON.stringify(category));
    let tagCopy = JSON.parse(JSON.stringify(tag));
    let newFilters = state.filters;

    let filterIndex: number = newFilters.findIndex(elem => (elem.id == filter.id));
    if (filterIndex >= 0) {
      let newFilter = newFilters[filterIndex];
      let catIndex: number = filter.categories.findIndex(elem => (elem.id == category.id));
      if (catIndex >= 0) {
        let newCategory = newFilter.categories[catIndex];
        let tagIndex = newCategory.tags.findIndex(elem => elem.id == tag.id);
        if (forceTag) {
          category.tags = [tagCopy];
        } else if (tagIndex >= 0) {
          if (newCategory.tags.length == 1) {
            newFilter.categories.splice(catIndex, 1);
            if (newFilter.categories.length < 1) {
              newFilters.splice(filterIndex, 1)
            }
          } else {
            newCategory.tags.splice(tagIndex, 1);
          }
        } else {
          newCategory.tags.push(tagCopy);
        }
      } else {
        categoryCopy.tags = [tagCopy];
        newFilter.categories.push(categoryCopy);
      }
    } else {
      categoryCopy.tags = [tagCopy];
      filterCopy.categories = [categoryCopy];
      newFilters.push(filterCopy)
    }

    ctx.patchState({ filters: newFilters });
  }

  @Action(ResetFilters)
  resetFilters(ctx: StateContext<ProjectsFilterStateModel>) {
    ctx.patchState({ filters: [] })
  }

  @Selector([FilterState])
  static filters(state: ProjectsFilterStateModel): FiltersEntity[] {
    return state.filters;
  }
}
