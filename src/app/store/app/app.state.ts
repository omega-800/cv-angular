import { Interest, Language } from "./app.model";
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetInterest, SetLanguage, SetLoggedIn } from "./app.actions";

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
    @Action(SetLanguage)
    setLanguage(ctx: StateContext<AppStateModel>, { language }: SetLanguage) {
        ctx.patchState({ language: language })
    }
    @Selector()
    static interest(state: AppStateModel): Interest {
        return state.interest;
    }
    @Selector()
    static loggedIn(state: AppStateModel): boolean {
        return state.loggedIn;
    }
    @Selector()
    static language(state: AppStateModel): Language {
        return state.language;
    }
}

