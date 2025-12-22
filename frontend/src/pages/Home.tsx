import React from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Leaf, TreePine, BarChart3, Users } from 'lucide-react';

const Home = () => {
  const forestImage = "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg";
  
  const missionIcons = [
    { icon: <TreePine size={24} />, title: "Capital naturel", description: "Valorisation des forêts et de la biodiversité du Gabon" },
    { icon: <Leaf size={24} />, title: "Crédits carbone", description: "Monétisation des crédits carbone et de biodiversité" },
    { icon: <BarChart3 size={24} />, title: "Investissements verts", description: "Promotion et facilitation des investissements écologiques" },
    { icon: <Users size={24} />, title: "Sensibilisation", description: "Information des acteurs publics, privés et des citoyens" }
  ];
  
  const newsArticles = [
    {
      title: "Lancement officiel de l'AGADEV",
      description: "L'Agence Gabonaise pour le Développement de l'Économie Verte a été officiellement lancée par le Président de la République.",
      imageSrc: "/foret-gabonaise-2.jpg.jpg",
      date: "15 janvier 2025"
    },
    {
      title: "Signature d'un partenariat stratégique avec le CENAREST",
      description: "L'AGADEV et le Centre National de la Recherche Scientifique et Technologique unissent leurs forces.",
      imageSrc: "/foret-gabonaise-3.jpg.jpg",
      date: "3 février 2025"
    },
    {
      title: "Participation à la COP30 à Belém",
      description: "L'AGADEV représentera le Gabon lors de la 30ème Conférence des Parties sur les changements climatiques au Brésil.",
      imageSrc: "/foret-gabonaise-4.jpg.jpg",
      date: "7 mars 2025"
    }
  ];
  
  const partners = [
    { name: "Ministère de l'Économie" },
    { name: "CENAREST" },
    { name: "PNUD" },
    { name: "Banque Africaine de Développement" },
    { name: "Union Européenne" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Transformer notre capital naturel en opportunité pour demain"
        subtitle="L'Agence Gabonaise pour le Développement de l'Économie Verte œuvre pour une transition écologique durable au Gabon"
        backgroundImage={forestImage}
        buttonText="Découvrir nos missions"
        buttonLink="/nos-missions"
        height="large"
      />

      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-black mb-6">
                Bienvenue à l'AGADEV
              </h2>
              <p className="mb-4 text-blue-black">
                L'Agence Gabonaise pour le Développement de l'Économie Verte (AGADEV) est un établissement public à caractère industriel et commercial, créé en janvier 2025, sous la tutelle du Ministère de l'Économie du Gabon.
              </p>
              <p className="mb-6 text-blue-black">
                Notre mission est de positionner le Gabon comme un acteur majeur de la transition écologique en Afrique centrale en valorisant notre capital naturel et en promouvant l'investissement vert.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/a-propos" variant="primary">
                  En savoir plus
                </Button>
                <Button to="/contact" variant="outline">
                  Nous contacter
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/foret-gabonaise-5.jpg.jpg" 
                alt="Forêt gabonaise" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="section bg-beige-light/40">
        <div className="container-custom">
          <SectionTitle 
            title="Nos missions" 
            subtitle="L'AGADEV articule son action autour de quatre piliers stratégiques"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionIcons.map((mission, index) => (
              <Card
                key={index}
                title={mission.title}
                description={mission.description}
                icon={mission.icon}
                to="/nos-missions"
                className="h-full"
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button to="/nos-missions" variant="primary">
              Découvrir toutes nos missions
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Actualités récentes" 
            subtitle="Découvrez les dernières nouvelles de l'AGADEV"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <div key={index} className="card hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.imageSrc} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-copper mb-2">{article.date}</p>
                  <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                  <p className="text-blue-black/80 mb-4">{article.description}</p>
                  <Button to="/actualites" variant="outline" size="sm">
                    Lire la suite
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button to="/actualites" variant="secondary">
              Voir toutes les actualités
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section bg-blue-black text-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">Nos partenaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white/10 px-6 py-4 rounded-lg w-full text-center">
                <p className="font-medium text-white">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-forest to-green-medium text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Participez à la transition écologique</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white">
            Découvrez nos appels à projets et opportunités pour contribuer au développement de l'économie verte au Gabon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/opportunites" variant="primary" size="lg">
              Voir les opportunités
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-medium">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;