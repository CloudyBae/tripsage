import { render, screen, fireEvent } from '@testing-library/react';
import PlanForm from '@/app/plan/PlanForm';

describe('PlanForm', () => {
  it('displays error for return date before departure date', async () => {
    render(<PlanForm />);

    // Simulate user input for departure and return dates
    fireEvent.change(screen.getByLabelText('Departure Date:'), {
      target: { value: '2023-12-22' }, // Set departure date
    });
    fireEvent.change(screen.getByLabelText('Return Date:'), {
      target: { value: '2023-12-23' }, // Set return date to be before departure date
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: 'Search' }));

    // Assert that error message is displayed
    expect(await screen.findByText('Your return date cannot be before your departure date.')).toBeInTheDocument();
  });

//   it('displays error for no trip name', async () => {
//     render(<PlanForm />);

//     // Simulate user input
//     fireEvent.change(screen.getByLabelText('Give your trip a name!'), {
//       target: { value: '' },
//     });

//     // Submit form
//     fireEvent.submit(screen.getByRole('button', { name: 'Search' }));

//     // Assert that error message is displayed
//     expect(await screen.findByText('Departure code must be 3 letters long.')).toBeInTheDocument();
//   });

  it('displays error for departInput not being 3 letters long', async () => {
    render(<PlanForm />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Where are you departing from?'), {
      target: { value: 'DF' }, // Set departInput less than 3 letters
    });
    fireEvent.change(screen.getByLabelText('Where are traveling to?'), {
      target: { value: 'HNL' },
    });

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Search' }));

    // Assert that error message is displayed
    expect(await screen.findByText('Departure code must be 3 letters long.')).toBeInTheDocument();
  });

  it('displays error for arrivalInput not being 3 letters long', async () => {
    render(<PlanForm />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Where are you departing from?'), {
      target: { value: 'DFW' },
    });
    fireEvent.change(screen.getByLabelText('Where are traveling to?'), {
      target: { value: 'HN' }, // Set arrivalInput less than 3 letters
    });

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Search' }));

    // Assert that error message is displayed
    expect(await screen.findByText('Arrival code must be 3 letters long.')).toBeInTheDocument();
  });
});
