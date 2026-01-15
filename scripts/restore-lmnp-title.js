require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function restore() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Restore the original avantages title
  await mongoose.connection.db.collection('pagecontents').updateOne(
    {path: 'immobilier/lmnp'},
    {$set: {'content.avantages.title': 'Les avantages du LMNP'}}
  );
  
  console.log('✅ Title restored to original');
  await mongoose.disconnect();
}

restore();


