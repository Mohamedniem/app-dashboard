import { Component, inject, signal, DestroyRef } from '@angular/core';
import { ContentTableAdminComponent } from '../../../shared/components/business/content-table-admin/content-table-admin.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IOccasion } from '../../interfaces/occasion/ioccasion';
import { OccasionsService } from '../../services/occasions/occasions.service';

@Component({
  selector: 'app-all-occasions',
  standalone: true,
  imports: [ContentTableAdminComponent, FormsModule],
  templateUrl: './all-occasions.component.html',
  styleUrl: './all-occasions.component.scss'
})
export class AllOccasionsComponent {

  private readonly _occasionsService = inject(OccasionsService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  searchValue = signal('');
  occasionsList = signal<IOccasion[]>([]);

  ngOnInit(): void {
    this.getOccasions();
  }

  getOccasions(): void {
    this._occasionsService.getOccasions()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          if ('occasions' in res) {
            this.occasionsList.set(res.occasions);
          }
        },
        error: (err) => {
          console.error('Error fetching occasions:', err);
        }
      });
  }

  addOccasion(): void {
    this._router.navigate(['maindashboard/occasions/add']);
  }

  deleteOccasion(id: string): void {
    this._occasionsService.deleteOccasion(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getOccasions();
        },
        error: (err) => {
          console.error('Error deleting occasion:', err);
        }
      });
  }

  updateOccasions(occasionId: string): void {
    this._router.navigate(['maindashboard/occasions/update', occasionId]);
  }

}
