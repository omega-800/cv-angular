import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToggleFilter } from './filter.actions';
import { Injectable } from '@angular/core';
import { FilterTypes, FiltersEntity } from 'src/app/services/filter/filter.model';


export interface FilterStateModel {
  filters: FiltersEntity[];
}

@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    filters: [
      {
        id: 'asdf',
        name: 'skills',
        type:FilterTypes.SKILL,
        categories: [
          {
            id: 'asdf',
            name: 'apps',
            tags:[
              {
                id: 'asdf',
                name: 'react',
                selected: true,
                value:"id"
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
