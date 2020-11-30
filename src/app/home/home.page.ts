import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrdata: any;
  qrScan: any;
  createCode: any;
  constructor(public platform: Platform, public qr: QRScanner, public dialog: Dialogs) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubsribe();
    });
  }


  StartCanning() {
    if (this.platform.is('cordova')) {
      this.qr.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qr.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";
          this.qrScan = this.qr.scan().subscribe((textFound) => {
            document.getElementsByTagName("body")[0].style.opacity = "1";
            this.qrScan.unsubsribe();
            this.dialog.alert(textFound);
          }, (err) => {
            this.dialog.alert(JSON.stringify(err));
          })
        } else if (status.denied) {

        } else {

        }
      });
    }
  }

  public create() {
    this.createCode = this.qrdata;
  }
  public clear() {
    this.createCode = '';
  }

}
