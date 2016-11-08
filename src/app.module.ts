import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { ProjectsComponent }         from './projects.component';
import { FeaturesComponent }    from './features.component';
import { TodosComponent }      from './todos.component';
import { DataService }          from './data.service';

import { AppRoutingModule }     from './app-routing.module';
import { OrderBy } from "./orderby.pipe";
import { SearchPipe } from "./search.pipe";
import { SearchBox } from "./search.box";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProjectsComponent,
    FeaturesComponent,
    TodosComponent,
    OrderBy,
    SearchPipe,
    SearchBox

  ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
