import app from './index.js';

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
  console.log(`Servidor en https://examenhito4.onrender.com${PORT}`);
});

export default server;