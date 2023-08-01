import { Selector } from "@ngxs/store";
import { FilterState, FilterStateModel } from "./filter.state";
import { FiltersEntity } from "src/app/services/filter/filter.model";

export class FilterSelectors {
    @Selector([FilterState])
    static filters(state: FilterStateModel): FiltersEntity[] {
        return state.filters;
    }
}