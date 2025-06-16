import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss'
})
export class ImageModalComponent {

  @Input({ required: true }) imageSrc!: string;

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
