const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();
const port = 3000;
app.use(cors());
// Path to the jobs.json file
const filePath = path.join(__dirname, 'jobs.json');

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Read jobs from the jobs.json file
function readJobs() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Write jobs to the jobs.json file
function writeJobs(jobs) {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2), 'utf8');
}

// API route to get all jobs
app.get('/jobs', (req, res) => {
  const jobs = readJobs();
  res.json(jobs);
});
app.post('/otherData', (req, res) => {
  const { lastUpdateDate } = req.body;

  if (!lastUpdateDate) {
    return res.status(400).json({ error: 'lastUpdateDate is required' });
  }

  try {
    fs.writeFileSync(path.join(__dirname, 'otherData.json'), JSON.stringify(lastUpdateDate, null, 2), 'utf8');
    res.status(201).json({ message: 'Data successfully saved' });
  } catch (err) {
    console.error('Error writing to file:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/otherData', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'otherData.json'), 'utf8');
    return res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// API route to add a new job
app.post('/add-job', (req, res) => {
  const {
    testSuite,
    environment,
    localCompany,
    totalTestCaseCount,
    executedTestCaseCount,
    passedTestCaseCount,
    passPercentage,
    status,
    executedBy,
    applicationMode,
    applicationType,
    comments,
    date,
    id
  } = req.body;

  if (!testSuite || !environment || !localCompany || !totalTestCaseCount || !executedTestCaseCount ||
    !passedTestCaseCount || !status || !executedBy || !date) {
    return res.status(400).send('All fields are required');
  }

  const jobs = readJobs();
  const newJob = {
    testSuite,
    environment,
    localCompany,
    totalTestCaseCount,
    executedTestCaseCount,
    passedTestCaseCount,
    passPercentage,
    status,
    executedBy,
    applicationMode,
    applicationType,
    comments,
    date,
    id
  };

  jobs.push(newJob);
  writeJobs(jobs);

  res.status(201).send('Job added');
});

// API route to update a job by some identifier (e.g., localCompany, date, or other unique field)
app.put('/update-job', (req, res) => {
  const { localCompany, newJobData } = req.body;

  if (!localCompany || !newJobData) {
    return res.status(400).send('Local Company and new job data are required');
  }

  const jobs = readJobs();
  const job = jobs.find(j => j.localCompany === localCompany);

  if (job) {
    // Update the job properties with new data
    Object.assign(job, newJobData);
    writeJobs(jobs);
    res.send('Job updated');
  } else {
    res.status(404).send('Job not found');
  }
});

// API route to delete a job by some identifier (e.g., localCompany or date)
app.delete('/delete-job', (req, res) => {
  const { localCompany } = req.body;

  if (!localCompany) {
    return res.status(400).send('Local Company is required');
  }

  const jobs = readJobs();
  const index = jobs.findIndex(j => j.localCompany === localCompany);

  if (index !== -1) {
    jobs.splice(index, 1);  // Remove the job from the array
    writeJobs(jobs);
    res.send('Job deleted');
  } else {
    res.status(404).send('Job not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
