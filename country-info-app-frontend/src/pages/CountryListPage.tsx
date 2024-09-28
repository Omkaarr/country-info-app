import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CountryListPage = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [region, setRegion] = useState<string>(''); // State to track the selected region
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data);
      setFilteredCountries(response.data); // Initially show all countries
    };
    fetchCountries();
  }, []);

  // Function to handle the click of the "View Details" button
  const handleViewDetails = (countryCode: string) => {
    // Navigate to the CountryDetailPage with the country code in the URL
    navigate(`/country/${countryCode}`);
  };

  // Function to handle region change
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

    if (selectedRegion === '') {
      // If no region is selected, show all countries
      setFilteredCountries(countries);
    } else {
      // Filter countries based on the selected region
      const filtered = countries.filter((country) => country.region === selectedRegion);
      setFilteredCountries(filtered);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Country List</h2>

      {/* Region Filter Dropdown */}
      <Form.Group controlId="regionSelect" className="mb-4">
        <Form.Label>Filter by Region</Form.Label>
        <Form.Select value={region} onChange={handleRegionChange}>
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Form.Select>
      </Form.Group>

      <Row>
        {filteredCountries.map((country) => (
          <Col key={country.cca3} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={country.flags.svg} alt={`${country.name.common} flag`} className='cardImgStyles'/>
              <Card.Body>
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Text>Region: {country.region}</Card.Text>
                <Card.Text>Population: {country.population.toLocaleString()}</Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(country.cca3)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CountryListPage;
