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
  selector: 'project-feature',
  templateUrl: 'views/features.component.html'
})


export class FeaturesComponent implements OnInit {
  projects : any;
  editedFeature;

  features = [];
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
    this.editedFeature = {};
    let projectid;
    this.route.params.forEach((params: Params) => {
      projectid = +params['projectid'];
    });

    this.projects = this.dataService.getProjects();

    this.currentProject = _.find(this.projects, function(project: any){return project && projectid == project.id});
    if(this.currentProject && this.currentProject.features){
      this.features = this.currentProject.features;
    }

    //Checks if a touch screen
    this.is_touch_screen = (('ontouchstart' in window)
      || (navigator.maxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));

  }


  editFeature(feature, event): void {
    event.stopPropagation();
    this.editedFeature = Object.assign({}, feature);
  }

  saveFeature(event): void {
    event.stopPropagation();
    let editedFeature = this.editedFeature;
    _.find(this.currentProject.features, function(feature:any){
      if(editedFeature.id == feature.id){
        feature.name = editedFeature.name;
        return true;
      }
      return false;
    });
    this.features = this.currentProject.features;

    this.editedFeature = {};
    this.dataService.saveToLocalStorage(this.projects);
  }

  removeFeature(rfeature, event): void {
    event.stopPropagation();
    this.features = _.reject(this.features, function(feature:any){
      return feature.id == rfeature.id;
    });
    this.projects = this.dataService.delete('feature', this.currentProject.id, rfeature.id);
  }

  openTodos(feature): void {
    let link = ['/todos', this.currentProject.id, feature.id];
    this.router.navigate(link);
  }

  addFeature(): void{
    if(!this.add_field) return;
    var milliseconds = new Date().getTime();
    let item = {id: milliseconds, name: this.add_field};
    // this.features.push(item);
    this.add_field = "";
    this.showAddForm = false;

    this.projects = this.dataService.add('feature', item, this.currentProject.id);
    this.features = this.dataService.getProjects('feature', this.currentProject.id);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  sortBy(sortby: string): void{
    this.sortStr = sortby;
  }
}
