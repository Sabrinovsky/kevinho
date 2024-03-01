import { render, screen } from '@testing-library/angular';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('InputComponent', () => {
  test('should render counter', async () => {
    await render(InputComponent, {
      componentProperties: { label: 'Label' },
      imports: [FormsModule, MatFormFieldModule, MatInputModule],
    });

    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});
