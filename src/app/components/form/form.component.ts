import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  initialValues = input<{ select: string }>();
  options = input.required<string[]>();

  form = computed(() => {
    const initialValues = this.initialValues();
    if (initialValues) {
      return new FormGroup({
        select: new FormControl(initialValues.select),
      });
    } else {
      return new FormGroup({
        select: new FormControl(this.options()[0]),
      });
    }
  });

  selectOptions = computed(() => {
    return this.options().map((option: any) => ({
      value: option,
      label: option.toUpperCase(),
    }));
  });
}
