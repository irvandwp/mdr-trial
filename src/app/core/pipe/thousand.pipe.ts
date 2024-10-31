import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'thousand'
})
export class ThousandPipe implements PipeTransform {
    public transform(value: number, isCurrency = false): string {
        if (value) {
            var parts = value.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

            return isCurrency ? `Rp${parts.join(',')}` : parts.join(",");
        }
        return isCurrency ? 'Rp0' : '0';
    }
}
