import mongoose  from 'mongoose';

// store dummy datalike for one lakh
// {
//   note500:100,
//   notes200:200,
//   notes100:100
// }
const atmSchema = new mongoose.Schema({
    notes500: { type: Number },
    notes200: { type: Number },
    notes100: { type: Number },
  });
  
  const ATM = mongoose.model('ATM', atmSchema);

export default ATM;