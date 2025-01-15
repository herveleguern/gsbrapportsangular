import { Component, DestroyRef, inject, input, ModuleWithComponentFactories } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Medecin } from '../../types/medecin';
import { DoctorsService } from '../../services/doctors.service';
import { combineLatestWith, Observable } from 'rxjs';
import { RapportVisite } from '../../types/RapportVisite';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Visiteur } from '../../types/visiteur';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-detail-medecin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detail-medecin.component.html',
  styleUrl: './detail-medecin.component.css'
})
export class DetailMedecinComponent {
  id = input.required<number>();
  medecin!: Medecin;
  rapports!: RapportVisite[];
  visiteurs!: Visiteur[];
  private readonly destroyRef = inject(DestroyRef);
  private readonly doctorsService = inject(DoctorsService);
  private httpClient = inject(HttpClient);


  rapportVisiteForm = new FormGroup({
    date: new FormControl<string | null>(null, Validators.required),
    motif: new FormControl<string | null>(null, Validators.required),
    bilan: new FormControl<string | null>(null, Validators.required),
    visiteur: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    this.doctorsService
      .getMedecinById(this.id())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        combineLatestWith(this.doctorsService.getRapportsByMedecin(this.id())),
        combineLatestWith(this.doctorsService.getLesVisiteurs())
      )
      .subscribe(([[detail, rapports], visiteurs]: [[Medecin, RapportVisite[]], Visiteur[]]): void => {
        this.medecin = detail;
        this.rapports = rapports;
        this.visiteurs = visiteurs;
        //console.log(this.medecin);
      });
  }

  creerRapport(): void {
    if (!this.rapportVisiteForm.valid) {
      return;
    }
    let rapportDeVisite = {
      date: this.rapportVisiteForm.value.date,
      motif: this.rapportVisiteForm.value.motif,
      bilan: this.rapportVisiteForm.value.bilan,
      visiteur: this.rapportVisiteForm.value.visiteur,
    }
    console.log(rapportDeVisite);
    //creer le nouveau rapport dans la BD
    //pour cela souscrire a l'observable 
    this.creerRapportVisite(rapportDeVisite).subscribe();
  }

  //exemple d'appel API restGSB de la creation d'un nouveau rapport
  //http GET
  //http://localhost/restGSB/nouveaurapport?idVisiteur=a55&idMedecin=1000&motif=prise%20de%20contact&bilan=interessee&date=2025-01-10&medicaments=null

  creerRapportVisite(rapportVisite :any): Observable<RapportVisite> {
    console.log(rapportVisite);
    const params=new HttpParams({
      fromObject: {
        date: rapportVisite.date,
        motif: rapportVisite.motif,
        bilan: rapportVisite.bilan,
        idVisiteur: rapportVisite.visiteur,
        idMedecin: this.id(),
        medicaments:"null"
      }
    });
    console.log(params.toString());
    //OK date=2025-01-08&motif=poiu&bilan=poiu&idVisiteur=a55&idMedecin=640
    return this.httpClient.get<RapportVisite>('http://localhost/restGSB/nouveaurapport', {params});
    //KO semble ne pas appeler le "service".
    //KO pas d'insert en base
  }
}
