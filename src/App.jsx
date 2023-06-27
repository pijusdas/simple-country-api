import { useEffect } from "react";
import { useState } from "react";

const Dropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');



  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const getId = countries.find(count => count.name === selectedCountry)
    console.log(getId)
    if (selectedCountry) {
      fetchStates(getId.id);
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    const getcity = states.find(state => state.name === selectedState)
    if (selectedState) {
      fetchCities(getcity?.id);
    }
  }, [selectedState, states]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://d32sbion19muhj.cloudfront.net/pub/interview/countries');
      const data = await response.json();
      setCountries(data.data);
    } catch (error) {
      console.log('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await fetch(`https://d32sbion19muhj.cloudfront.net/pub/interview/states`);
      const data = await response.json();
      console.log(data.data)
      const statess = data.data

      const filteredStates = statess?.filter((state) => state?.country_id === countryId);
      setStates(filteredStates);
    } catch (error) {
      console.log('Error fetching states:', error);
    }
  };



  const fetchCities = async (state) => {
    try {
      const response = await fetch('city.json');
      const data = await response.json();
      console.log(data)
      const filterCity = data.data.filter(city => city?.state_id === state)
      console.log(filterCity)
      setCities(filterCity);
    } catch (error) {
      console.log('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (


    <>
      <h1 className=" text-white text-center mt-20 font-bold text-5xl">The Amazing Country Api</h1>
      <div className=" flex justify-center mt-36 text-white">
        <select className=" bg-slate-900 text-center p-5 rounded-xl" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option value={country.code} key={country.id}>
              {country.name}
            </option>
          ))}
        </select>

        <select className=" bg-slate-900 text-center p-5 rounded-xl mx-5" value={selectedState} onChange={handleStateChange}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option value={state.name} key={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <select className=" bg-slate-900 text-center p-5 rounded-xl">
          <option value="">Select City</option>
          {cities.map((city) => (
            <option value={city.code} key={city.code}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
