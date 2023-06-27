import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/interfaces/respuesta';


@Injectable({
  providedIn: "root",
})

export class BranchStoreService {

  private baseUrl : string = environment.baseUrl

  constructor(private http : HttpClient) { }

  consultaTiendas(): Observable<Respuesta> {
    const url = `${this.baseUrl}/BranchStore`;
    return this.http.get<Respuesta>(url);
  } 

  guardarTienda (model: any){
    const url = `${this.baseUrl}/BranchStore/CreateBranch`

    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    return this.http.post<any>(url,
    {
        code: model.code,
        description: model.description,
        address: model.address,
        identification: model.identification,
        currencyTypeId: model.currencyTypeId,
    },
    options);
  }  

  borrarTienda (model: any){
    const url = `${this.baseUrl}/BranchStore/DeleteBranch/${model.Id}`;

    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.delete<any>(url, options);   
  }    


}