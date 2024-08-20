const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data', 'mice.json');

const getMice = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

app.get('/', (req, res) => {
    const mice = getMice();
    res.render('index', { mice });
});

app.get('/mouse/:id', (req, res) => {
    const mice = getMice();
    const mouse = mice.find(m => m.id === parseInt(req.params.id));
    if (!mouse) {
        return res.status(404).send('Mouse not found');
    }
    res.render('detail', { mouse });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
