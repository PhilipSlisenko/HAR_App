import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: [ 'tab3.page.scss' ]
})
export class Tab3Page {
	deviceInfo: string;
	constructor(
		public toastController: ToastController,
		private toastService: ToastService,
		private file: File,
		private storage: Storage,
		private device: Device
	) {}
	clicked() {
		this.deviceInfo =
			this.device.model +
			'\n' +
			this.device.platform +
			'\n' +
			this.device.version +
			'\n' +
			this.device.manufacturer;
		// this.file
		// 	.checkDir(this.file.externalRootDirectory, 'Download')
		// 	.then((_) => this.toastService.presentToast('Directory exists'))
		// 	.catch((err) => this.toastService.presentToast('Directory doesnt exist'));
		// this.file.writeFile(this.file.externalRootDirectory + 'Download', 'test_file.csv', 'a,b,c\n1,2,3', {
		// 	replace: false
		// });
	}
}
