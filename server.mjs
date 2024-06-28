import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    const { number } = req.body;
    const prediction = number === '12' ? 'ถูกรางวัล' : 'ไม่ถูกรางวัล';
    res.json({ prediction });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app };

