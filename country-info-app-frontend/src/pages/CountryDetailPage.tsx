import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const CountryDetailPage = () => {
  const { code } = useParams<{ code: string }>(); // Get the country code from URL
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const response = await axios.get(`http://localhost:5000/api/countries/${code}`);
      setCountry(response.data[0]);
    };
    fetchCountryDetails();
  }, [code]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mt-4">Country Details: {country.name?.common}</h2>
      <Card className='detailsPageCard'>
        <Card.Img variant="top" src={country.flags.svg} alt={`${country.name?.common} flag`} />
        <Card.Body>
          <Card.Title>{country.name?.common}</Card.Title>
          <Card.Text>Region: {country.region}</Card.Text>
          <Card.Text>Population: {country.population.toLocaleString()}</Card.Text>
          <Card.Text>Capital: {country.capital}</Card.Text>
          <Card.Text>Languages: {Object.values(country.languages).join(', ')}</Card.Text>
          <Card.Text>Currencies: {Object.values(country.currencies).map((currency: any) => currency.name).join(', ')}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CountryDetailPage;
