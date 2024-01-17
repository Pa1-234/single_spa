import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sharedConfig from '../../src/config/config';

export default function Homepage() {
  const backendendpoint = sharedConfig.REACT_APP_API_URL;
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const microservices = sharedConfig.MICROSERVICES;

    // Make API calls to microservices based on the specified microservices
    const requests = microservices.map((serviceName) =>
      axios.get(`${backendendpoint}/${serviceName}`).catch((error) => {
        // Handle individual API call errors here
        console.error(`Error making API call to ${serviceName}:`, error);

        // Check if the error is a network error
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
          setErrors((prevErrors) => [...prevErrors, `Network error. Unable to connect to ${serviceName}`]);
        } else {
          setErrors((prevErrors) => [...prevErrors, `Failed to fetch data from ${serviceName}`]);
        }

        return { error: true };
      })
    );

    // Use Promise.all to wait for all requests to complete
    Promise.all(requests)
      .then((responses) => {
        // Handle responses as needed
        const responseData = responses.map((response) => response.data);
        setData(responseData);
      })
      .catch((error) => {
        // Handle errors from the entire Promise.all
        console.error('Error making API calls:', error);
        setErrors((prevErrors) => [...prevErrors, 'Failed to fetch data. Please try again.']);
      });
  }, [backendendpoint]);

  if (errors.length > 0) {
    return (
      <div
        style={{
          maxWidth: 345,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ul style={{ color: 'red', padding: '10px' }}>
          {errors.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 345,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data &&
        data.map((response, index) => (
          <div key={index}>
            {/* Display data from each microservice response */}
            <p>{JSON.stringify(response)}</p>
          </div>
        ))}
    </div>
  );
}
