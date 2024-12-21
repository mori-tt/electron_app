import path from "path";
import express from "express";

const app = express();
app.use(express.static('images'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})