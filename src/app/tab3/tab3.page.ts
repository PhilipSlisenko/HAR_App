import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: [ 'tab3.page.scss' ]
})
export class Tab3Page {
	toast: any;
	constructor(public toastController: ToastController, private toastService: ToastService) {}
	clicked() {
		this.toastService.presentToast('clicked');
		console.log('clicked');
	}
}
