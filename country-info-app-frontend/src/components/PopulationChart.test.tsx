import { render } from '@testing-library/react';
import PopulationChart from './PopulationChart';

test('renders population chart', () => {
  const countries = [
    { name: { common: 'India' }, population: 1393409038 },
    { name: { common: 'China' }, population: 1444216107 },
  ];
  render(<PopulationChart countries={countries} />);
});
