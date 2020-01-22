const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const cors = require(`cors`);
const config = require(`config`);

//Port
const port = process.env.PORT || 2000;

//body-parser middleware
app.use(express.json());
app.use(cors());

//Route-API
app.use(`/api/user`, require(`./api/Routes/controller`));

//connect to mongoDB Atlas
const connectDB = async () => {
    try {
        const connected = await mongoose.connect(config.get(`mongoURI`), 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        if(connected) console.log(`Connected to MongoDB Atlas...`);
    } catch (err) {
        console.log({msg: `MongoDB failed to initialize!`, err});
    }
}

//initialize DBdsd
connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
