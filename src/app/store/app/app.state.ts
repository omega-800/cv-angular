import { Interest, Language } from "./app.model";
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetInterest, SetLoggedIn } from "./app.actions";

export interface AppStateModel {
    interest: Interest
    language: Language
    loggedIn: boolean
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        interest: Interest.IT,
        language: Language.DE,
        loggedIn: false
    }
})
@Injectable()
export class AppState {
    @Action(SetInterest)
    setInterest(ctx: StateContext<AppStateModel>, { interest }: SetInterest) {
        ctx.patchState({ interest: interest })
    }
    @Action(SetLoggedIn)
    setLoggedIn(ctx: StateContext<AppStateModel>, { loggedIn }: SetLoggedIn) {
        ctx.patchState({ loggedIn: loggedIn })
    }
    @Selector()
    static interest(state: AppStateModel) {
        return state.interest;
    }
    @Selector()
    static loggedIn(state: AppStateModel) {
        return state.loggedIn;
    }
}

