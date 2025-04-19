import express from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/" , (req ,res) => {
    res.send("API Working");
});

const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log(`Server is listening on port ${PORT}`)
});
 