import { TitleCasePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-admin-input',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './admin-input.component.html',
  styleUrl: './admin-input.component.scss',
})
export class AdminInputComponent implements ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Required Inputs
  @Input({ required: true }) type!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;

  @Input() classes: string = '';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = true;

  // For file input
  @Input() accept: string = '.jpg, .png, .jpeg';
  @Input() parent: string = '';
  @Output() fileChange = new EventEmitter<File>();

  // Internal state
  value: any = '';
  isDisabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.value = input.value;
  this.onChange(this.value);
}

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    this.fileChange.emit(file);
    this.onChange(file); // Also notify Angular form control of the change
  }
}

  onBlur(): void {
  this.onTouched();
}

  get control() {
    return this.ngControl?.control;
  }
}
