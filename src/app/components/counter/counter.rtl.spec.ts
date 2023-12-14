import { render, screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';
import userEvent from '@testing-library/user-event';

describe('CounterComponent', () => {
  test('increments the value when the button is clicked', async () => {
    const user = userEvent.setup();
    await render(CounterComponent);

    expect(screen.getByText('Value: 0')).toBeInTheDocument();

    const button = screen.getByText('Increment');
    await user.click(button);

    expect(screen.getByText('Value: 1')).toBeInTheDocument();
  });
});
