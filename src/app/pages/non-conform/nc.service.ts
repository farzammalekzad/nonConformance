import { Injectable } from '@angular/core';
import {NonconformModel} from './nonconform.model';
import {BehaviorSubject} from 'rxjs';
import {findIndex, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

interface NcData {
  title: string;
  imageUrl: string;
  description: string;
  location: string;
  severity: string;
  sphere: string;
  reference: string;
  status: boolean;
  date: string;
}
@Injectable({
  providedIn: 'root'
})
export class NcService {

  generatedId: string;
  ncs: NonconformModel[] = [];
  nonConform = new BehaviorSubject<NonconformModel[]>([]);

  constructor(private http: HttpClient) { }

  getAllNc() {
    return this.nonConform.asObservable();
  }

  fetchNcs() {
    return this.http.get<{ [key: string]: NcData}>('https://ionic-ncr-default-rtdb.firebaseio.com/nc.json')
      .pipe(map(resData => {
        const ncs = [];
        for (const key in resData) {
          ncs.push({
            id: key,
            title: resData[key].title,
            imageUrl: resData[key].imageUrl,
            description: resData[key].description,
            location: resData[key].location,
            severity: resData[key].severity,
            sphere: resData[key].sphere,
            reference: resData[key].reference,
            status: resData[key].status,
            date: new Date(resData[key].date)
          });
        }
        console.log(ncs);
        return ncs;
      }), tap((ncs) => {
        return this.nonConform.next(ncs);
      }));
  }


  getNcById(id: string) {
    return this.fetchNcs().pipe(map((ncs) => {
       return ncs.find((nc) => {
         return  nc.id === id;
      });
    }));
  }

  addNc(title: string, description: string, location: string, severity: string, sphere: string, reference: string) {

    // tslint:disable-next-line:max-line-length
    const newNc: NonconformModel = {id: null, title, imageUrl: '../../../assets/img/nc.jpg' , description, location, severity, sphere, reference, status: true, date: new Date(Date.now())};
    return this.http.post<{name: string}>('https://ionic-ncr-default-rtdb.firebaseio.com/nc.json', {...newNc, id: null})
      .pipe(switchMap((resData) => {
        this.generatedId = resData.name;
        return this.nonConform;
    }), take(1), tap(ncs => {
      newNc.id = this.generatedId;
      return this.nonConform.next(ncs.concat(newNc));
      }));
  }
  editNcs(id: string, title: string, description: string, severity: string, sphere: string, reference: string, status: boolean) {
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

