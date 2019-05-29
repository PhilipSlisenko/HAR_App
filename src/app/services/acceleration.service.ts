import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AccelerationService {
	accelerometerObservable: Observable<DeviceMotionAccelerationData>;

	constructor(private deviceMotion: DeviceMotion) {}

	startAccelerationTracking(frequency: number = 20) {
		this.accelerometerObservable = this.deviceMotion.watchAcceleration({ frequency });
	}
	getAccelerometerObservable() {
		return this.accelerometerObservable;
	}
}
