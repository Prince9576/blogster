import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: string, alphabetCount: number, startIndex?: number): string {
        if ( value.length < alphabetCount ) return value;
        if ( startIndex ) {
            return value.substring(startIndex, alphabetCount) + "....." ;
        } else {
            return value.substring(0, alphabetCount) + "....." ;
        }
    }
}