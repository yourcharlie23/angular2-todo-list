import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe  implements PipeTransform {


  //filterargs = {title: 'hello'};
  //items = [{title: 'hello world'}, {title: 'hello kitty'}, {title: 'foo bar'}];

  transform(items: any[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        // console.log("items", items);
        // console.log("items", args);
        try{
	        let key = _.keys(args)[0];
	        return items.filter(item => item[key].toLowerCase().indexOf(args[key]) !== -1);
	    }catch(e){
	    	console.log(e);
	    	return items;
	    }
    }

}
