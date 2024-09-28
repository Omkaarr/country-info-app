import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryListPage from './pages/CountryListPage';
import CountryDetailPage from './pages/CountryDetailPage';
import CompareCountriesPage from './pages/CompareCountriesPage';
import PopulationChartPage from './pages/PopulationChartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CountryListPage />} />
          <Route path="/country/:code" element={<CountryDetailPage />} />
          <Route path="/compare" element={<CompareCountriesPage />} />
          <Route path="/chart" element={<PopulationChartPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
