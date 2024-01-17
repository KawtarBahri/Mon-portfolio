const express = require('express');
const mongoose = require('mongoose');
const Recommandations = require('./modele.js');
const cors = require('cors');
const axios = require('axios');

const path = require('path');
const router = express.Router();

const app = express();
app.use(express.json());


//connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://Kawtar:motdepasse@atlascluster.esuumn0.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Activer CORS pour toutes les routes
app.use(cors());


app.use("/static", express.static(path.join(__dirname, '/static')))
app.get('/', (req, res) => {
    res.redirect(301,'/static/index.html')
})


app.get('/recommandations', async (req, res) => {
  try {
    console.log('Requête pour récupérer les recommandations reçue');
    const recommandations = await Recommandations.find({}, { _id: 0, Recommandation: 1 }).select('-_id');
    console.log('Recommandations récupérées :', recommandations);
    res.json(recommandations);
  } catch (error) {
    console.error('Erreur lors de la récupération des recommandations:', error);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des recommandations' });
  }
});
app.use((req, res, next) => {
  console.log('Requête reçue :', req.url);
  next();
});



//recevoir une recommandation du formulaire du front
   app.post('/addRecommendation', (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const Recommandation = new Recommandations({
      ...req.body
    });
    Recommandation.save()
      .then(() => res.status(201).json({ message: 'Recommandation enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  });
  

  app.get('/', (req, res) => {
    console.log('reçue/');

    res.status(200).json({ message: 'le serveur est la !'});

  });

  app.use((req, res) => {
    console.log('404');

    res.status(404).json({ message: 'Page non trouvée!'});

  });

module.exports = app;
