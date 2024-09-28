import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col,Card, Form, Button } from 'react-bootstrap';

const CompareCountriesPage = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [country1, setCountry1] = useState<any>(null);
  const [country2, setCountry2] = useState<any>(null);
  const [searchTerm1, setSearchTerm1] = useState<string>(''); // Search term for first country
  const [searchTerm2, setSearchTerm2] = useState<string>(''); // Search term for second country

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  // Filter the list of countries based on search term for country1
  const filteredCountries1 = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  // Filter the list of countries based on search term for country2
  const filteredCountries2 = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const handleCountryChange = async (countryCode: string, setCountry: any) => {
    const response = await axios.get(`http://localhost:5000/api/countries/${countryCode}`);
    setCountry(response.data[0]);
  };

  return (
    <Container>
      <h2 className="mt-4">Compare Countries</h2>
      <Row className="mb-4">
        <Col>
          <Form.Group>
            {/* <Form.Control
              type="text"
              placeholder="Search for First Country"
              value={searchTerm1}
              onChange={(e) => setSearchTerm1(e.target.value)}
            /> */}
            <Form.Select
              onChange={(e) => handleCountryChange(e.target.value, setCountry1)}
              value={country1?.cca3 || ''}
              className="mt-2"
            >
              <option value="">Select First Country</option>
              {filteredCountries1.map((country) => (
                <option key={country.cca3} value={country.cca3}>
                  {country.name.common}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            {/* <Form.Control
              type="text"
              placeholder="Search for Second Country"
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
            /> */}
            <Form.Select
              onChange={(e) => handleCountryChange(e.target.value, setCountry2)}
              value={country2?.cca3 || ''}
              className="mt-2"
            >
              <option value="">Select Second Country</option>
              {filteredCountries2.map((country) => (
                <option key={country.cca3} value={country.cca3}>
                  {country.name.common}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className='compareCountries'>
        {country1 && country2 && (
          <>
            <Col md={6}>
            <Card>
              <Card.Img variant="top" src={country1.flags.png}  alt={`${country1.name.common} flag`}  />
              <Card.Body>
                <Card.Title>{country1.name.common}</Card.Title>
                <Card.Text>Capital: {country1.capital}</Card.Text>
                <Card.Text>Population: {country1.population.toLocaleString()}</Card.Text>
                <Card.Text>Region: {country1.region}</Card.Text>
                <Card.Text>Languages: {Object.values(country1.languages).join(', ')}</Card.Text>
                <Card.Text>Currencies: {Object.values(country1.currencies).map((currency: any) => currency.name).join(', ')}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
            <Col md={6}>
            <Card>
              <Card.Img variant="top" src={country2.flags.png}  alt={`${country2.name.common} flag`}  />
              <Card.Body>
                <Card.Title>{country2.name.common}</Card.Title>
                <Card.Text>Capital: {country2.capital}</Card.Text>
                <Card.Text>Population: {country2.population.toLocaleString()}</Card.Text>
                <Card.Text>Region: {country2.region}</Card.Text>
                <Card.Text>Languages: {Object.values(country2.languages).join(', ')}</Card.Text>
                <Card.Text>Currencies: {Object.values(country2.currencies).map((currency: any) => currency.name).join(', ')}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default CompareCountriesPage;
