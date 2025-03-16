import React, { useState, useEffect, useRef } from 'react';

const BillionaireFortune = () => {
  // Liste des milliardaires avec leurs données
  const billionaires = {
    "Elon Musk": {
      fortune: 248500000000, // 248.5 milliards EUR
      tauxCroissance: 1200, // EUR par seconde
      couleurPrincipale: '#FFD700', // Or
    },
    "Mark Zuckerberg": {
      fortune: 170000000000, // 170 milliards EUR
      tauxCroissance: 950, // EUR par seconde
      couleurPrincipale: '#4267B2', // Bleu Facebook
    },
    "Jeff Bezos": {
      fortune: 190000000000, // 190 milliards EUR
      tauxCroissance: 1100, // EUR par seconde
      couleurPrincipale: '#FF9900', // Orange Amazon
    },
    "Larry Ellison": {
      fortune: 145000000000, // 145 milliards EUR
      tauxCroissance: 780, // EUR par seconde
      couleurPrincipale: '#F80000', // Rouge Oracle
    },
    "Bernard Arnault": {
      fortune: 215000000000, // 215 milliards EUR
      tauxCroissance: 1050, // EUR par seconde
      couleurPrincipale: '#C09F5E', // Doré luxe
    },
    "Warren Buffett": {
      fortune: 125000000000, // 125 milliards EUR
      tauxCroissance: 650, // EUR par seconde
      couleurPrincipale: '#0088CC', // Bleu Berkshire
    },
    "Larry Page": {
      fortune: 130000000000, // 130 milliards EUR
      tauxCroissance: 750, // EUR par seconde
      couleurPrincipale: '#4285F4', // Bleu Google
    },
    "Sergey Brin": {
      fortune: 125000000000, // 125 milliards EUR
      tauxCroissance: 720, // EUR par seconde
      couleurPrincipale: '#34A853', // Vert Google
    }
  };

  // États pour gérer l'affichage et l'animation
  const [selectedBillionaire, setSelectedBillionaire] = useState("Elon Musk");
  const [fortune, setFortune] = useState(billionaires[selectedBillionaire].fortune);
  const [argentDepuisVisite, setArgentDepuisVisite] = useState(0);
  const [tempsEcoule, setTempsEcoule] = useState(0);
  const [billets, setBillets] = useState([]);
  const containerRef = useRef(null);
  
  // Format des nombres en EUR avec séparateurs de milliers
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount).replace("$", "") + " €";
  };
  
  // Initialisation des billets de banque au chargement ou au changement de milliardaire
  useEffect(() => {
    const initialBillets = [];
    for (let i = 0; i < 120; i++) {
      const size = Math.random() * 25 + 20; // Taille entre 20 et 45
      const x = Math.random() * 100; // Pourcentage de la largeur
      const y = Math.random() * -100 - 20; // Au-dessus de la zone visible
      const speed = Math.random() * 1 + 1; // Vitesse variable
      const rotation = Math.random() * 360; // Rotation aléatoire
      
      initialBillets.push({
        id: i,
        x,
        y,
        size,
        speed,
        rotation
      });
    }
    
    setBillets(initialBillets);
    setFortune(billionaires[selectedBillionaire].fortune);
    setArgentDepuisVisite(0);
    setTempsEcoule(0);
  }, [selectedBillionaire]);
  
  // Mise à jour de la fortune et animation des billets
  useEffect(() => {
    const currentBillionaire = billionaires[selectedBillionaire];
    
    const interval = setInterval(() => {
      // Mise à jour des données financières
      const nowTime = new Date();
      const secondsElapsed = Math.floor((nowTime - new Date()) / 1000) + tempsEcoule + 1;
      const earned = secondsElapsed * currentBillionaire.tauxCroissance;
      
      setFortune(currentBillionaire.fortune + earned);
      setArgentDepuisVisite(earned);
      setTempsEcoule(secondsElapsed);
      
      // Animation des billets
      setBillets(prevBillets => {
        return prevBillets.map(billet => {
          // Déplacement vertical
          let newY = billet.y + billet.speed;
          
          // Réapparition par le haut si sorti par le bas
          if (newY > 120) {
            newY = Math.random() * -50 - 20;
            const newRotation = Math.random() * 360;
            
            return {
              ...billet,
              y: newY,
              x: Math.random() * 100,
              rotation: newRotation
            };
          }
          
          return {
            ...billet,
            y: newY
          };
        });
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [tempsEcoule, selectedBillionaire]);
  
  return (
    <div className="w-full max-w-4xl mx-auto relative" style={{ minHeight: '500px' }} ref={containerRef}>
      {/* Fond noir */}
      <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
        {/* Billets verts qui tombent */}
        {billets.map(billet => (
          <div
            key={billet.id}
            className="absolute"
            style={{
              left: `${billet.x}%`,
              top: `${billet.y}%`,
              width: billet.size * 1.6, // Rectangle pour billet
              height: billet.size,
              transition: 'top 0.05s linear',
              transform: `rotate(${billet.rotation}deg)`,
            }}
          >
            <div
              className="rounded-sm flex items-center justify-center"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#2E8B57', // Vert dollar
                opacity: 0.9,
                border: '2px double rgba(255,255,255,0.7)',
                boxShadow: '0 0 5px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.2)',
                fontWeight: 'bold',
                fontSize: billet.size * 0.6,
                color: '#DDFFDD',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              $
            </div>
          </div>
        ))}
        
        {/* Contenu principal */}
        <div className="relative z-10 p-6 text-white">
          {/* Menu déroulant des milliardaires avec texte */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-2">
              <div className="text-yellow-300 font-bold text-xl" style={{
                textShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
              }}>
                Choisis ton milliardaire
              </div>
            </div>
            <select 
              value={selectedBillionaire}
              onChange={(e) => setSelectedBillionaire(e.target.value)}
              className="px-4 py-2 rounded-lg bg-black border-4 border-yellow-500 text-yellow-300 font-bold text-xl cursor-pointer"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                textShadow: '0 0 8px rgba(255, 215, 0, 0.4)'
              }}
            >
              {Object.keys(billionaires).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Titre de la fortune */}
          <h1 className="text-4xl font-bold mb-8 text-center px-6 py-3 rounded-lg" style={{
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid #FFD700',
            color: billionaires[selectedBillionaire].couleurPrincipale,
            textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)'
          }}>
            Fortune en temps réel de {selectedBillionaire}
          </h1>
          
          {/* Compteur principal */}
          <div className="border-4 border-yellow-500 rounded-lg p-6 mb-8" style={{
            background: 'rgba(0,0,0,0.9)',
            boxShadow: `0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)`
          }}>
            <div className="text-6xl font-bold text-center" style={{
              color: billionaires[selectedBillionaire].couleurPrincipale,
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}>
              {formatMoney(fortune)}
            </div>
          </div>
          
          {/* Taux d'augmentation */}
          <div className="p-3 mb-8 rounded-lg mx-auto max-w-xl" style={{
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid #B8860B',
            boxShadow: '0 0 20px rgba(184, 134, 11, 0.3)'
          }}>
            <div className="text-yellow-300 text-base text-center font-medium mb-1" style={{
              textShadow: '0 0 6px rgba(255, 215, 0, 0.4)'
            }}>
              Depuis votre visite
            </div>
            <div className="text-2xl font-bold text-center mb-1" style={{
              color: '#FFD700',
              textShadow: '0 0 12px rgba(255, 215, 0, 0.5)'
            }}>
              {formatMoney(argentDepuisVisite)}
            </div>
            <div className="text-yellow-200 text-sm text-center font-medium" style={{
              textShadow: '0 0 6px rgba(255, 215, 0, 0.3)'
            }}>
              {(billionaires[selectedBillionaire].tauxCroissance/1000).toFixed(1)} k €/seconde
            </div>
          </div>
          
          {/* Pied de page */}
          <div className="text-yellow-300 text-sm text-right mt-6 px-3 py-1 rounded-lg" style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid #FFD700',
            textShadow: '0 0 5px rgba(255, 215, 0, 0.3)'
          }}>
            Made with Fortune Visualizer v2.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillionaireFortune;