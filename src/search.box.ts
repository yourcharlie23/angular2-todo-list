import { Component, Output, EventEmitter} from '@angular/core'

@Component({
	selector: 'search-box',
	template: `
		<div>
			<input #input (input)="fireEvent(input.value)" placeholder="Search" [ngClass]="'input-box'"/>
		</div>
	`
})

export class SearchBox{
	@Output() update = new EventEmitter();

	ngOnInit(){
		this.update.emit('');
	}

	fireEvent(val){
		this.update.emit(val);
	}
}