import { Injectable } from '@angular/core';

function getWindow() : any {
    return window;
}

@Injectable()
export class WindowService {

    get window() : any {
        return getWindow();
    }
}