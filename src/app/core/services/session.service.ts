import {Injectable} from '@angular/core';
import { TOKEN_STORAGE_KEY } from '../../shared/global.const';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor() {
    }

    public clearLocalStorage(): void {
        localStorage.clear();
    }

    public storeSession(key: string, params: any) {
      localStorage.setItem(key, JSON.stringify(params));
    }

    public getLocalStorage(key: string): any {
        // @ts-ignore
        return JSON.parse(localStorage.getItem(key));
    }

    public clearSession(key: string): any {
        localStorage.removeItem(key);
    }

    public getTokenSession(): string {
        const token = this.getLocalStorage(TOKEN_STORAGE_KEY);

        return token ?? "";
    }
}
