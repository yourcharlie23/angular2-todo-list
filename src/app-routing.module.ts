import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent }   from './projects.component';
import { FeaturesComponent }   from './features.component';
import { TodosComponent }      from './todos.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent  },
  { path: 'features/:projectid',  component: FeaturesComponent },
  { path: 'todos/:projectid/:featureid', component: TodosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}