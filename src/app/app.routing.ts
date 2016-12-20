import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/index';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
