import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccasionsService } from '../../services/occasions/occasions.service';
import { IOccasion } from '../../interfaces/occasion/ioccasion';
import { ImageModalComponent } from '../../../shared/components/business/image-modal/image-modal.component';

@Component({
  selector: 'app-update-occasion',
  standalone: true,
  imports: [TitleCasePipe, AdminInputComponent, ReactiveFormsModule, FormsModule, ImageModalComponent],
  templateUrl: './update-occasion.component.html',
  styleUrl: './update-occasion.component.scss'
})
export class UpdateOccasionComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);

  occasionId!: string  | null;
  occasion!: IOccasion;

  isModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.getOccasion();
  }

  getOccasion(): void {
    this.getOccasionIdFromUrl();
    this.getOccasionFromBackend();
  }
  getOccasionIdFromUrl(): void {
    this._activatedRoute.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((params) => {
      this.occasionId = params.get('id') || null;
    });
  };
  getOccasionFromBackend(): void {
    if (!this.occasionId) {
      return
    }
    this._occasionsService.getOccasion(this.occasionId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        if ('occasion' in res) {
          this.occasion = res.occasion;
        }
      },
      error: (err) => {
        console.error('Error fetching occasion:', err);
      }
    });
  };
  // Feature not working due to missing super admin credentials
  updateOccasion(event: any): void {
  if (!this.occasionId) {
    return;
  }
  const formData = new FormData();
  formData.append('name', event.target.value);
  formData.append('image', this.occasion.image);
  this._occasionsService.updateOccasion(this.occasionId, formData)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: () => {
        this.getOccasionFromBackend();
      },
      error: (err) => {
        console.error('Error updating occasion:', err);
      }
    });
}


  openModal(): void {
    this.isModalOpen.set(true);
  };
  closeModal(): void {
    this.isModalOpen.set(false);
  };

}
