import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, firstValueFrom, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { Language } from 'src/app/store/app/app.model';

export interface Result {
    [key: string]: [[string]]
}

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false
})
export class TranslatePipe implements PipeTransform {
    destLang: Language = Language.DE;
    sourceLang: Language = Language.DE;
    constructor(private http: HttpClient, private store: Store) {
    }
    async transform(value: string, ...args: unknown[]): Promise<string> {
        /*this.store.select(state => state.app.language).pipe(distinctUntilChanged()).subscribe(res => this.destLang = res);

        console.log(this.destLang)
        if (this.destLang != this.sourceLang) {
            try {
                console.log(this.destLang)
                return firstValueFrom(this.http.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.sourceLang}&tl=${this.destLang}&dt=t&q=${encodeURI(value)}`).pipe(map(res => (res as Result)[0][0][0])))
            } catch (error) {
                console.error(error);
            }
        }*/
        return value;

    }
}
