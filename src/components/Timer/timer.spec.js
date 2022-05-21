import { render, screen } from '@testing-library/react';
import Timer from './';

test('validate the number of years the day before birthday', () => {
  render(<Timer date={'1977-05-25'} currDate={new Date('2022-05-24')} />);
  expect(screen.getByText(/44 years ago/i)).toBeInTheDocument();
});
test('Validate the number of years on the day of the birthday', () => {
  render(<Timer date={'1977-05-25'} currDate={new Date('2022-05-25')} />);
  expect(screen.getByText(/45 years ago/i)).toBeInTheDocument();
});
test('validate the number of years the day after birthday', () => {
  render(<Timer date={'1977-05-25'} currDate={new Date('2022-05-26')} />);
  expect(screen.getByText(/45 years ago/i)).toBeInTheDocument();
});
test('validate the number format DD-MM-YYYY', () => {
  render(<Timer date={'1977-05-04'} currDate={new Date('2022-05-26')} />);
  expect(screen.getByText(/04-05-1977/i)).toBeInTheDocument();
});
