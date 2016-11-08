import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Projects } from './mock-dao';
import * as _ from 'underscore';
import { Project } from './dao';
import { SearchBox } from "./search.box";
import { DataService } from "./data.service";

@Component({
  moduleId: module.id,
  selector: 'project-todo',
  templateUrl: 'views/todos.component.html'
})


export class TodosComponent implements OnInit {
  projects : any;
  editedTodo;

  todos = [];
  currentFeature;
  currentProject;
  
  showAddForm: boolean;
  add_field: string;
  add_field_focus: boolean;
  is_touch_screen: boolean;
  sortStr: string = 'name';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit(): void {
    this.editedTodo = {};
    let projectid;
    let featureid;
    this.route.params.forEach((params: Params) => {
      projectid = +params['projectid'];
      featureid = +params['featureid'];
    });

    this.projects = this.dataService.getProjects();
    this.currentProject = _.find(this.projects, function(project: any){return project && projectid == project.id});
    if(this.currentProject && this.currentProject.features){
      this.currentFeature = _.find(this.currentProject.features, function(feature: any){return feature && featureid == feature.id});
      if(this.currentFeature && this.currentFeature.todos){
        this.todos = this.currentFeature.todos;
      }
    }

    //Checks if a touch screen
    this.is_touch_screen = (('ontouchstart' in window)
      || (navigator.maxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
  }

  editTodo(todo, event): void {
    event.stopPropagation();
    this.editedTodo = Object.assign({}, todo);
  }

  saveTodo(event): void {
    event.stopPropagation();
    let editedTodo = this.editedTodo;
    _.find(this.currentFeature.todos, function(todo:any){
      if(todo.id == editedTodo.id){
        todo.name = editedTodo.name;
        return true;
      }
      return false;
    });
    this.todos = this.currentFeature.todos;

    this.editedTodo = {};
    this.dataService.saveToLocalStorage(this.projects);
  }

  removeTodo(rtodo, event): void {
    event.stopPropagation();
    this.todos = _.reject(this.todos, function(todo:any){
      return todo.id == rtodo.id;
    });
    this.projects = this.dataService.delete('todo', this.currentProject.id, this.currentFeature.id, rtodo.id);
  }

  toggleComplete(todo): void {
    todo.flag = todo.flag ? 0 : 1;
  }

  addTodo(name): void{
    if(!this.add_field) return;
    var milliseconds = new Date().getTime();
    let item = {id: milliseconds, name: this.add_field, flag: 0};
    // this.todos.push(item);
    this.add_field = "";
    this.showAddForm = false;

    this.projects = this.dataService.add('todo', item, this.currentProject.id, this.currentFeature.id);
    this.todos = this.dataService.getProjects('todo', this.currentProject.id, this.currentFeature.id);

  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  sortBy(sortby: string): void{
    this.sortStr = sortby;
  }
}
