import React from 'react';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const bannerImage = "/foret-gabonaise-8.jpg.jpg";
  
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();
  
  const onSubmit = (data: ContactFormData) => {
    // In a real application, this would send the form data to a server
    console.log(data);
    alert("Votre message a été envoyé avec succès. Nous vous répondrons dans les meilleurs délais.");
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner 
        title="Contactez-nous"
        subtitle="Notre équipe est à votre disposition pour répondre à vos questions"
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Contact Form and Info */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionTitle 
                title="Envoyez-nous un message" 
                subtitle="Nous vous répondrons dans les meilleurs délais"
              />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-blue-black/80 mb-1">Nom complet</label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.name ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder="Votre nom"
                    {...register("name", { required: "Ce champ est obligatoire" })}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-blue-black/80 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.email ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder="Votre email"
                    {...register("email", { 
                      required: "Ce champ est obligatoire",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-blue-black/80 mb-1">Sujet</label>
                  <input
                    id="subject"
                    type="text"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.subject ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder="Sujet de votre message"
                    {...register("subject", { required: "Ce champ est obligatoire" })}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-blue-black/80 mb-1">Message</label>
                  <textarea
                    id="message"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.message ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder="Votre message"
                    rows={5}
                    {...register("message", { required: "Ce champ est obligatoire" })}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                
                <Button type="submit" variant="primary" className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <SectionTitle 
                title="Nos coordonnées" 
                subtitle="Plusieurs façons de nous contacter"
              />
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                    <p className="text-blue-black/80">
                      La Sablière<br />
                      Résidence Les Paletuviers<br />
                      Immeuble B, B402
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-blue-black/80">
                      <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        infos@agadev-gabon.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                    <p className="text-blue-black/80">
                      <a href="tel:+24106565898" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        065 65 89 88 / 074 65 89 88
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Horaires d'ouverture</h3>
                    <p className="text-blue-black/80">
                      Lundi - Vendredi: 8h00 - 16h30<br />
                      Fermé les week-ends et jours fériés
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map placeholder - In a real site, this would be an interactive map */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                <div className="bg-beige-light/40 h-[300px] flex items-center justify-center">
                  <p className="text-blue-black/60">Carte interactive (à venir)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section bg-beige-light/30 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-green-medium mb-6">Des questions spécifiques ?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Notre équipe d'experts est disponible pour répondre à vos questions sur nos programmes, les opportunités de financement ou les partenariats potentiels.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <h3 className="font-semibold text-lg mb-3 text-green-medium">Questions sur les projets</h3>
              <p className="mb-4 text-blue-black/80">Pour toute question concernant nos projets en cours ou futurs.</p>
              <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                infos@agadev-gabon.com
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <h3 className="font-semibold text-lg mb-3 text-green-medium">Partenariats</h3>
              <p className="mb-4 text-blue-black/80">Pour discuter d'opportunités de collaboration avec l'AGADEV.</p>
              <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                infos@agadev-gabon.com
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <h3 className="font-semibold text-lg mb-3 text-green-medium">Recrutement</h3>
              <p className="mb-4 text-blue-black/80">Pour postuler ou se renseigner sur nos offres d'emploi.</p>
              <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                infos@agadev-gabon.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;