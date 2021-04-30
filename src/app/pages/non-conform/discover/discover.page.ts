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

  nonConformances: NonconformModel[] = [];
  isLoading = false;
  private ncSub1: Subscription;
  private ncSub2: Subscription;
  errMess: string;

  constructor(private ncService: NcService, private router: Router) { }

  ngOnInit() {
     this.ncSub2 = this.ncService.getAllNc().subscribe();
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.ncSub1 = this.ncService.fetchNcs().subscribe((ncs) => {
      this.nonConformances = ncs;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.errMess = error;
    });
}

  editNc(id: string, itemSliding: IonItemSliding) {
    itemSliding.close().then(() => {
      this.router.navigate(['/', 'non-conform', 'tabs', 'edit', id ]);
    });
  }

  ngOnDestroy() {
    if (this.ncSub1 || this.ncSub2) {
      this.ncSub1.unsubscribe();
      this.ncSub2.unsubscribe();
    }
  }

}
