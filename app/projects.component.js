"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var _ = require('underscore');
var data_service_1 = require("./data.service");
var ProjectsComponent = (function () {
    function ProjectsComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.sortStr = 'name';
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.editedProject = {};
        //Checks if a touch screen
        this.is_touch_screen = (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
        this.projects = this.dataService.getProjects();
    };
    ProjectsComponent.prototype.editProject = function (project, event) {
        event.stopPropagation();
        this.editedProject = Object.assign({}, project);
    };
    ProjectsComponent.prototype.saveProject = function (event) {
        event.stopPropagation();
        var editedProject = this.editedProject;
        _.find(this.projects, function (project) {
            if (project.id == editedProject.id) {
                project.name = editedProject.name;
                return true;
            }
            return false;
        });
        this.editedProject = {};
        this.dataService.saveToLocalStorage(this.projects);
    };
    ProjectsComponent.prototype.removeProject = function (rproject, event) {
        event.stopPropagation();
        this.projects = this.dataService.delete('project', rproject.id);
    };
    ProjectsComponent.prototype.addProject = function () {
        if (!this.add_field)
            return;
        var milliseconds = new Date().getTime();
        var item = { id: milliseconds, name: this.add_field };
        // this.projects.push({id: milliseconds, name: this.add_field});
        this.add_field = "";
        this.showAddForm = false;
        this.projects = this.dataService.add('project', item);
    };
    ProjectsComponent.prototype.openFeatures = function (project) {
        this.router.navigate(['/features', project.id]);
    };
    ProjectsComponent.prototype.sortBy = function (sortby) {
        this.sortStr = sortby;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProjectsComponent.prototype, "term", void 0);
    ProjectsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-projects',
            // providers: [DataService],
            templateUrl: 'views/projects.component.html',
            styleUrls: ['styles/projects.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService])
    ], ProjectsComponent);
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;
