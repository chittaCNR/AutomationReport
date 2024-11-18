import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobReport } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  getJobs(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  addJob(job: JobReport): Observable<string> {
    const url = `http://localhost:3000/add-job`;
    console.log('in addjob', job);
    return this.http.post<string>(url, job);
  }

  addOtherData(data: any) {
    const url = `http://localhost:3000/otherData`;
    return this.http.post<string>(url, data);
  }

  getOtherData() {
    const url = `http://localhost:3000/otherData`;
    return this.http.get<string>(url);
  }
}
