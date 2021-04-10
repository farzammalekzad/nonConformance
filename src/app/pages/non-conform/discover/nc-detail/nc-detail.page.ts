import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NonconformModel} from '../../nonconform.model';
import {NavController} from '@ionic/angular';
import {NcService} from '../../nc.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nc-detail',
  templateUrl: './nc-detail.page.html',
  styleUrls: ['./nc-detail.page.scss'],
})
export class NcDetailPage implements OnInit, OnDestroy {
  nonConformance: NonconformModel;
  private ncSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private ncService: NcService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('ncId')) {
        this.navCtrl.navigateBack('/non-conform/tabs/discover');
        return;
      }
      this.ncSub = this.ncService.getNcById(parseInt(paramMap.get('ncId'))).subscribe((nc) => {
        this.nonConformance = nc;
      });
    });

  }
  ngOnDestroy() {
    if (this.ncSub) {
      this.ncSub.unsubscribe();
    }
  }

}
