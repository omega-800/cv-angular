import { State, Action, StateContext } from '@ngxs/store';
import { ToggleFilter } from './filter.actions';
import { FilterItem, Filters } from './filter.model';
import { Injectable } from '@angular/core';

export interface FilterStateModel {
  name: string;
  filters: Filters[];
}

@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    name: 'Filters',
    filters: [
      {
        id: 'asdf',
        name: 'skills',
        items: [
          {
            id: 'asdf',
            name: 'react',
            selected: true,
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
}
