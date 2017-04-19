import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class AuthService {
    constructor() { }

    createAuthHeaders() {
        var user = JSON.parse(localStorage.getItem('user'));
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(user.email + ':' + user.password));
        return headers;
    }

    login(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('user');
    }
}