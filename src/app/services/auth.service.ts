import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { HttpService } from '../shared/http.service';

import { Tokens } from '../models/tokens';
import { User } from '../models/user';

@Injectable()
export class AuthService {
    private url = '/api/v1/auth';

    constructor(private httpService: HttpService) { }

    login(user: User): Promise<void> {
        var newUrl = this.url + '/login';

        return this.httpService.request(newUrl, {
            method: 'post',
            body: user
        }).toPromise().then(res => {
            var tokens = res.json() as Tokens;
            localStorage.setItem('accessToken', tokens.accessToken);
        });
    }

    logout(): Promise<void> {
        var newUrl = this.url + '/logout';
        
        return this.httpService.post(newUrl, {
            accessToken: localStorage.getItem('accessToken')
        })
            .toPromise()
            .then(() => {
                localStorage.removeItem('accessToken');
            });
    }
}