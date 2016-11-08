import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from './mock-dao';
import * as _ from 'underscore';
import { Project } from './dao';
import { OrderBy } from "./orderby.pipe";
import { SearchBox } from "./search.box";
import { DataService } from "./data.service";

@Component({
  moduleId: module.id,
  selector: 'my-projects',
  // providers: [DataService],
  templateUrl: 'views/projects.component.html',
  styleUrls: ['styles/projects.component.css']
})
export class ProjectsComponent implements OnInit  {
  @Input() term;

  projects : any;
  editedProject: any;
  showAddForm: boolean;
  add_field: string;
  add_field_focus: boolean;
  is_touch_screen: boolean;
  sortStr: string = 'name';

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.editedProject = {};

    //Checks if a touch screen
    this.is_touch_screen = (('ontouchstart' in window)
      || (navigator.maxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));

    this.projects = this.dataService.getProjects();
  }

  editProject(project, event): void {
    event.stopPropagation();
    this.editedProject = Object.assign({}, project);
  }

  saveProject(event): void {
    event.stopPropagation();
    let editedProject = this.editedProject;
    _.find(this.projects, function(project: any){
      if(project.id == editedProject.id){
        project.name = editedProject.name;
        return true;
      }
      return false;
    })
    this.editedProject = {};
    this.dataService.saveToLocalStorage(this.projects);
  }

  removeProject(rproject, event): void {
    event.stopPropagation();
    this.projects = this.dataService.delete('project', rproject.id);
  }

  addProject(): void{
    if(!this.add_field) return;
    var milliseconds = new Date().getTime();
    let item = {id: milliseconds, name: this.add_field};
    // this.projects.push({id: milliseconds, name: this.add_field});
    this.add_field = "";
    this.showAddForm = false;

    this.projects = this.dataService.add('project', item);
  }

  openFeatures(project): void {
    this.router.navigate(['/features', project.id]);
  }

  sortBy(sortby: string): void{
    this.sortStr = sortby;
  }
}
