import React, { useState } from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Projects = () => {
  const bannerImage = "/foret-gabonaise-9.jpg.jpg";
  
  // Filter categories
  const categories = ["Tous", "En cours", "Réalisés", "Reforestation", "Carbone", "Biodiversité", "Innovation"];
  const [activeFilter, setActiveFilter] = useState("Tous");
  
  // Project data
  const projects = [
    {
      title: "Inventaire forestier national",
      description: "Cartographie complète des ressources forestières du Gabon pour mieux comprendre et gérer notre capital naturel.",
      status: "En cours",
      category: ["Biodiversité"],
      imageSrc: "/foret-gabonaise-1.jpg.jpg"
    },
    {
      title: "Reforestation du bassin du Komo",
      description: "Restauration de 1000 hectares de zones dégradées par la plantation d'essences locales et création d'emplois verts.",
      status: "En cours",
      category: ["Reforestation"],
      imageSrc: "/foret-gabonaise-2.jpg.jpg"
    },
    {
      title: "Certification carbone des forêts communautaires",
      description: "Accompagnement des communautés locales pour la certification de leurs forêts sur le marché volontaire du carbone.",
      status: "En cours",
      category: ["Carbone"],
      imageSrc: "/foret-gabonaise-3.jpg.jpg"
    },
    {
      title: "Plateforme numérique de suivi carbone",
      description: "Développement d'une solution technologique pour le suivi en temps réel des stocks de carbone dans les forêts gabonaises.",
      status: "En cours",
      category: ["Innovation", "Carbone"],
      imageSrc: "/foret-gabonaise-4.jpg.jpg"
    },
    {
      title: "Étude de la biodiversité du Parc National de la Lopé",
      description: "Recensement des espèces animales et végétales pour valoriser la richesse biologique du parc.",
      status: "Réalisé",
      category: ["Biodiversité"],
      imageSrc: "/foret-gabonaise-5.jpg.jpg"
    },
    {
      title: "Restauration de mangroves à Port-Gentil",
      description: "Projet pilote de restauration des écosystèmes côtiers pour lutter contre l'érosion et séquestrer du carbone.",
      status: "Réalisé",
      category: ["Reforestation", "Carbone"],
      imageSrc: "/foret-gabonaise-6.jpg.jpg"
    }
  ];
  
  const filteredProjects = projects.filter(project => {
    if (activeFilter === "Tous") return true;
    if (activeFilter === "En cours" || activeFilter === "Réalisés") return project.status === activeFilter;
    return project.category.includes(activeFilter);
  });

  // Strategic partners
  const partners = [
    {
      name: "CENAREST",
      description: "Collaboration sur des projets de recherche scientifique et d'inventaire de la biodiversité.",
    },
    {
      name: "Programme des Nations Unies pour le Développement (PNUD)",
      description: "Partenariat pour le renforcement des capacités et le financement de projets d'économie verte.",
    },
    {
      name: "Banque Africaine de Développement",
      description: "Financement d'infrastructures vertes et de projets d'adaptation au changement climatique.",
    },
    {
      name: "Coalition for Rainforest Nations",
      description: "Collaboration pour la valorisation des crédits carbone sur les marchés internationaux.",
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Projets et Programmes"
        subtitle="Découvrez les initiatives concrètes de l'AGADEV pour développer l'économie verte au Gabon"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Projects Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Nos projets" 
            subtitle="L'AGADEV met en œuvre des projets innovants pour valoriser le capital naturel du Gabon"
          />
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-green-medium text-white'
                    : 'bg-beige-light/50 text-blue-black hover:bg-beige-light'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                imageAlt={project.title}
                className="h-full"
              />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-blue-black/70">Aucun projet ne correspond à ce filtre.</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Map Placeholder */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <SectionTitle 
            title="Carte des projets" 
            subtitle="Visualisez la répartition géographique de nos projets au Gabon"
            center={true}
          />
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-blue-black/70 mb-4">
              Cette section présentera prochainement une carte interactive des projets de l'AGADEV à travers le Gabon.
            </p>
            <div className="aspect-video max-w-4xl mx-auto bg-beige-light/50 rounded-lg flex items-center justify-center">
              <p className="text-blue-black/50 text-lg">Carte interactive des projets (à venir)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Partenariats stratégiques" 
            subtitle="L'AGADEV collabore avec des institutions nationales et internationales pour maximiser son impact"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="p-6 border border-beige-light rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-green-medium">{partner.name}</h3>
                <p className="text-blue-black/80">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="section bg-green-forest text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Témoignage</h2>
            <blockquote className="text-xl italic mb-6">
              "L'approche innovante de l'AGADEV pour valoriser le capital naturel du Gabon représente un modèle prometteur pour toute l'Afrique. Leur travail démontre qu'il est possible de concilier développement économique et préservation de l'environnement."
            </blockquote>
            <div className="font-semibold">
              <p className="text-white font-semibold">Dr. Carlos Mendes</p>
              <p className="text-white/80 text-sm">Directeur régional, Programme des Nations Unies pour l'Environnement</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section bg-beige-light/40 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-green-medium mb-6">Vous avez un projet innovant ?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            L'AGADEV est constamment à la recherche de nouveaux partenaires et projets innovants dans le domaine de l'économie verte.
          </p>
          <Button to="/contact" variant="primary" size="lg">
            Proposer un projet
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;