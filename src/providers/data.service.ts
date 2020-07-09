import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable() 
export class DataService {
    public message = new Subject<{ data: any, state: string }>();
}