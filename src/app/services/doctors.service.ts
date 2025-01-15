import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from '../types/medecin';
import { RapportVisite } from '../types/RapportVisite';
import { Visiteur } from '../types/visiteur';


@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  httpClient = inject(HttpClient);

  getDoctors(): Observable<Medecin[]> {
    return this.httpClient.get<Medecin[]>('http://localhost/restGSB/medecins?nom=');
  }
  getMedecinById(id:number): Observable<Medecin> {
    return this.httpClient.get<Medecin>(`http://localhost/restGSB/medecin/${id}`);
  }

  getRapportsByMedecin(id:number): Observable<RapportVisite[]>{
    return this.httpClient.get<RapportVisite[]>(`http://localhost/restGSB/rapports/${id}`); 
  }

  getLesVisiteurs(): Observable<Visiteur[]>{
  return this.httpClient.get<Visiteur[]>('http://localhost/restGSB/visiteurs?nom=');
}

}
