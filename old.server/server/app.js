const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001

app.use(cors())

app.get('/', (req, res) => {
    res.json({message: "Hello World!"});
})

app.listen(PORT), () => {
    console.log('Server stated on port ' + PORT);
}
