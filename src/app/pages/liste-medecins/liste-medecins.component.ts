import { Component, OnInit, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DoctorsService } from "../../services/doctors.service";
import { Medecin } from "../../types/medecin";
import { DoctorFiltersComponent } from "../../components/doctor-filters/doctor-filters.component";
import { DoctorComponent } from "../../components/doctor/doctor.component";


@Component({
  selector: 'app-liste-medecins',
  standalone: true,
  imports: [DoctorFiltersComponent,DoctorComponent],
  templateUrl: './liste-medecins.component.html',
  styleUrl: './liste-medecins.component.css'
})
  export class ListeMedecinsComponent implements OnInit {
    private readonly doctorsService = inject(DoctorsService);
    private readonly destroyRef = inject(DestroyRef);
    medecins!: Medecin[];
    filteredMedecins!: Medecin[];
  
    ngOnInit(): void {
      this.doctorsService
        .getDoctors()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((medecins) => {
          this.medecins = medecins;
          this.filteredMedecins = medecins;
        });
    }
    searchDoctor(name: string): void {
      //console.log('toto', name);
      if (!name) {
        this.filteredMedecins = this.medecins;
        return;
      }
      this.filteredMedecins = this.medecins.filter((medecin) => medecin?.nom.toLowerCase().includes(name.toLowerCase()));
    }
  }


