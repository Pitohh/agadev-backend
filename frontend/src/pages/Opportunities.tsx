import React, { useState } from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { Download, Calendar, MapPin, Clock, Briefcase } from 'lucide-react';

const Opportunities = () => {
  const bannerImage = "/foret-gabonaise-8.jpg.jpg";
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'projects' | 'jobs'>('projects');
  
  // Project calls data
  const projectCalls = [
    {
      title: "Appel à projets : Solutions innovantes pour la gestion durable des déchets",
      description: "L'AGADEV lance un appel à projets pour identifier et soutenir des initiatives innovantes dans le domaine de la gestion et valorisation des déchets au Gabon.",
      deadline: "30 juin 2025",
      eligibility: "Entreprises, associations, collectivités locales",
      funding: "Jusqu'à 50 000 000 FCFA par projet",
      applicationUrl: "#"
    },
    {
      title: "Programme de soutien aux startups vertes",
      description: "Un programme d'accompagnement technique et financier pour les jeunes entreprises gabonaises développant des solutions dans le domaine de l'économie verte.",
      deadline: "15 juillet 2025",
      eligibility: "Startups gabonaises de moins de 3 ans",
      funding: "Accompagnement technique + financement jusqu'à 25 000 000 FCFA",
      applicationUrl: "#"
    },
    {
      title: "Appel à manifestation d'intérêt : Projets d'énergie renouvelable en zone rurale",
      description: "L'AGADEV recherche des partenaires pour développer des solutions d'accès à l'énergie renouvelable dans les zones rurales du Gabon.",
      deadline: "31 août 2025",
      eligibility: "Entreprises nationales et internationales, consortiums",
      funding: "Co-financement jusqu'à 200 000 000 FCFA",
      applicationUrl: "#"
    }
  ];
  
  // Job offers data
  const jobOffers = [
    {
      title: "Spécialiste en certification carbone",
      description: "Vous serez chargé(e) de développer et mettre en œuvre des projets de certification carbone selon les standards internationaux (Verra, Gold Standard).",
      location: "Libreville",
      type: "CDI",
      requirements: "Diplôme Bac+5 en environnement, foresterie ou équivalent. Expérience de 3 ans minimum dans le domaine des crédits carbone.",
      applicationDeadline: "15 juin 2025"
    },
    {
      title: "Chargé(e) de projets développement durable",
      description: "Vous serez responsable de la coordination et du suivi de projets liés à l'économie verte, en collaboration avec les partenaires nationaux et internationaux.",
      location: "Libreville",
      type: "CDI",
      requirements: "Diplôme Bac+4/5 en gestion de projets, développement durable ou équivalent. Expérience de 2 ans dans la gestion de projets environnementaux.",
      applicationDeadline: "30 juin 2025"
    },
    {
      title: "Juriste spécialisé(e) en droit de l'environnement",
      description: "Vous apporterez votre expertise juridique sur les questions relatives au droit de l'environnement, aux contrats de crédits carbone et aux partenariats internationaux.",
      location: "Libreville",
      type: "CDI",
      requirements: "Diplôme Bac+5 en droit, spécialisation en droit de l'environnement. Expérience de 5 ans dans le domaine juridique.",
      applicationDeadline: "10 juillet 2025"
    },
    {
      title: "Chargé(e) de communication",
      description: "Vous serez responsable de la communication externe et interne de l'AGADEV, incluant la gestion des réseaux sociaux et l'organisation d'événements.",
      location: "Libreville",
      type: "CDI",
      requirements: "Diplôme Bac+3/4 en communication. Expérience de 2 ans en communication institutionnelle. Excellentes compétences rédactionnelles.",
      applicationDeadline: "5 juillet 2025"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Opportunités"
        subtitle="Découvrez nos appels à projets et offres d'emploi"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Tabs */}
      <section className="bg-white pt-8">
        <div className="container-custom">
          <div className="flex border-b border-beige-light">
            <button
              className={`pb-4 px-6 font-medium text-lg transition-colors ${
                activeTab === 'projects' 
                  ? 'text-green-medium border-b-2 border-green-medium' 
                  : 'text-blue-black/70 hover:text-green-medium'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Appels à projets
            </button>
            <button
              className={`pb-4 px-6 font-medium text-lg transition-colors ${
                activeTab === 'jobs' 
                  ? 'text-green-medium border-b-2 border-green-medium' 
                  : 'text-blue-black/70 hover:text-green-medium'
              }`}
              onClick={() => setActiveTab('jobs')}
            >
              Offres d'emploi
            </button>
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      <section className="section bg-white pb-16">
        <div className="container-custom">
          {activeTab === 'projects' && (
            <div>
              <SectionTitle 
                title="Appels à projets en cours" 
                subtitle="Proposez vos projets innovants dans le domaine de l'économie verte"
              />
              
              <div className="space-y-8">
                {projectCalls.map((call, index) => (
                  <div key={index} className="bg-white border border-beige-light rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-green-medium">{call.title}</h3>
                      <p className="text-blue-black/80 mb-4">{call.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-beige-light/20 p-3 rounded">
                          <p className="font-semibold text-green-medium">Date limite</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                            <span>{call.deadline}</span>
                          </div>
                        </div>
                        
                        <div className="bg-beige-light/20 p-3 rounded">
                          <p className="font-semibold text-green-medium">Éligibilité</p>
                          <p className="mt-1">{call.eligibility}</p>
                        </div>
                        
                        <div className="bg-beige-light/20 p-3 rounded">
                          <p className="font-semibold text-green-medium">Financement</p>
                          <p className="mt-1">{call.funding}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <Button href={call.applicationUrl} variant="primary">
                          Postuler
                        </Button>
                        <Button href="#" variant="outline" className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger le dossier
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* How to apply */}
              <div className="mt-12 bg-beige-light/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-medium">Comment soumettre un projet ?</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>Téléchargez le dossier d'appel à projets correspondant à votre thématique</li>
                  <li>Remplissez le formulaire de candidature en détaillant votre projet</li>
                  <li>Joignez les pièces justificatives demandées (business plan, CV, etc.)</li>
                  <li>Soumettez votre dossier complet via le formulaire en ligne ou par email à projets@agadev.ga avant la date limite</li>
                </ol>
                <p className="mt-4 text-blue-black/80">
                  Pour toute question concernant les appels à projets, veuillez contacter notre équipe à infos@agadev-gabon.com.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'jobs' && (
            <div>
              <SectionTitle 
                title="Offres d'emploi" 
                subtitle="Rejoignez notre équipe et contribuez au développement de l'économie verte au Gabon"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOffers.map((job, index) => (
                  <div key={index} className="bg-white border border-beige-light rounded-lg shadow-md overflow-hidden h-full">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-green-medium">{job.title}</h3>
                        <span className="bg-green-medium/10 text-green-medium text-xs px-2 py-1 rounded">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-blue-black/70">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Limite: {job.applicationDeadline}</span>
                        </div>
                      </div>
                      
                      <p className="text-blue-black/80 mb-4">{job.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-green-medium flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" /> Profil recherché
                        </h4>
                        <p className="text-blue-black/80 text-sm">{job.requirements}</p>
                      </div>
                      
                      <Button href="#" variant="primary">
                        Postuler
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* General application */}
              <div className="mt-12 bg-beige-light/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-medium">Candidature spontanée</h3>
                <p className="mb-6">
                  Vous ne trouvez pas d'offre correspondant à votre profil, mais souhaitez rejoindre l'AGADEV ? N'hésitez pas à nous envoyer une candidature spontanée.
                </p>
                <Button href="mailto:infos@agadev-gabon.com" variant="primary">
                  Envoyer une candidature spontanée
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Internships */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Programme de stages" 
                subtitle="L'AGADEV offre des opportunités de stages pour les étudiants et jeunes diplômés"
              />
              
              <p className="mb-4">
                Nous proposons régulièrement des stages dans différents domaines : gestion de projets environnementaux, certification carbone, communication, juridique, etc.
              </p>
              
              <p className="mb-6">
                Nos stages, d'une durée de 3 à 6 mois, permettent aux jeunes talents d'acquérir une expérience pratique dans le secteur de l'économie verte et de contribuer à des projets concrets.
              </p>
              
              <Button href="mailto:infos@agadev-gabon.com" variant="primary">
                Candidater pour un stage
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="/foret-gabonaise-9.jpg.jpg" 
                alt="Stagiaires de l'AGADEV" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-green-medium">Ils nous ont rejoints</h2>
            <blockquote className="text-xl italic mb-6 text-blue-black/80">
              "Rejoindre l'AGADEV a été une décision qui a transformé ma carrière. Ici, j'ai l'opportunité de travailler sur des projets innovants qui ont un impact réel sur l'environnement et les communautés locales. L'ambiance de travail est stimulante et l'équipe passionnée."
            </blockquote>
            <div className="font-semibold">
              <p>Marcel Nzamba</p>
              <p className="text-blue-black/60 text-sm">Chargé de projets - AGADEV</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Opportunities;