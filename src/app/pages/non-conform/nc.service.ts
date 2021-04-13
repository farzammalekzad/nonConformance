import { Injectable } from '@angular/core';
import {NonconformModel} from './nonconform.model';
import {BehaviorSubject, of} from 'rxjs';
import {filter, findIndex, map, switchMap, take, tap} from 'rxjs/operators';
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
          if (resData.hasOwnProperty(key)) {
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
        }
        return ncs;
      }), tap((ncs) => {
        return this.nonConform.next(ncs);
      }));
  }


  getNcById(id: string) {
    let nc: NonconformModel;
    return this.http.get<NcData>(`https://ionic-ncr-default-rtdb.firebaseio.com/nc/${id}.json`)
      .pipe(map((data) => {
         nc = {
          id,
          title: data.title,
          imageUrl: data.imageUrl,
          description: data.description,
          location: data.location,
          severity: data.severity,
          sphere: data.sphere,
          reference: data.reference,
          status: data.status,
          date: new Date(data.date)
        };
         return nc;
      }));



    /*return this.nonConform.pipe(map((ncs) => {
      console.log(ncs);
      return ncs.find((nc) => {
         return  nc.id === id;
      });
    }));*/
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
    let newNc: NonconformModel[];
    return this.nonConform.pipe(take(1), switchMap((ncs) => {
      if (!ncs || ncs.length === 0) {
        return this.fetchNcs();
      } else {
        return of(ncs);
      }
    }), switchMap((ncs) => {
      const index = ncs.findIndex(nc => nc.id === id);
      const oldNc = ncs[index];
      newNc = [...ncs];
      newNc[index] = {
        id: oldNc.id,
        title,
        description,
        severity,
        sphere,
        reference,
        status,
        imageUrl: oldNc.imageUrl,
        location: oldNc.location,
        date: oldNc.date
      };
      return this.http.put(`https://ionic-ncr-default-rtdb.firebaseio.com/nc/${id}.json`, {...newNc[index], id: null} );
    }), tap(() => {
      this.nonConform.next(newNc);
        }));
}
}

