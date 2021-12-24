const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost/${process.env.key}`, 
  { useNewUrlParser: true}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!'); 
});
module.exports=db;