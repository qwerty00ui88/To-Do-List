const express = require('express');
const app = express();

app.get('/todos', function (req, res) {
  res.json({
    todos: [
      {
        id: '2023-02-09T12:45:50.397Z',
        text: 'ㄱㄷㅈㄱ',
        dueDate: '2023-02-24',
      },
    ],
  });
});

app.listen(3001);
