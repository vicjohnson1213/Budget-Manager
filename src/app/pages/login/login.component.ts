
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    user: User = new User();
    returnURL: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService) {}

    login() {
        this.authService.login(this.user);
        this.router.navigate([this.returnURL])
    }

    ngOnInit() {
        this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}