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

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService) {}

    login() {
        this.authService.login(this.user)
            .then(() => {
                var returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
            });
    }
}