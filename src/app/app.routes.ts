import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ApiListComponent } from './api-list/api-list.component';

export const routes: Routes = [
    {
        path: ``,
        redirectTo: `apilist`,
        pathMatch: 'full'
    },
    {
        path: `apilist`, component: ApiListComponent
    },
    {
        path: `userlist`, component: UserListComponent
    },
    {
        path: `user-form`, component: UserFormComponent
    }
];
