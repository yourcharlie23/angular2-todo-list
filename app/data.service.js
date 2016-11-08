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
// import { Projects } from './mock-dao';
var core_1 = require('@angular/core');
var DataService = (function () {
    function DataService() {
        this.projects_arr = [
            { id: 11, name: 'Mr. Nice',
                features: [{
                        id: 1, name: 'car',
                        todos: [{
                                id: 1, name: 'clean', flag: 0
                            },
                            {
                                id: 2, name: 'drive', flag: 1
                            },
                            {
                                id: 3, name: 'register', flag: 0
                            }
                        ]
                    },
                    {
                        id: 2, name: 'house',
                        todos: [{
                                id: 1, name: 'kitchen', flag: 0
                            },
                            {
                                id: 2, name: 'bed', flag: 1
                            },
                            {
                                id: 3, name: 'toilet', flag: 0
                            }
                        ]
                    }]
            },
            { id: 12, name: 'Narco',
                features: [{
                        id: 1, name: 'sell',
                        todos: [{
                                id: 4, name: 'price', flag: 1
                            },
                            {
                                id: 5, name: 'deliver', flag: 0
                            },
                            {
                                id: 6, name: 'save', flag: 0
                            }
                        ]
                    }]
            },
            { id: 13, name: 'Kombatso',
                features: [{
                        id: 1, name: 'car',
                        todos: [{
                                id: 1, name: 'clean', flag: 0
                            },
                            {
                                id: 2, name: 'drive', flag: 1
                            },
                            {
                                id: 3, name: 'register', flag: 0
                            }
                        ]
                    },
                    {
                        id: 2, name: 'house',
                        todos: [{
                                id: 1, name: 'kitchen', flag: 0
                            },
                            {
                                id: 2, name: 'bed', flag: 1
                            },
                            {
                                id: 3, name: 'toilet', flag: 0
                            }
                        ]
                    }]
            },
            { id: 14, name: 'Leleritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' }
        ];
    }
    DataService.prototype.getProjects = function (section, project_id, feature_id) {
        if (section === void 0) { section = null; }
        if (project_id === void 0) { project_id = null; }
        if (feature_id === void 0) { feature_id = null; }
        // this.projects = this.projects_arr;
        this.projects = this.getFromLocalStorage();
        if (!this.projects)
            return [];
        var found;
        if (!section || section == 'project') {
            return this.projects;
        }
        else if (section == 'feature' && project_id) {
            found = _.find(this.projects, function (project) {
                return project.id == project_id;
            });
            if (found)
                return found.features;
        }
        else if (section == 'todo' && feature_id) {
            var found_1;
            _.find(this.projects, function (project) {
                if (project.id == project_id) {
                    found_1 = _.find(project.features, function (feature) {
                        return feature.id == feature_id;
                    });
                    return true;
                }
                return false;
            });
            if (found_1 && found_1.todos)
                return found_1.todos;
        }
        return [];
    };
    DataService.prototype.delete = function (section, project_id, feature_id, todo_id) {
        if (section === void 0) { section = null; }
        if (project_id === void 0) { project_id = null; }
        if (feature_id === void 0) { feature_id = null; }
        if (todo_id === void 0) { todo_id = null; }
        var projects = this.projects;
        if (section == 'project' && project_id) {
            projects = _.reject(projects, function (rproject) {
                return rproject.id == project_id;
            });
        }
        else {
            _.each(projects, function (project) {
                if (project_id && project.id == project_id) {
                    if (feature_id && section == 'feature') {
                        project.features = _.reject(project.features, function (rfeature) {
                            return rfeature.id == feature_id;
                        });
                        return;
                    }
                    else if (feature_id && todo_id && section == 'todo') {
                        var features = project.features;
                        _.each(features, function (feature) {
                            if (feature.id == feature.id) {
                                feature.todos = _.reject(feature.todos, function (rtodo) {
                                    return rtodo.id == todo_id;
                                });
                            }
                        });
                        project.features = features;
                        return;
                    }
                }
            });
        }
        this.projects = projects;
        this.saveToLocalStorage(this.projects);
        return this.projects;
    };
    DataService.prototype.add = function (section, item, project_id, feature_id) {
        if (section === void 0) { section = null; }
        if (item === void 0) { item = null; }
        if (project_id === void 0) { project_id = null; }
        if (feature_id === void 0) { feature_id = null; }
        var projects = this.projects;
        if (section == 'project') {
            if (!projects)
                projects = [];
            projects.push(item);
        }
        else {
            _.find(projects, function (project) {
                if (project_id && project.id == project_id) {
                    if (section == 'feature') {
                        if (!project.features)
                            project.features = [];
                        project.features.push(item);
                        return true;
                    }
                    else if (feature_id && section == 'todo') {
                        var features = project.features;
                        _.find(features, function (feature) {
                            if (feature.id == feature_id) {
                                if (!feature.todos)
                                    feature.todos = [];
                                feature.todos.push(item);
                                return true;
                            }
                            return false;
                        });
                        project.features = features;
                    }
                    return true;
                }
                return false;
            });
        }
        this.projects = projects;
        this.saveToLocalStorage(this.projects);
        return this.projects;
    };
    DataService.prototype.tempEmptyProjects = function () {
        this.projects = [];
        return this.projects;
    };
    DataService.prototype.saveToLocalStorage = function (data) {
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            try {
                localStorage.setItem("projects", JSON.stringify(data));
            }
            catch (e) {
                console.log("can not save", e);
            }
        }
        else {
            // Sorry! No Web Storage support..
            console.log("no storage");
        }
    };
    DataService.prototype.getFromLocalStorage = function () {
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            try {
                var store_projects = localStorage.getItem("projects");
                if (store_projects)
                    return JSON.parse(store_projects);
                else
                    return [];
            }
            catch (e) {
                console.log("can not save", e);
            }
        }
        else {
            // Sorry! No Web Storage support..
            console.log("no storage");
        }
        return [];
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
