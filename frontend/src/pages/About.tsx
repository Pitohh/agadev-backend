import React from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { CheckCircle2, Clock, FileText, Award } from 'lucide-react';

const About = () => {
  const bannerImage = "/foret-gabonaise-6.jpg.jpg";
  
  const values = [
    { 
      icon: <CheckCircle2 className="w-8 h-8 text-green-forest" />, 
      title: "Durabilité", 
      description: "Nous promouvons un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à satisfaire leurs propres besoins." 
    },
    { 
      icon: <Award className="w-8 h-8 text-green-forest" />, 
      title: "Excellence", 
      description: "Nous visons l'excellence dans toutes nos actions et projets, en nous appuyant sur des données scientifiques et les meilleures pratiques internationales." 
    },
    { 
      icon: <FileText className="w-8 h-8 text-green-forest" />, 
      title: "Transparence", 
      description: "Nous agissons avec intégrité et transparence dans la gestion de nos projets et dans nos relations avec toutes nos parties prenantes." 
    },
    { 
      icon: <Clock className="w-8 h-8 text-green-forest" />, 
      title: "Innovation", 
      description: "Nous encourageons l'innovation et la créativité dans la recherche de solutions durables aux défis environnementaux et économiques." 
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="À propos de l'AGADEV"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle 
                title="Qui sommes-nous ?" 
                subtitle="L'AGADEV a été créée pour valoriser le capital naturel du Gabon"
              />
              <p className="mb-4">
                L'Agence Gabonaise pour le Développement de l'Économie Verte (AGADEV) est un établissement public à caractère industriel et commercial, créé en janvier 2025, sous la tutelle du Ministère de l'Économie du Gabon.
              </p>
              <p className="mb-4">
                Notre mission principale est de valoriser le capital naturel du Gabon et de promouvoir l'investissement vert, positionnant ainsi le pays comme un acteur majeur de la transition écologique en Afrique centrale.
              </p>
              <p className="mb-4">
                L'AGADEV joue un rôle crucial dans la stratégie nationale du Gabon pour concilier développement économique et préservation de l'environnement, notamment à travers la gestion des crédits carbone et la promotion de projets innovants.
              </p>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/foret-gabonaise-7.jpg.jpg" 
                  alt="Forêt gabonaise" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-y-1/4 -translate-x-1/4 bg-white p-4 rounded-lg shadow-lg w-40 md:w-60 z-10">
                <div className="text-center">
                  <p className="font-semibold text-green-medium">85% du territoire</p>
                  <p className="text-sm text-blue-black/70">couvert de forêts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-medium mb-4">Notre vision</h3>
              <p className="mb-2">
                Faire du Gabon un modèle de développement économique durable en Afrique, où la croissance économique va de pair avec la préservation de l'environnement et l'amélioration du bien-être des populations.
              </p>
              <p>
                Nous aspirons à un Gabon où le capital naturel est pleinement valorisé et contribue significativement à la prospérité nationale.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-medium mb-4">Notre mission</h3>
              <p className="mb-2">
                Mettre en oeuvre la stratégie nationale pour l'économie verte en mobilisant tous les acteurs concernés : pouvoirs publics, secteur privé, société civile et partenaires internationaux.
              </p>
              <p>
                Promouvoir l'adoption de pratiques durables dans tous les secteurs économiques et faciliter l'accès aux financements verts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Nos valeurs" 
            subtitle="Les principes qui guident notre action au quotidien"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex space-x-4 p-6 bg-beige-light/20 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="text-green-medium">{value.icon}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-green-medium">{value.title}</h3>
                  <p className="text-blue-black/80">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <SectionTitle 
            title="Notre direction" 
            center={true}
          />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-3xl mx-auto">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3">
                <img 
                  src="/directrice-generale.webp" 
                  alt="Scyrielle Sende Etali" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <p className="text-sm font-semibold text-yellow-400 mb-1">Directrice Générale</p>
                <h3 className="text-2xl font-bold mb-3">Scyrielle Sende Etali</h3>
                <p className="text-blue-black/80 mb-4">
                  Titulaire d'un doctorat en économie environnementale de l'Université de Cambridge et forte d'une expérience de 15 ans dans la gestion de projets environnementaux internationaux, Scyrielle Sende Etali dirige l'AGADEV depuis sa création en janvier 2025.
                </p>
                <p className="text-blue-black/80">
                  Sous sa direction, l'AGADEV s'est engagée à transformer le capital naturel du Gabon en un véritable moteur de croissance économique durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Cadre juridique" 
            subtitle="L'AGADEV s'inscrit dans un cadre légal solide"
          />
          
          <div className="bg-beige-light/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-medium">Textes fondateurs</h3>
            <ul className="list-disc pl-6 space-y-3 text-blue-black/90">
              <li>
                <strong>Décret n°001/PR/MEDD du 10 janvier 2025</strong> - Portant création, organisation et fonctionnement de l'Agence Gabonaise pour le Développement de l'Économie Verte
              </li>
              <li>
                <strong>Loi n°024/2024 du 5 décembre 2024</strong> - Relative à l'économie verte et au développement durable au Gabon
              </li>
              <li>
                <strong>Arrêté n°0035/MEDD/CAB du 15 janvier 2025</strong> - Portant nomination des membres du Conseil d'Administration de l'AGADEV
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;