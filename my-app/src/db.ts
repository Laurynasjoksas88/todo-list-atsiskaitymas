import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://laurynasjoksas779:pedropedro@cluster2.opbroj6.mongodb.net/', {
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;