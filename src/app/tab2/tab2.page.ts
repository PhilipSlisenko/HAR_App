import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { AccelerationService } from '../services/acceleration.service';
import { Subscription } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page {
	recordingStarted: boolean = false;
	savingRecording: boolean = false;
	readyToRecord: boolean = false;
	recordingData: string = '';
	dataTest: string = '';
	accelerationSubscription: Subscription;
	num: number = 0;
	chosenActivity: number = null;
	chosenUser: string = '';
	activities: any[] = [
		{
			id: 1,
			name: 'Sitting, phone in pocket'
		},
		{
			id: 2,
			name: 'Standing, phone in pocket'
		},
		{
			id: 3,
			name: 'Walking, phone in pocket'
		},
		{
			id: 4,
			name: 'Activity, phone in pocket'
		},
		{
			id: 5,
			name: 'Sitting, interacting with the phone'
		},
		{
			id: 6,
			name: 'Standing, interacting with the phone'
		},
		{
			id: 7,
			name: 'Walking, interacting with the phone'
		},
		{
			id: 8,
			name: 'Activity, interacting with the phone'
		},
		{
			id: 9,
			name: 'Phone on the table'
		}
	];
	users: any[] = [
		{
			id: 'ser',
			name: 'Serega'
		},
		{
			id: 'fil',
			name: 'Phil'
		},
		{
			id: 'sla',
			name: 'Slavik'
		},
		{
			id: 'kos',
			name: 'Kostya'
		}
	];
	constructor(
		private deviceMotion: DeviceMotion,
		private toastService: ToastService,
		private accelerationService: AccelerationService,
		private file: File,
		private storage: Storage
	) {}

	clicked() {
		this.toastService.presentToast('recording started');
	}
	isReadyToRecord() {
		return this.chosenActivity && this.chosenUser && !this.recordingStarted;
	}
	updateReadyToRecord() {
		this.readyToRecord = this.isReadyToRecord();
	}
	startRecodring() {
		// this.num = this.increaseReturnNumInStorage();
		this.recordingData = `#label:${this.chosenActivity}\nx,y,z\n`;
		this.toastService.presentToast('recording started');
		this.recordingStarted = true;
		this.accelerationService.startAccelerationTracking(20);
		this.accelerationSubscription = this.accelerationService
			.getAccelerometerObservable()
			.subscribe((accelerationData: DeviceMotionAccelerationData) => {
				this.recordingData += accelerationData.x + ',' + accelerationData.y + ',' + accelerationData.z + '\n';
				// this.toastService.presentToast(
				// 	this.recordingData.length
				// 	//accelerationData.x + ',' + accelerationData.y + ',' + accelerationData.z
				// );
			});
		this.readyToRecord = this.isReadyToRecord();
	}
	stopRecording() {
		this.recordingStarted = false;
		this.accelerationSubscription.unsubscribe();
		this.savingRecording = true;
		this.recordingData += '#end';
		//this.saveRecordingOrDiscard()
		this.file
			.checkDir(this.file.externalRootDirectory, 'Download')
			.then((_) => this.toastService.presentToast('Directory exists'))
			.catch((err) => this.toastService.presentToast('Directory doesnt exist'));
		let filename = this.chosenUser + '_' + this.chosenActivity + '_' + this.makeid(5) + '.csv';
		this.file
			.writeFile(this.file.externalRootDirectory + 'Download/HAR/', filename, this.recordingData, {
				replace: true
			})
			.then(
				(res) => this.toastService.presentToast(filename + ' Saved!'),
				(err) => this.toastService.presentToast('error ' + err.message)
			);
		this.readyToRecord = this.isReadyToRecord();
	}
	makeid(length: number) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	// async increaseReturnNumInStorage() {
	// 	if (!this.storage.get('num')) {
	// 		this.storage.set('num', '1');
	// 		return 1;
	// 	} else {
	// 		let num:number;
	// 		this.storage.get('num').then((numStr) => {

	// 		})
	// 		let num = parseInt(this.storage.get('num').then((num) => num, (err)), 10) + 1;
	// 		this.storage.set('num', num.toString());
	// 		return num;
	// 	}
	// }
	saveRecordingOrDiscard() {}
}
