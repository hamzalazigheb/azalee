require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Update the subtitle
  await mongoose.connection.db.collection('pagecontents').updateOne(
    {path: 'immobilier/lmnp'},
    {$set: {'content.avantages.subtitle': 'TEST SUBTITLE - Tous les avantages du LMNP'}}
  );
  
  // Verify
  const page = await mongoose.connection.db.collection('pagecontents').findOne({path: 'immobilier/lmnp'});
  console.log('New subtitle:', page.content.avantages?.subtitle);
  
  await mongoose.disconnect();
}

test();


