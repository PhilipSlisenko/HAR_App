import { Component, OnInit } from '@angular/core';
import { StateMapperService } from '../services/state-mapper.service';
import { RfClf } from '../models/rf-clf';
@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements OnInit {
	data: any;
	state: any;
	constructor(private stateMapper: StateMapperService) {}

	ngOnInit(): void {
		this.stateMapper.watchState().subscribe((data) => {
			// try {
			// 	this.state = new RfClf().predict(this.stateMapper.dataProcessing(data));
			// } catch (error) {
			// 	this.state = error.message;
			// }
			let stateId = new RfClf().predict(data);
			let mapper = {
				0: 'https://image.flaticon.com/icons/svg/10/10522.svg', //stand
				1: 'https://ak4.picdn.net/shutterstock/videos/32191984/thumb/1.jpg', //walk
				2: 'https://visualpharm.com/assets/941/Running-595b40b85ba036ed117de12d.svg', //activity
				3: 'https://images.pond5.com/mobile-phone-table-loop-footage-007974898_iconl.jpeg' //on table
			};
			this.data = mapper[stateId];
		});
	}
}
