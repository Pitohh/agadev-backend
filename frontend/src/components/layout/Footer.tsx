import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and brief description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <img src="/agadev-logo.png" alt="AGADEV" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-white/80">
              Agence Gabonaise pour le Développement de l'Économie Verte. Transformer notre capital naturel en opportunité pour demain.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-beige-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:contact@agadev.ga" 
                className="text-white hover:text-beige-light transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/a-propos" className="text-white/80 hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/nos-missions" className="text-white/80 hover:text-white transition-colors">Nos missions</Link></li>
              <li><Link to="/projets-programmes" className="text-white/80 hover:text-white transition-colors">Projets & Programmes</Link></li>
              <li><Link to="/ressources" className="text-white/80 hover:text-white transition-colors">Ressources</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-white/80">La Sablière, Résidence Les Paletuviers, Immeuble B, B402</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-white/80">065 65 89 88 / 074 65 89 88</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:infos@agadev-gabon.com" className="text-white/80 hover:text-white transition-colors">
                  infos@agadev-gabon.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter (placeholder) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">Restez informé</h4>
            <p className="text-sm text-white/80">
              Inscrivez-vous à notre newsletter pour recevoir nos actualités et informations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 text-blue-black rounded-md focus:outline-none focus:ring-2 focus:ring-beige-light"
              />
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-black px-4 py-2 rounded-md transition-colors font-medium">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="pt-6 mt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-white/70">
            &copy; {currentYear} AGADEV. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-sm text-white/70">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;