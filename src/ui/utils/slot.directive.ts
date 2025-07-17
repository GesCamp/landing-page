import { Directive, inject, InjectionToken, input, TemplateRef } from "@angular/core";

export const SLOT = new InjectionToken<SlotDirective>('SLOT');

@Directive({
    selector: 'ng-template[app-slot]',
    providers: [{provide: SLOT, useExisting: SlotDirective}]
})
export class SlotDirective{
    readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

    readonly $name = input.required<string>({alias: 'app-slot'})
}