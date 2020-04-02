import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import { connect } from 'react-redux';
import changeTheme from './actionCreators/changeTheme';
import changeLocation from './actionCreators/changeLocation';

const SearchParams = (props) => {
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const {animals} = await pet.animals({
      location: props.location,
      breed,
      type: animal
    })

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet.breeds(animal)
      .then(({breeds : apiBreeds}) => {
        const breedStrings = apiBreeds.map(({name}) => name);
        setBreeds(breedStrings);
      }, console.error);
  }, [animal, setBreeds, setBreed]);

  return (
    <div className="search-params">
      <form onSubmit={e => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={props.location}
            placeholder={props.location}
            onChange={e => props.updateLocation(e.target.value)}
          />
          <button style={{ backgroundColor: props.theme }}>Submit</button>
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={props.theme}
            onChange={e => (props.updateTheme(e.target.value))}
            onBlur={e => (props.updateTheme(e.target.value))}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
      </form>
      <Results pets={pets} />
    </div>
  )
}
const mapStateToProps = ({ theme, location }) => ({
  theme,
  location
});

const mapDispatchToProps = dispatch => ({
  updateTheme: theme => dispatch(changeTheme(theme)),
  updateLocation: location => dispatch(changeLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);