import React from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { TreePine, Leaf, BarChart3, Users, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Missions = () => {
  const bannerImage = "/foret-gabonaise-9.jpg.jpg";
  
  const missions = [
    {
      id: "capital-naturel",
      icon: <TreePine className="w-12 h-12 text-green-forest" />,
      title: "Valorisation du capital naturel",
      description: "Le Gabon possède l'une des forêts tropicales les mieux préservées au monde, avec plus de 85% de son territoire couvert de forêts. L'AGADEV travaille à la valorisation de cette richesse naturelle à travers des inventaires forestiers, des études de biodiversité et des projets de conservation.",
      actions: [
        "Cartographie et évaluation des ressources forestières et de la biodiversité",
        "Développement de mécanismes de valorisation des services écosystémiques",
        "Élaboration de projets de conservation et de gestion durable des ressources naturelles",
        "Coordination des efforts de recherche sur la biodiversité gabonaise"
      ],
      image: "/foret-gabonaise-1.jpg.jpg"
    },
    {
      id: "credits-carbone",
      icon: <Leaf className="w-12 h-12 text-green-forest" />,
      title: "Monétisation des crédits carbone",
      description: "Les forêts gabonaises stockent d'importantes quantités de carbone, offrant une opportunité unique de générer des revenus à travers les marchés carbone. L'AGADEV développe et met en œuvre des projets de réduction des émissions et supervise la vente de crédits carbone sur les marchés internationaux.",
      actions: [
        "Développement et certification de projets carbone conformes aux standards internationaux",
        "Facilitation de l'accès aux marchés carbone volontaires et réglementés",
        "Suivi et vérification des réductions d'émissions",
        "Répartition équitable des bénéfices générés par les crédits carbone"
      ],
      image: "/foret-gabonaise-2.jpg.jpg"
    },
    {
      id: "investissements",
      icon: <BarChart3 className="w-12 h-12 text-green-forest" />,
      title: "Promotion des investissements verts",
      description: "L'AGADEV encourage les investissements dans des projets et entreprises qui contribuent à la transition écologique, en facilitant l'accès au financement et en créant un environnement favorable aux initiatives vertes.",
      actions: [
        "Identification et promotion d'opportunités d'investissement vert",
        "Mise en relation entre porteurs de projets et investisseurs",
        "Développement de mécanismes de financement innovants (obligations vertes, prêts concessionnels)",
        "Accompagnement technique et administratif des projets verts"
      ],
      image: "/foret-gabonaise-3.jpg.jpg"
    },
    {
      id: "sensibilisation",
      icon: <Users className="w-12 h-12 text-green-forest" />,
      title: "Sensibilisation et formation",
      description: "Pour assurer la réussite de la transition vers une économie verte, l'AGADEV mène des activités de sensibilisation et de formation auprès des différents acteurs de la société gabonaise.",
      actions: [
        "Organisation de campagnes de sensibilisation sur les enjeux environnementaux",
        "Formation des fonctionnaires, entrepreneurs et étudiants aux métiers verts",
        "Publication de guides et de ressources sur l'économie verte",
        "Collaboration avec les établissements d'enseignement pour intégrer l'économie verte dans les cursus"
      ],
      image: "/foret-gabonaise-4.jpg.jpg"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Nos missions"
        subtitle="L'AGADEV œuvre pour un Gabon prospère et durable à travers quatre missions principales"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Introduction */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle 
              title="Notre ambition" 
              center={true}
            />
            <p className="text-lg mb-6">
              L'AGADEV a pour ambition de faire du Gabon un leader de l'économie verte en Afrique, en transformant ses atouts naturels en opportunités de développement durable et en créant un modèle économique innovant qui préserve l'environnement tout en améliorant le bien-être des populations.
            </p>
            <p className="text-lg mb-6">
              Pour y parvenir, nous articulons notre action autour de quatre piliers stratégiques qui se renforcent mutuellement et contribuent à la réalisation de notre vision commune.
            </p>
          </div>
        </div>
      </section>

      {/* Missions Detail */}
      {missions.map((mission, index) => (
        <section 
          key={mission.id} 
          id={mission.id}
          className={`section ${index % 2 === 0 ? 'bg-beige-light/20' : 'bg-white'}`}
        >
          <div className="container-custom">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div>
                <div className="flex items-center mb-4">
                  {mission.icon}
                  <h2 className="text-3xl font-bold text-green-medium ml-3">{mission.title}</h2>
                </div>
                
                <p className="mb-6 text-lg">{mission.description}</p>
                
                <h3 className="text-xl font-semibold mb-4 text-green-medium">Nos actions :</h3>
                <ul className="space-y-3 mb-6">
                  {mission.actions.map((action, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="flex-shrink-0 w-5 h-5 text-yellow-400 mt-1" />
                      <span className="ml-2">{action}</span>
                    </li>
                  ))}
                </ul>
                
                <Button to="/projets-programmes" variant="primary">
                  Voir les projets associés
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={mission.image} 
                  alt={mission.title} 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* Call to Action */}
      <section className="py-16 bg-green-forest text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Participez à nos missions</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white">
            Vous souhaitez contribuer à la transition écologique du Gabon ? Découvrez nos opportunités de collaboration et nos appels à projets.
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

export default Missions;