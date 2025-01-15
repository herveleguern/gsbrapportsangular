import { Component, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './doctor-filters.component.html',
  styleUrl: './doctor-filters.component.css'
})
export class DoctorFiltersComponent {
  searchDoctor = output<string>();
  searchDoctorControl = new FormControl<string>('');

  addFilter(): void {
    if (!this.searchDoctorControl.value) {
      return;
    }
      console.log(this.searchDoctorControl.value)
      this.searchDoctor.emit(this.searchDoctorControl.value);
    
  }
}
