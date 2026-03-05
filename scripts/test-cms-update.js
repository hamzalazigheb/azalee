require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function testUpdate() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Update the avantages title
  await mongoose.connection.db.collection('pagecontents').updateOne(
    {path: 'immobilier/lmnp'},
    {$set: {'content.avantages.title': 'Les avantages du LMNP - TEST CMS'}}
  );
  
  // Verify the update
  const page = await mongoose.connection.db.collection('pagecontents').findOne({path: 'immobilier/lmnp'});
  console.log('Updated Avantages Title:', page.content.avantages?.title);
  
  await mongoose.disconnect();
}

testUpdate();


