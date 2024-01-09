import mongoose from 'mongoose'
process.env.MONGO_URI="https://localhost:27017/db";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/TodoTest", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
