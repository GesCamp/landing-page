import { Pipe, PipeTransform, TemplateRef } from "@angular/core";
import { SlotDirective } from "./slot.directive";

@Pipe({name: 'asRecord'})
export class SlotAsRecordPipe implements PipeTransform{
    transform(slot: readonly SlotDirective[]):Record<string, TemplateRef<unknown> | undefined> {
        return Object.fromEntries(
            slot.map((slot) => [slot.$name(), slot.templateRef]),
        )
    }
}