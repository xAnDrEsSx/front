import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/interfaces/respuesta';


@Injectable({
  providedIn: "root",
})

export class CurrencyTypeService {

  private baseUrl : string = environment.baseUrl

  constructor(private http : HttpClient) { }

  consultaTipoMoneda(): Observable<Respuesta> {
    const url = `${this.baseUrl}/CurrencyType`;
    return this.http.get<Respuesta>(url);
  } 
}