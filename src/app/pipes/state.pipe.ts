import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'state'
})
export class StatePipe implements PipeTransform {
	transform(value: any, args?: any): any {
		let mapper = {
			0: 'https://image.flaticon.com/icons/svg/10/10522.svg', //stand
			1: 'https://ak4.picdn.net/shutterstock/videos/32191984/thumb/1.jpg', //walk
			2: 'https://visualpharm.com/assets/941/Running-595b40b85ba036ed117de12d.svg', //activity
			3: 'https://images.pond5.com/mobile-phone-table-loop-footage-007974898_iconl.jpeg' //on table
		};
		return mapper[value];
	}
}
// jump https://visualpharm.com/assets/941/Running-595b40b85ba036ed117de12d.svg
// stand https://image.flaticon.com/icons/svg/10/10522.svg
// on table https://images.pond5.com/mobile-phone-table-loop-footage-007974898_iconl.jpeg
// walk https://ak4.picdn.net/shutterstock/videos/32191984/thumb/1.jpg
