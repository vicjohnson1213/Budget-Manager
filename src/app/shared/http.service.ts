import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }

    createAuthHeaders(headers: Headers): Headers {
        headers = headers || new Headers();

        var accessToken = localStorage.getItem('accessToken');
        headers.append('Authorization', 'Bearer ' + accessToken);
        return headers;
    }

    request(url: string|Request, options?: RequestOptionsArgs) {
        options = options || new RequestOptions();
        return this.http.request(url, options);
    }

    authRequest(url: string|Request, options?: RequestOptionsArgs) {
        options = options || new RequestOptions();
        options.headers = this.createAuthHeaders(options.headers);
        return this.http.request(url, options);
    }

    get(url: string|Request, options?: RequestOptionsArgs) {
        options = options || new RequestOptions();
        options.method = 'get';

        return this.authRequest(url, options);
    }

    post(url: string|Request, body: any, options?: RequestOptionsArgs) {
        options = options || new RequestOptions();
        options.method = 'post';
        options.body = body;

        return this.authRequest(url, options);
    }

    put(url: string|Request, body: any, options?: RequestOptionsArgs) {
        options = options || new RequestOptions();
        options.method = 'put';
        options.body = body;
        
        return this.authRequest(url, options);
    }

    delete(url: string|Request, options?: RequestOptionsArgs) {
        options = options || new RequestOptions();
        options.method = 'delete';
        
        return this.authRequest(url, options);
    }
}