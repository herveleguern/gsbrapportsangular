import { Component, input } from '@angular/core';
import { Medecin } from '../../types/medecin';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  doctor = input.required<Medecin>();
}
