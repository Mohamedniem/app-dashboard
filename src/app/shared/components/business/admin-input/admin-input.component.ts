import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-input',
  standalone: true,
  imports: [],
  templateUrl: './admin-input.component.html',
  styleUrl: './admin-input.component.scss'
})
export class AdminInputComponent {

  @Input({required: true}) label!: string;
  @Input({required: true}) id!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() isRequired: boolean = true;
  @Input() classes: string = '';
  @Input() accept: string = '.jpg, .png, .jpeg';

  @Output() search = new EventEmitter<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }

}
