/*This is svajagan,I have completed the task-2 based on questions which was given by you.In this i have learned a new things which is how to read a input from the user and display in the terminal.
I am eagerly waiting for join this company and then it will improve my knowlege as well as waiting for work with expertise*/

const mongoose = require('mongoose');
const readline = require('readline');

// Define schema
const datasetSchema = new mongoose.Schema({
  price: Number,
  volume: Number
});

// Create model
const Dataset = mongoose.model('datasetforpriceandvolume', datasetSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/priceandvolumedatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Call the test function after successful connection
  start();
})
.catch(err => console.error('Failed to connect to MongoDB', err));

// Function to start interaction with the database
function start() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Which operation do you want to perform? (create/read/update/delete): ', async (operation) => {
    if (operation === 'create') {
      const price = parseFloat(await askQuestion('Enter price: '));
      const volume = parseFloat(await askQuestion('Enter volume: '));
      try {
        const create = await createdataset(price, volume);
        console.log('Created dataset:', create);
      } catch (error) {
        console.error('Error creating dataset:', error);
      }
    } else if (operation === 'read') {
      const id = await askQuestion('Enter dataset ID: ');
      try {
        const view = await viewbyid(id);
        console.log('Retrieved dataset:', view);
      } catch (error) {
        console.error('Error in viewing a dataset:', error);
      }
    } else if (operation === 'update') {
      const id = await askQuestion('Enter dataset ID: ');
      const newPrice = parseFloat(await askQuestion('Enter new price: '));
      const newVolume = parseFloat(await askQuestion('Enter new volume: '));
      try {
        const update = await updatedatasets(id, newPrice, newVolume);
        console.log('Updated dataset:', update);
      } catch (error) {
        console.error('Error updating dataset:', error);
      }
    } else if (operation === 'delete') {
      const id = await askQuestion('Enter dataset ID: ');
      try {
        const deletedataset = await deletedatasets(id);
        console.log('Deleted dataset:', deletedataset);
      } catch (error) {
        console.error('Error deleting dataset:', error);
      }
    } else {
      console.log('Invalid operation. Please enter any of the operation : create, read, update, delete.');
    }

    rl.close();
    mongoose.connection.close();
  });
}

// Function to ask a question
function askQuestion(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Create function
async function createdataset(price, volume) {
  const dataset = new Dataset({
    price: price,
    volume: volume
  });
  return await dataset.save();
}

// Read function
async function viewbyid(id) {
  return await Dataset.findById(id);
}

// Update function
async function updatedatasets(id, newPrice, newVolume) {
  return await Dataset.findByIdAndUpdate(id, { price: newPrice, volume: newVolume }, { new: true });
}

// Delete function
async function deletedatasets(id) {
  return await Dataset.findByIdAndRemove(id);
}
