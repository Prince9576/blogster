import { Injectable } from '@angular/core';

@Injectable()
export class DeviceInfoProvider {

    device_sm: number = 500;
    constructor() {}

    isMobileDevice() {
        return window.innerWidth <= this.device_sm;
    }
}