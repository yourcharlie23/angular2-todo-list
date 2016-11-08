// import { Projects } from './mock-dao';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  //temp db, just dump it

  // let db;
  // openDB(): void{
  //   db = openDatabase('projectdb', '1.0', 'project database', 2 * 1024 * 1024);
  // }
  // createDB(): void {
  //   db.transaction(function (tx) {
  //     tx.executeSql('CREATE TABLE project (id unique, text)');
  //     tx.executeSql('INSERT INTO project (id, text) VALUES (?, ?)', [1, Projects]);
  //   });
  // }
  // queryDB(): string {
  //   db.transaction(function (tx) {
  //     tx.executeSql('SELECT * FROM project', [], function (tx, results) {
  //       var len = results.rows.length, i;
  //       for (i = 0; i < len; i++) {
  //         console(results.rows.item(i).text);
  //       }
  //       return results.rows;
  //     });
  //   });
  // }

  // if(!db){
  //   openDB();
  // }

  projects: any;
  projects_arr: any = [
	  {id: 11, name: 'Mr. Nice',
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
	  {id: 12, name: 'Narco',
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
	  {id: 13, name: 'Kombatso',
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
	  {id: 14, name: 'Leleritas'},
	  {id: 15, name: 'Magneta'},
	  {id: 16, name: 'RubberMan'}
	];



  getProjects(section=null, project_id=null, feature_id=null): any {
  	// this.projects = this.projects_arr;
  	this.projects = this.getFromLocalStorage();
  	if(!this.projects)
  		return [];
  	let found;
  	if(!section || section == 'project'){
    	return this.projects;
  	}
    else if(section == 'feature' && project_id){
    	found = _.find(this.projects, function(project:any){
    		return project.id == project_id;
    	})
    	if(found)
    		return found.features;
    }
    else if(section == 'todo' && feature_id){
    	let found;
    	_.find(this.projects, function(project:any){
    		if(project.id == project_id){
    			found = _.find(project.features, function(feature:any){
    				return feature.id == feature_id;
    			})
    			return true;
    		}
    		return false;
    	})
    	if(found && found.todos)
    		return found.todos;
    }
	
    return [];
  }


delete(section=null, project_id=null, feature_id=null, todo_id=null): any {
	let projects = this.projects;
	if(section == 'project' && project_id){
      projects = _.reject(projects, function(rproject:any){
        return rproject.id == project_id;
      })
    }else{
	    _.each(projects, function(project:any){
	    	if(project_id && project.id == project_id){
	      	if(feature_id && section == 'feature'){
	      		project.features = _.reject(project.features, function(rfeature:any){
		          return rfeature.id == feature_id;
		        })
		        return;
	      	}else if(feature_id && todo_id && section == 'todo'){
	      		let features = project.features;
	      		_.each(features, function(feature:any){
	      			if(feature.id == feature.id){
				        feature.todos = _.reject(feature.todos, function(rtodo:any){
				          return rtodo.id == todo_id;
				        })
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
 	}

	add(section=null, item=null, project_id=null, feature_id=null): any {
		let projects = this.projects;
		if(section == 'project'){
			if(!projects)
				projects = [];
	      projects.push(item);
	    }else{
		    _.find(projects, function(project:any){
		    	if(project_id && project.id == project_id){
		      	if(section == 'feature'){
		      		if(!project.features)
		      			project.features = [];
		      		project.features.push(item);
			        return true;
		      	}else if(feature_id && section == 'todo'){
		      		let features = project.features;
		      		_.find(features, function(feature:any){
		      			if(feature.id == feature_id){
		      				if(!feature.todos)
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
 	}

 	tempEmptyProjects(): any{
 		this.projects = [];
 		return this.projects;
 	}

 	saveToLocalStorage(data): void{
 		if (typeof(Storage) !== "undefined") {
		    // Code for localStorage/sessionStorage.
		    try{
		    	localStorage.setItem("projects", JSON.stringify(data));
		    }catch(e){
		    	console.log("can not save", e);
		    }
		} else {
		    // Sorry! No Web Storage support..
		    console.log("no storage");
		}
 	}

 	getFromLocalStorage(): any {
 		if (typeof(Storage) !== "undefined") {
		    // Code for localStorage/sessionStorage.
		    try{
			    let store_projects = localStorage.getItem("projects");
			    if(store_projects)
			    	return JSON.parse(store_projects);
			    else
			    	return [];
			  }catch(e){
		    	console.log("can not save", e);
		    }
		} else {
		    // Sorry! No Web Storage support..
		    console.log("no storage");
		}
		return [];
 	}

}

