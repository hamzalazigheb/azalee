require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function restore() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Restore original values
  await mongoose.connection.db.collection('pagecontents').updateOne(
    {path: 'immobilier/lmnp'},
    {$set: {
      'content.avantages.title': 'Les avantages du LMNP',
      'content.avantages.subtitle': 'Découvrez les bénéfices du dispositif LMNP pour votre patrimoine'
    }}
  );
  
  console.log('✅ Content restored to original values');
  await mongoose.disconnect();
}

restore();


