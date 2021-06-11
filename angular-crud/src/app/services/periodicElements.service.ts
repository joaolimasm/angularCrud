import { PeriodicElement } from 'src/app/models/PeriodicElements';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeriodicElementService {
  constructor(private http: HttpClient) { }
}
