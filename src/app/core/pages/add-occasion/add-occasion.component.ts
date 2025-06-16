import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OccasionsService } from '../../services/occasions/occasions.service';


@Component({
  selector: 'app-add-occasion',
  standalone: true,
  imports: [AdminInputComponent, ReactiveFormsModule],
  templateUrl: './add-occasion.component.html',
  styleUrl: './add-occasion.component.scss'
})
export class AddOccasionComponent implements OnInit{

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);

  addOccasionForm!:FormGroup;

  ngOnInit(): void {
    this.createForm();
  };

  onFileChange(file: any): void {
    if (file && file.type.startsWith('image/')) {
      this.addOccasionForm.patchValue({ image: file });
    };
  };

  createForm():void {
    this.addOccasionForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      image: [null, [Validators.required]]
    });
  };

  // Feature not working due to missing super admin credentials
  addOccasionSubmit(): void {
    console.log(this.addOccasionForm.value);
    this._occasionsService.addOccasion(this.addOccasionForm.value).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        console.log('Occasion added successfully:', res);
        this.addOccasionForm.reset();
      },
      error: (error) => {
        console.error('Error adding occasion:', error);
      }
    });
  };
}
