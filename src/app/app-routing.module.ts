import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTaskComponent } from './component/user-task/user-task.component';

const routes: Routes = [
  {
    path:"", component:UserTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
