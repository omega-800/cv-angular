import {
    Directive,
    EmbeddedViewRef,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

@Directive({
    selector: '[ngVar]',
    standalone: true
})
export class NgVar<T = unknown> {
    private _context: NgVarContext<T> = new NgVarContext<T>();
    private _viewRef: EmbeddedViewRef<NgVarContext<T>> | null = null;

    @Input()
    set ngVar(context: T) {
        this._context.$implicit = this._context.ngVar = context;

        if (!this._viewRef) {
            this._viewRef = this._viewContainer.createEmbeddedView(
                this._templateRef,
                this._context
            );
        }
    }

    static ngTemplateGuard_ngVar: 'binding';

    static ngTemplateContextGuard<T>(
        dir: NgVar<T>,
        ctx: any
    ): ctx is NgVarContext<T> {
        return true;
    }

    constructor(
        private _viewContainer: ViewContainerRef,
        private _templateRef: TemplateRef<NgVarContext<T>>
    ) { }
}

export class NgVarContext<T = unknown> {
    public $implicit: T = null!;
    public ngVar: T = null!;
}