import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
        {
          path:'',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: UserListPageComponent
        },
        {
          path: 'detail',
          component: UserDetailPageComponent
        },
        {
          path: 'add-user',
          component: AddUserPageComponent
      },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
