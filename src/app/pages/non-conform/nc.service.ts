import {Inject, Injectable} from '@angular/core';
import {NonconformModel} from './nonconform.model';
import {BehaviorSubject, of} from 'rxjs';
import {catchError, filter, findIndex, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {Storage} from '@capacitor/storage';


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
interface RData {
  nc: NonconformModel;
  username: string;
}
// tslint:disable-next-line:class-name
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
  username: string;
  generatedId: string;
  date: Date;
  nonConform = new BehaviorSubject<NonconformModel[]>([]);
  constructor(private http: HttpClient,
              public httpService: HttpService,
              private authService: AuthService,
             ) { }

  getAllNc() {
    return this.nonConform.asObservable();
  }

  fetchNcs() {
    return this.http.get<NonconformModel[]>(`${this.authService.sendServerAddress()}/nc`)
        .pipe(map(resData => {
          this.nonConform.next(resData);
          return resData;
        }), catchError(this.httpService.handleError));
    }


getNcById(id: string) {
    return this.http.get<RData>(`${this.authService.sendServerAddress()}/nc/${id}`)
      .pipe(map(resData => {
        return resData;
      }));
      }


  uploadImage(image: File) {
  const uploadData = new FormData();
  uploadData.append('image', image);

  return this.http.post<imageResData>(`${this.authService.sendServerAddress()}/upload`, uploadData);
  }

  deleteNc(id: string) {
    return this.http.delete<{status: string}>(`${this.authService.sendServerAddress()}/nc/${id}`);
  }

  addNc(title: string, description: string, location: string, severity: string, sphere: string, reference: string, image: string) {
    if (!image) {
      image = '../../assets/img/nc.jpg';
    }
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
    return this.http.post<NonconformModel>(`${this.authService.sendServerAddress()}/nc`, {...newNc, _id: null, date: null})
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
      return this.http.put(`${this.authService.sendServerAddress()}/nc/${id}`, {...newNc[index], id: null} );
    }), tap(() => {
      this.nonConform.next(newNc);
        }));
}
}

