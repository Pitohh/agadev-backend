import React, { useState, useEffect } from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { Calendar } from 'lucide-react';
import Button from '../components/ui/Button';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  image: string;
  publication_date: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

const News = () => {
  const bannerImage = "/foret-gabonaise-5.jpg.jpg";
  
  // All available tags
  const allTags = ["Tous", "Événements", "Projets", "Partenariats", "International", "Formation"];
  const [activeTag, setActiveTag] = useState("Tous");
  
  // Mock data for news articles
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Lancement officiel de l'AGADEV",
      content: "L'Agence Gabonaise pour le Développement de l'Économie Verte a été officiellement lancée par le Président de la République. Cette nouvelle institution marque un tournant dans la stratégie environnementale du Gabon.\n\nL'AGADEV aura pour mission principale de valoriser le capital naturel du pays et de promouvoir l'investissement vert. Cette création s'inscrit dans la vision du gouvernement de faire du Gabon un leader de l'économie verte en Afrique centrale.",
      image: "/foret-gabonaise-6.jpg.jpg",
      publication_date: "2025-01-15",
      created_at: "2025-01-15",
      updated_at: "2025-01-15",
      tags: ["Événements"]
    },
    {
      id: 2,
      title: "Signature d'un partenariat stratégique avec le CENAREST",
      content: "L'AGADEV et le Centre National de la Recherche Scientifique et Technologique (CENAREST) ont signé un accord de partenariat pour renforcer la recherche dans le domaine de l'économie verte.\n\nCe partenariat permettra de développer des projets de recherche innovants sur la biodiversité gabonaise et les technologies vertes. Les deux institutions collaboreront également sur la formation de jeunes chercheurs spécialisés dans l'environnement.",
      image: "/foret-gabonaise-7.jpg.jpg",
      publication_date: "2025-02-03",
      created_at: "2025-02-03",
      updated_at: "2025-02-03",
      tags: ["Partenariats", "Projets"]
    },
    {
      id: 3,
      title: "Participation à la COP30 à Belém",
      content: "L'AGADEV représentera le Gabon lors de la 30ème Conférence des Parties sur les changements climatiques qui se tiendra à Belém, au Brésil.\n\nLa délégation gabonaise présentera les avancées du pays en matière de conservation forestière et de développement de l'économie verte. Cette participation s'inscrit dans la stratégie de positionnement du Gabon comme leader régional de la transition écologique.",
      image: "/foret-gabonaise-8.jpg.jpg",
      publication_date: "2025-03-07",
      created_at: "2025-03-07",
      updated_at: "2025-03-07",
      tags: ["International", "Événements"]
    }
  ];
  
  const filteredArticles = activeTag === "Tous" 
    ? newsArticles 
    : newsArticles.filter(article => article.tags?.includes(activeTag));

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Actualités"
        subtitle="Suivez les dernières nouvelles et événements de l'AGADEV"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* News Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Dernières actualités" 
            subtitle="Restez informé des activités et réalisations de l'AGADEV"
          />
          
          {/* Filter tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-green-medium text-white'
                    : 'bg-beige-light/50 text-blue-black hover:bg-beige-light'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* News Articles */}
          <div className="space-y-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="h-48 md:h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-blue-black/60 mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(article.publication_date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-green-forest">{article.title}</h3>
                    <h3 className="text-2xl font-bold mb-3 text-green-medium">{article.title}</h3>
                    <p className="text-blue-black/80 mb-4">{article.content.substring(0, 200)}...</p>
                    
                    {/* Article content */}
                    <details className="group">
                      <summary className="text-copper hover:text-copper/80 transition-colors cursor-pointer font-medium list-none">
                        Lire la suite →
                      </summary>
                      <div className="mt-4 pt-4 border-t border-beige-light/50">
                        <p className="text-blue-black/80 whitespace-pre-line">{article.content}</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-blue-black/70">Aucune actualité ne correspond à ce filtre.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section bg-green-forest text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="mb-8 text-lg text-white">
              Abonnez-vous à notre newsletter pour recevoir régulièrement nos dernières actualités et informations sur nos projets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-4 py-3 rounded-md text-blue-black focus:outline-none focus:ring-2 focus:ring-beige-light w-full sm:w-auto"
              />
              <Button variant="secondary">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;