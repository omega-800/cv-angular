import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToggleFilter } from './filter.actions';
import { FiltersEntity } from './filter.model';
import { Injectable } from '@angular/core';

export interface FilterStateModel {
  name: string;
  filters: FiltersEntity[];
}

@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    name: 'Filters',
    filters: [
      {
        id: 'asdf',
        name: 'skills',
        categories: [
          {
            id: 'asdf',
            name: 'apps',
            tags:[
              {
                id: 'asdf',
                name: 'react',
                selected: true
              }
            ]
          },
        ],
      },
    ],
  },
})
@Injectable()
export class FilterState {
    
  @Action(ToggleFilter) 
  toggleFilter(ctx: StateContext<FilterStateModel>, action: ToggleFilter) {
    const state = ctx.getState();
    const { name, category } = action;
    
    ctx.setState({
      ...state,
      filters: {
        ...state.filters,
      },
    });
  }
  
  @Selector([FilterState])
  static filters(state: FilterStateModel):FiltersEntity[] {
      return state.filters;
  }
}
