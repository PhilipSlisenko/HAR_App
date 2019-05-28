import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page implements OnInit {
	constructor(private deviceMotion: DeviceMotion, private toastService: ToastService) {}
	ngOnInit() {
		let dataStore = [];
		this.deviceMotion.watchAcceleration({ frequency: 250 }).subscribe((data) => {
			this.toastService.presentToast(dataStore.length);
			dataStore.push(data.x + ' ' + data.y + ' ' + data.z);
		});
	}
}
