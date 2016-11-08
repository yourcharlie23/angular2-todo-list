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
var FeaturesComponent = (function () {
    function FeaturesComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.features = [];
        this.sortStr = 'name';
    }
    FeaturesComponent.prototype.ngOnInit = function () {
        this.editedFeature = {};
        var projectid;
        this.route.params.forEach(function (params) {
            projectid = +params['projectid'];
        });
        this.projects = this.dataService.getProjects();
        this.currentProject = _.find(this.projects, function (project) { return project && projectid == project.id; });
        if (this.currentProject && this.currentProject.features) {
            this.features = this.currentProject.features;
        }
        //Checks if a touch screen
        this.is_touch_screen = (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    };
    FeaturesComponent.prototype.editFeature = function (feature, event) {
        event.stopPropagation();
        this.editedFeature = Object.assign({}, feature);
    };
    FeaturesComponent.prototype.saveFeature = function (event) {
        event.stopPropagation();
        var editedFeature = this.editedFeature;
        _.find(this.currentProject.features, function (feature) {
            if (editedFeature.id == feature.id) {
                feature.name = editedFeature.name;
                return true;
            }
            return false;
        });
        this.features = this.currentProject.features;
        this.editedFeature = {};
        this.dataService.saveToLocalStorage(this.projects);
    };
    FeaturesComponent.prototype.removeFeature = function (rfeature, event) {
        event.stopPropagation();
        this.features = _.reject(this.features, function (feature) {
            return feature.id == rfeature.id;
        });
        this.projects = this.dataService.delete('feature', this.currentProject.id, rfeature.id);
    };
    FeaturesComponent.prototype.openTodos = function (feature) {
        var link = ['/todos', this.currentProject.id, feature.id];
        this.router.navigate(link);
    };
    FeaturesComponent.prototype.addFeature = function () {
        if (!this.add_field)
            return;
        var milliseconds = new Date().getTime();
        var item = { id: milliseconds, name: this.add_field };
        // this.features.push(item);
        this.add_field = "";
        this.showAddForm = false;
        this.projects = this.dataService.add('feature', item, this.currentProject.id);
        this.features = this.dataService.getProjects('feature', this.currentProject.id);
    };
    FeaturesComponent.prototype.goBack = function () {
        this.router.navigate(['/']);
    };
    FeaturesComponent.prototype.sortBy = function (sortby) {
        this.sortStr = sortby;
    };
    FeaturesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-feature',
            templateUrl: 'views/features.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_2.ActivatedRoute, data_service_1.DataService])
    ], FeaturesComponent);
    return FeaturesComponent;
}());
exports.FeaturesComponent = FeaturesComponent;
