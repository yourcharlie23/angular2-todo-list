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
var router_2 = require('@angular/router');
var _ = require('underscore');
var data_service_1 = require("./data.service");
var TodosComponent = (function () {
    function TodosComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.todos = [];
        this.sortStr = 'name';
    }
    TodosComponent.prototype.ngOnInit = function () {
        this.editedTodo = {};
        var projectid;
        var featureid;
        this.route.params.forEach(function (params) {
            projectid = +params['projectid'];
            featureid = +params['featureid'];
        });
        this.projects = this.dataService.getProjects();
        this.currentProject = _.find(this.projects, function (project) { return project && projectid == project.id; });
        if (this.currentProject && this.currentProject.features) {
            this.currentFeature = _.find(this.currentProject.features, function (feature) { return feature && featureid == feature.id; });
            if (this.currentFeature && this.currentFeature.todos) {
                this.todos = this.currentFeature.todos;
            }
        }
        //Checks if a touch screen
        this.is_touch_screen = (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    };
    TodosComponent.prototype.editTodo = function (todo, event) {
        event.stopPropagation();
        this.editedTodo = Object.assign({}, todo);
    };
    TodosComponent.prototype.saveTodo = function (event) {
        event.stopPropagation();
        var editedTodo = this.editedTodo;
        _.find(this.currentFeature.todos, function (todo) {
            if (todo.id == editedTodo.id) {
                todo.name = editedTodo.name;
                return true;
            }
            return false;
        });
        this.todos = this.currentFeature.todos;
        this.editedTodo = {};
        this.dataService.saveToLocalStorage(this.projects);
    };
    TodosComponent.prototype.removeTodo = function (rtodo, event) {
        event.stopPropagation();
        this.todos = _.reject(this.todos, function (todo) {
            return todo.id == rtodo.id;
        });
        this.projects = this.dataService.delete('todo', this.currentProject.id, this.currentFeature.id, rtodo.id);
    };
    TodosComponent.prototype.toggleComplete = function (todo) {
        todo.flag = todo.flag ? 0 : 1;
    };
    TodosComponent.prototype.addTodo = function (name) {
        if (!this.add_field)
            return;
        var milliseconds = new Date().getTime();
        var item = { id: milliseconds, name: this.add_field, flag: 0 };
        // this.todos.push(item);
        this.add_field = "";
        this.showAddForm = false;
        this.projects = this.dataService.add('todo', item, this.currentProject.id, this.currentFeature.id);
        this.todos = this.dataService.getProjects('todo', this.currentProject.id, this.currentFeature.id);
    };
    TodosComponent.prototype.goBack = function () {
        this.router.navigate(['/']);
    };
    TodosComponent.prototype.sortBy = function (sortby) {
        this.sortStr = sortby;
    };
    TodosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-todo',
            templateUrl: 'views/todos.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_2.ActivatedRoute, data_service_1.DataService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
