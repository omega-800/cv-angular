import { Selector } from "@ngxs/store";
import { FilterState, FilterStateModel } from "./filter.state";
import { Filters } from "./filter.model";

export class FilterSelectors {
    @Selector([FilterState])
    static filters(state: FilterStateModel):Filters[] {
        return state.filters;
    }
}