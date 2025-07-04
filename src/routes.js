import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/emissor', (req, res) => {
  res.render('emissor');
});

router.get('/receptor', (req, res) => {
  res.render('receptor');
});

export default router;
