const express = require('express')
const app = express()
const mysql = require('mysql2');

// Import the dotenv package and configure it to load environment variables
require('dotenv').config();


// Create a connection using environment variables
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
  });

  
// Question 1 goes here
// Define the GET endpoint to retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
    // Execute the query to retrieve patient data
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching patients: ' + err.stack);
        return res.status(500).json({ message: 'Error fetching patients' });
      }
  
      // Return the list of patients in JSON format
      res.json(results);
    });
});

// Question 2 goes here
// Define the GET endpoint to retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_speciality FROM providers';
  
    // Execute the query to retrieve provider data
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching providers: ' + err.stack);
        return res.status(500).json({ message: 'Error fetching providers' });
      }
  
      // Return the list of providers in JSON format
      res.json(results);
    });
  });
  

// Question 3 goes here
app.get('/patients', (req, res) => {
    // Retrieve the 'first_name' query parameter from the request
    const firstName = req.query.first_name;
  
    if (!firstName) {
      return res.status(400).json({ message: 'Missing required query parameter: first_name' });
    }
  
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
    // Execute the query to retrieve patients with the specified first_name
    connection.query(query, [firstName], (err, results) => {
      if (err) {
        console.error('Error fetching patients: ' + err.stack);
        return res.status(500).json({ message: 'Error fetching patients' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No patients found with the given first name' });
      }
  
      // Return the list of patients in JSON format
      res.json(results);
    });
  });

// Question 4 goes here
app.get('/providers', (req, res) => {
    // Retrieve the 'provider_specialty' query parameter from the request
    const providerSpecialty = req.query.provider_specialty;
  
    if (!providerSpecialty) {
      return res.status(400).json({ message: 'Missing required query parameter: provider_specialty' });
    }
  
    const query = 'SELECT first_name, last_name, provider_speciality FROM providers WHERE provider_specialty = ?';
  
    // Execute the query to retrieve providers with the specified specialty
    connection.query(query, [providerSpecialty], (err, results) => {
      if (err) {
        console.error('Error fetching providers: ' + err.stack);
        return res.status(500).json({ message: 'Error fetching providers' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No providers found with the given specialty' });
      }
  
      // Return the list of providers in JSON format
      res.json(results);
    });
  });


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})