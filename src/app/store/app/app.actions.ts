import { Interest, Language } from "./app.model";

export class SetInterest {
    static readonly type = '[App] Set Interest';
    constructor(public interest: Interest) { }
}

export class SetLanguage {
    static readonly type = '[App] Set Language';
    constructor(public language: Language) { }
}