import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopulationChart from '../components/PopulationChart'; // Adjust path as necessary
import { Container } from 'react-bootstrap';

const PopulationChartPage = () => {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Population Chart</h2>
      <PopulationChart countries={countries} />
    </Container>
  );
};

export default PopulationChartPage;
