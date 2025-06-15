import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-admin',
  standalone: true,
  imports: [],
  templateUrl: './search-bar-admin.component.html',
  styleUrl: './search-bar-admin.component.scss'
})
export class SearchBarAdminComponent {

  @Input() placeholder!: string;

  @Output() search = new EventEmitter<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }

}
