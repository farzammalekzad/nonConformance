import { Injectable } from '@angular/core';
import {NonconformModel} from './nonconform.model';
import {BehaviorSubject} from 'rxjs';
import {findIndex, map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NcService {
  nonConform = new BehaviorSubject<NonconformModel[]>([
    {
      id: 1,
      title: 'شکستگی لوله',
      imageUrl: '../../../assets/img/nc.jpg',
      description: 'با مشاهده این موضوع که شکستگی لوله بسیار حساس است به محل مراجعه شد',
      location: 'ساختمان شماره 1',
      severity: 'بحرانی',
      sphere: 'ساخت تجهیزات',
      reference: 'مدرک شماره 2',
      status: true,
      date: new Date('2021-03-04')
    },
    {
      id: 2,
      title: 'تخریب دیوار',
      imageUrl: '../../../assets/img/fault.jpg',
      description: 'با مشاهده این موضوع که شکستگی لوله بسیار حساس است به محل مراجعه شد',
      location: 'ساختمان شماره 1',
      severity: 'بحرانی',
      sphere: 'ساخت تجهیزات',
      reference: 'مدرک شماره 2',
      status: true,
      date: new Date('2021-03-04')
    },
    {
      id: 3,
      title: 'اشکال در نقشه',
      imageUrl: '../../../assets/img/nc.jpg',
      description: 'با مشاهده این موضوع که شکستگی لوله بسیار حساس است به محل مراجعه شد',
      location: 'ساختمان شماره 1',
      severity: 'بحرانی',
      sphere: 'ساخت تجهیزات',
      reference: 'مدرک شماره 2',
      status: true,
      date: new Date('2021-03-04')
    },
    {
      id: 4,
      title: 'ناهماهنگی میان نقشه و ساخت',
      imageUrl: '../../../assets/img/nc.jpg',
      description: 'با مشاهده این موضوع که شکستگی لوله بسیار حساس است به محل مراجعه شد',
      location: 'ساختمان شماره 1',
      severity: 'بحرانی',
      sphere: 'ساخت تجهیزات',
      reference: 'مدرک شماره 2',
      status: true,
      date: new Date('2021-03-04')
    }
  ]);

  constructor() { }

  getAllNc() {
    return this.nonConform.asObservable();
}

  getNcById(id: number) {
    return this.nonConform.pipe(take(1), map((ncs) => {
       return ncs.find((nc) => {
        return nc.id === id;
      });
    }));
  }

  addNc(title: string, description: string, location: string, severity: string, sphere: string, reference: string) {
    const id = Math.round(Math.random() * 1000);
    // tslint:disable-next-line:max-line-length
    const newNc: NonconformModel = {id, title, imageUrl: '../../../assets/img/nc.jpg' , description, location, severity, sphere, reference, status: true, date: new Date(Date.now())};
    return this.nonConform.pipe(take(1), tap((nc) => {
      this.nonConform.next(nc.concat(newNc));
    }));
  }
  editNcs(id: number, title: string, description: string, severity: string, sphere: string, reference: string, status: boolean) {
    return this.nonConform.pipe(take(1), tap((ncs) => {
    const index = ncs.findIndex((nc) => nc.id === id);
    const newNcs = [...ncs];
    const oldNc = ncs[index];
    newNcs[index] = {
      id,
      title,
      imageUrl: oldNc.imageUrl,
      description,
      location: oldNc.location,
      severity,
      sphere,
      reference,
      status,
      date: oldNc.date
    };
    this.nonConform.next(newNcs);
    }
  ));
}
}
