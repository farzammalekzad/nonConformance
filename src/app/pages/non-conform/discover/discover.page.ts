import {Component, OnDestroy, OnInit} from '@angular/core';
import {NcService} from '../nc.service';
import {NonconformModel} from '../nonconform.model';
import {IonItemSliding, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  nonConformances: NonconformModel[];
  private ncSub: Subscription;

  constructor(private ncService: NcService, private router: Router) { }

  ngOnInit() {
     this.ncSub = this.ncService.getAllNc().subscribe();
  }
  ionViewWillEnter() {
    this.ncService.fetchNcs().subscribe((ncs) => {
      this.nonConformances = ncs;
    });
}

  editNc(id: number, itemSliding: IonItemSliding) {
    itemSliding.close().then(() => {
      this.router.navigate(['/', 'non-conform', 'tabs', 'edit', id ]);
    });
  }

  ngOnDestroy() {
    if (this.ncSub) {
      this.ncSub.unsubscribe();
    }
  }

}
