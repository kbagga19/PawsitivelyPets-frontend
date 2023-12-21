import React, { useState } from "react";
import DogCard from "../components/DogCard";

const dogsData = [
  {
    image:
      "https://assets.thepetnest.com/W4eaLBwPeVNL6cpwE6s5bwCy?response-content-disposition=inline%3B+filename%3Dpet-image-ac61.jpeg%3B+filename%2A%3DUTF-8%27%27pet-image-ac61.jpeg&response-content-type=image%2Fjpeg&Expires=1703095145&Signature=bdvTVD8vGZ2uVXqXKJQiNBeBUrV8xz0W3Ad7jlXiRCZvyf9ZFtHJ-HXwSNrbGijy1R9DJsoy8K62jgC~4P0DthusayiL-F0IeMJqdtM9kjPFiPcoZGmVfpLjjRRsb0ePj8pdG-ki5mJvz0WNvvRDlw39cDq6qiZsidmPxjbSBbmnsvFlUmrZjkjmc5FsFrgTCs5RprxpkDpwtl3~vGSkYDTzv3B9lDs9eftFCoJ07PsBEhRzqadKG5Gmm2EfQt9R~~VS4KB96cPwT333uPNExNqrEkxb7Q1DFso0iJcQLJLhPDzfx68IjtE3Ww3YZ6jeS3M5CbBa3M4VEI-u9KE0zQ__&Key-Pair-Id=APKAQBSFVNAXXGJKQ7XK",
    name: "Buddy",
    age: "2 years",
    location: { city: "New York", state: "NY" },
    owner: { name: "Alice", phone: "123-456-7890" },
  },
  {
    image:
      "https://assets.thepetnest.com/Nh4UV5orNm3F97Vx1QeDgmPe?response-content-disposition=inline%3B+filename%3Dpet-image-5b90.jpeg%3B+filename%2A%3DUTF-8%27%27pet-image-5b90.jpeg&response-content-type=image%2Fjpeg&Expires=1703095145&Signature=CiIK1dtU6oXS8GWVFSK4gSFseLsfOWCQIAmVXr6puA~SItnDICddSD4Xw2L5tgLJFTPj0B2L23xDEUixEv3VHzXlt3OQvGzqhmdQFCBGp~5xxkGXEZH7VLpm10v6TzRSKX01WfFwXxW54~-Z~KeDHR9wBz1HTufcOBQCZ~dicxZXXXYJj~c5On6lmDqR64rjElRLGp3YdQLMp46TyZqqYjgGrCSEXI5WJhmtWJK4Cz9OLf2VRPOUWfmeEjlZvtGmv0QTXEccUCvY42ZTC2HHkdAIhBpHLhSAvkaaDQ8R87-mVP1ZbXJ37esuXKHXnNFwQUK6Y5UFOmKkFsmu0sF~nw__&Key-Pair-Id=APKAQBSFVNAXXGJKQ7XK",
    name: "Max",
    age: "3 years",
    location: { city: "Los Angeles", state: "CA" },
    owner: { name: "Bob", phone: "987-654-3210" },
  },
  {
    image: "dog3.jpg",
    name: "Bailey",
    age: "1.5 years",
    location: { city: "Chicago", state: "IL" },
    owner: { name: "Charlie", phone: "111-222-3333" },
  },
  {
    image: "dog4.jpg",
    name: "Lucy",
    age: "4 years",
    location: { city: "Houston", state: "TX" },
    owner: { name: "Daisy", phone: "444-555-6666" },
  },
  {
    image: "dog6.jpg",
    name: "Rocky",
    age: "3.5 years",
    location: { city: "Miami", state: "FL" },
    owner: { name: "Ella", phone: "777-888-9999" },
  },
  {
    image: "dog7.jpg",
    name: "Coco",
    age: "2 years",
    location: { city: "Seattle", state: "WA" },
    owner: { name: "Finn", phone: "111-222-3333" },
  },
  {
    image: "dog8.jpg",
    name: "Bella",
    age: "1 year",
    location: { city: "Boston", state: "MA" },
    owner: { name: "Grace", phone: "444-555-6666" },
  },
  {
    image: "dog9.jpg",
    name: "Teddy",
    age: "4 years",
    location: { city: "San Francisco", state: "CA" },
    owner: { name: "Henry", phone: "999-888-7777" },
  },
  {
    image: "dog10.jpg",
    name: "Luna",
    age: "2.5 years",
    location: { city: "Austin", state: "TX" },
    owner: { name: "Isabella", phone: "333-222-1111" },
  },
];

const MainAdoption = () => {
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    age: "",
  });

  const [dogs, setDogs] = useState(dogsData);

  console.log(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAgeFilterChange = (e) => {
    setFilters({ ...filters, age: e.target.value });
  };

  const applyFilters = () => {
    // Implement filter logic here based on 'filters' state
    // Update the display or fetch filtered data from your dogsData
    // For example: Filter dogs based on state, city, and age
    let filteredDogs = [...dogsData]; // Create a copy of the original data

    // Filter by state
    if (filters.state !== "") {
      filteredDogs = filteredDogs.filter(
        (dog) => dog.location.state === filters.state
      );
    }

    // Filter by city
    if (filters.city !== "") {
      filteredDogs = filteredDogs.filter(
        (dog) => dog.location.city === filters.city
      );
    }

    // Filter by age
    if (filters.age !== "") {
      const ageFilter = filters.age;
      filteredDogs = filteredDogs.filter((dog) => {
        parseInt(dog.age);
        if (ageFilter === "lessThan2") {
          return parseInt(dog.age) < 2;
        } else if (ageFilter === "2to4") {
          return parseInt(dog.age) >= 2 && parseInt(dog.age) <= 4;
        } else if (ageFilter === "moreThan4") {
          return parseInt(dog.age) > 4;
        }
        return true;
      });
    }

    console.log(filteredDogs);
    setDogs(filteredDogs);
    // Display filtered dogs in the console (for demonstration)
    // Here you might update the state with filteredDogs or render them differently in your app
  };
  return (
    <>
      <div className="bannerDiv">
        <h1>Dogs Available for Adoption</h1>
      </div>
      {/* <input type="text" onChange={(e) => console.log(e)} /> */}
      <div className="app">
        <div className="filter-options">
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="stateFilter">State:</label>
            <select id="stateFilter" name="state" onChange={handleFilterChange}>
              <option value="">--Select State--</option>
              <option value="MA">MA</option>
              <option value="WA">WA</option>
              <option value="TX">TX</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="cityFilter">City:</label>
            <select id="cityFilter" name="city" onChange={handleFilterChange}>
              <option value="">--Select City--</option>
              <option value="Boston">Boston</option>
              <option value="Seattle">Seattle</option>
              <option value="Houston">Houston</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <p style={{ marginBottom: 0 }}>Age:</p>
            <label>
              <input
                type="radio"
                name="age"
                value="lessThan2"
                onChange={handleAgeFilterChange}
              />
              Less than 2 years
            </label>
            <label>
              <input
                type="radio"
                name="age"
                value="2to4"
                onChange={handleAgeFilterChange}
              />
              2 - 4 years
            </label>
            <label>
              <input
                type="radio"
                name="age"
                value="moreThan4"
                onChange={handleAgeFilterChange}
              />
              4 years or older
            </label>
          </div>
          <button style={{ margin: "15px 0" }} onClick={applyFilters}>
            Apply Filters
          </button>
        </div>

        <div className="dogs-container">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainAdoption;
