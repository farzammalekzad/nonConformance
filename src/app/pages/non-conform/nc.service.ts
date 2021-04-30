import {Inject, Injectable} from '@angular/core';
import {NonconformModel} from './nonconform.model';
import {BehaviorSubject, of} from 'rxjs';
import {catchError, filter, findIndex, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseurl';
import {HttpService} from './http.service';
import {AuthService} from '../auth/auth.service';


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
interface imageResData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
@Injectable({
  providedIn: 'root'
})
export class NcService {

  generatedId: string;
  date: Date;
  nonConform = new BehaviorSubject<NonconformModel[]>([]);

  constructor(private http: HttpClient, public httpService: HttpService, private authService: AuthService) { }

  getAllNc() {
    return this.nonConform.asObservable();
  }

  fetchNcs() {
    return this.http.get<NonconformModel[]>('http://localhost:3000/nc')
      .pipe(map(resData => {
          this.nonConform.next(resData);
          return resData;
      }), catchError(this.httpService.handleError));
      }
    /*return this.http.get<{ [key: string]: NcData}>('https://ionic-ncr-default-rtdb.firebaseio.com/nc.json')
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
      }));*/



getNcById(id: string) {
    return this.http.get<NonconformModel>('http://localhost:3000/nc/' + id)
      .pipe(map(resData => {
        return resData;
      }));

    // let nc: NonconformModel;
    // return this.http.get<NcData>(`https://ionic-ncr-default-rtdb.firebaseio.com/nc/${id}.json`)
    //   .pipe(map((data) => {
    //      nc = {
    //       id,
    //       title: data.title,
    //       imageUrl: data.imageUrl,
    //       description: data.description,
    //       location: data.location,
    //       severity: data.severity,
    //       sphere: data.sphere,
    //       reference: data.reference,
    //       status: data.status,
    //       date: new Date(data.date)
    //     };
    //      return nc;
    //   }));



    /*return this.nonConform.pipe(map((ncs) => {
      console.log(ncs);
      return ncs.find((nc) => {
         return  nc.id === id;
      });
    }));*/
  }

  uploadImage(image: File) {
  const uploadData = new FormData();
  uploadData.append('image', image);

  return this.http.post<imageResData>('http://localhost:3000/upload', uploadData);
  }

  addNc(title: string, description: string, location: string, severity: string, sphere: string, reference: string, image: string) {

    const newNc: NonconformModel = {
      _id: null,
      title,
      imageUrl: image,
      description,
      location,
      severity,
      sphere,
      reference,
      status: true,
      date: null
    };
    return this.http.post<NonconformModel>('http://localhost:3000/nc', {...newNc, _id: null, date: null})
      .pipe(switchMap((resData) => {
        this.generatedId = resData._id;
        this.date = new Date(resData.date);
        return this.nonConform;
    }), take(1), tap(ncs => {
      newNc._id = this.generatedId;
      newNc.date = this.date;
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
      const index = ncs.findIndex(nc => nc._id === id);
      const oldNc = ncs[index];
      newNc = [...ncs];
      newNc[index] = {
        _id: oldNc._id,
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
      return this.http.put(`http://localhost:3000/nc/${id}`, {...newNc[index], id: null} );
    }), tap(() => {
      this.nonConform.next(newNc);
        }));
}
}

