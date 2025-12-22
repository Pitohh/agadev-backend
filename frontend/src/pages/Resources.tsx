import React, { useState } from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { FileText, Download, PlusCircle, MinusCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const Resources = () => {
  const bannerImage = "/foret-gabonaise-7.jpg.jpg";
  
  // Documents for download
  const documents = [
    {
      title: "Rapport annuel 2024-2025",
      description: "Bilan des activités de l'AGADEV pour l'année fiscale 2024-2025",
      type: "PDF",
      size: "3.2 MB",
      category: "Rapports",
      url: "#"
    },
    {
      title: "Stratégie Nationale pour l'Économie Verte 2025-2030",
      description: "Document cadre présentant la vision du Gabon pour le développement de l'économie verte",
      type: "PDF",
      size: "5.7 MB",
      category: "Documents officiels",
      url: "#"
    },
    {
      title: "Guide des crédits carbone pour les porteurs de projet",
      description: "Guide méthodologique pour le développement de projets carbone au Gabon",
      type: "PDF",
      size: "2.1 MB",
      category: "Guides",
      url: "#"
    },
    {
      title: "Étude sur la biodiversité gabonaise",
      description: "Inventaire des espèces et écosystèmes du Gabon et leur potentiel économique",
      type: "PDF",
      size: "8.3 MB",
      category: "Études",
      url: "#"
    },
    {
      title: "Formulaire de soumission de projet",
      description: "Document à remplir pour soumettre un projet à l'AGADEV",
      type: "DOCX",
      size: "1.5 MB",
      category: "Formulaires",
      url: "#"
    },
    {
      title: "Présentation de l'AGADEV",
      description: "Présentation générale de l'agence, sa mission et ses activités",
      type: "PDF",
      size: "4.2 MB",
      category: "Documents officiels",
      url: "#"
    }
  ];
  
  // FAQ data
  const faqItems = [
    {
      question: "Qu'est-ce qu'un crédit carbone ?",
      answer: "Un crédit carbone est une unité représentant la réduction ou l'élimination d'une tonne d'équivalent CO2 de l'atmosphère. Ces crédits sont générés par des projets qui réduisent les émissions de gaz à effet de serre ou augmentent la séquestration du carbone, comme la protection des forêts ou le reboisement. Ils peuvent être achetés par des entreprises ou des gouvernements pour compenser leurs propres émissions."
    },
    {
      question: "Comment l'AGADEV peut-elle m'aider à développer un projet vert ?",
      answer: "L'AGADEV propose un accompagnement complet pour les porteurs de projets verts, incluant : conseil technique, mise en relation avec des investisseurs et partenaires potentiels, accès à des financements spécifiques, aide à la certification pour les projets carbone, et soutien administratif pour les démarches réglementaires. Contactez-nous via notre formulaire en ligne ou par email pour discuter de votre projet."
    },
    {
      question: "Comment soumettre un projet à l'AGADEV ?",
      answer: "Pour soumettre un projet à l'AGADEV, téléchargez le formulaire de soumission disponible dans la section Ressources de notre site, complétez-le avec les informations demandées (description, objectifs, budget, impact attendu), et envoyez-le à infos@agadev-gabon.com. Notre équipe l'examinera et vous contactera pour discuter des prochaines étapes. Vous pouvez également nous contacter directement pour un accompagnement dans la préparation de votre dossier."
    },
    {
      question: "Quels types de projets sont éligibles aux financements verts ?",
      answer: "Les projets éligibles aux financements verts incluent généralement : les projets d'énergies renouvelables (solaire, biomasse), l'efficacité énergétique, la gestion durable des forêts, la reforestation, l'agriculture durable, la gestion des déchets et de l'eau, l'écotourisme, et les solutions basées sur la nature. L'AGADEV privilégie les projets qui démontrent un impact positif sur l'environnement, créent des emplois locaux et contribuent aux objectifs de développement durable."
    },
    {
      question: "Comment l'AGADEV monétise-t-elle les crédits carbone du Gabon ?",
      answer: "L'AGADEV monétise les crédits carbone du Gabon à travers plusieurs mécanismes : certification des réductions d'émissions selon des standards internationaux reconnus (Verra, Gold Standard), négociation d'accords bilatéraux avec des pays développés, vente sur les marchés volontaires du carbone, et développement de partenariats avec des entreprises cherchant à compenser leurs émissions. Les revenus générés sont ensuite investis dans des projets de conservation et de développement durable au Gabon."
    }
  ];
  
  // State for expanded FAQ items
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Ressources"
        subtitle="Accédez à nos documents, guides et informations sur l'économie verte"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Downloads Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Documents à télécharger" 
            subtitle="Retrouvez ici nos rapports, guides et autres documents utiles"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="bg-beige-light/20 rounded-lg overflow-hidden shadow-sm border border-beige-light/50">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <FileText className="text-green-medium w-5 h-5 mr-2" />
                      <span className="text-xs font-medium px-2 py-1 rounded bg-beige-light/40 text-blue-black/70">{doc.category}</span>
                    </div>
                    <span className="text-xs text-blue-black/60">{doc.type} • {doc.size}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-green-forest">{doc.title}</h3>
                  <h3 className="text-lg font-semibold mb-2 text-green-medium">{doc.title}</h3>
                  <p className="text-blue-black/80 text-sm mb-4">{doc.description}</p>
                  <a 
                    href={doc.url} 
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <SectionTitle 
            title="Foire aux questions" 
            subtitle="Réponses aux questions fréquemment posées sur l'AGADEV et l'économie verte"
            center={true}
          />
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm text-left transition-colors hover:bg-beige-light/10"
                >
                  <span className="font-medium text-lg text-green-forest">{faq.question}</span>
                  <span className="font-medium text-lg text-green-medium">{faq.question}</span>
                  {expandedFaqs.includes(index) ? (
                    <MinusCircle className="flex-shrink-0 w-5 h-5 text-yellow-400" />
                  ) : (
                    <PlusCircle className="flex-shrink-0 w-5 h-5 text-green-medium" />
                  )}
                </button>
                
                {expandedFaqs.includes(index) && (
                  <div className="p-4 bg-white rounded-b-lg shadow-sm border-t border-beige-light/30">
                    <p className="text-blue-black/80">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Ressources externes" 
            subtitle="Liens vers des sites et documents utiles sur l'économie verte"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-beige-light rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-medium">Plateformes internationales</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://www.unep.org/fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Programme des Nations Unies pour l'Environnement (PNUE)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.unccd.int/fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Convention des Nations Unies sur la lutte contre la désertification
                  </a>
                </li>
                <li>
                  <a 
                    href="https://unfccc.int/fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Convention-cadre des Nations Unies sur les changements climatiques
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.greenclimate.fund/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Fonds vert pour le climat
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border border-beige-light rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-medium">Textes législatifs et rapports</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Code forestier du Gabon
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Contribution Déterminée au niveau National (CDN) du Gabon
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Plan National Climat du Gabon
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Rapport sur l'état des forêts du bassin du Congo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section bg-green-forest text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="mb-8 text-lg text-white">
              Abonnez-vous à notre newsletter pour recevoir régulièrement les dernières ressources, études et actualités sur l'économie verte au Gabon.
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

export default Resources;