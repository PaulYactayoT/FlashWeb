import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessInfo } from './template.model';

@Injectable({
    providedIn: 'root'
})
export class BusinessDataService {
    private businessInfoSubject = new BehaviorSubject<BusinessInfo | null>(null);
    public businessInfo$: Observable<BusinessInfo | null> = this.businessInfoSubject.asObservable();

    constructor() { }

    setBusinessInfo(info: BusinessInfo): void {
        this.businessInfoSubject.next(info);
    }

    getBusinessInfo(): BusinessInfo | null {
        return this.businessInfoSubject.value;
    }

    clearBusinessInfo(): void {
        this.businessInfoSubject.next(null);
    }
}
