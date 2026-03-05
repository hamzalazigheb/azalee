import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function ConditionsGeneralesPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Conditions générales d'utilisation
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique 
                des modalités de mise à disposition du site et des services par <strong>Azalée Patrimoine</strong> et de définir les 
                conditions d'accès et d'utilisation des services par « l'Utilisateur ».
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Les présentes CGU sont accessibles sur le site à la rubrique «CGU».
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni restriction des 
                présentes CGU par l'utilisateur. Lors de l'inscription sur le site via le Formulaire d'inscription, chaque 
                utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : « 
                Je reconnais avoir lu et compris les CGU et je les accepte ».
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de 
                renoncer à l'accès des services proposés par le site.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>www.azalee-patrimoine.fr</strong> se réserve le droit de modifier unilatéralement et à tout moment le contenu 
                des présentes CGU.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 1 : Les mentions légales</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'édition du site <strong>www.azalee-patrimoine.fr</strong> est assurée par la Société SASU Azalée Patrimoine au 
                capital de 8000 euros, immatriculée au RCS de PARIS sous le numéro 790419949, dont le siège 
                social est situé au <strong>106 RUE DE RICHELIEU, 75002 PARIS</strong>
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Numéro de téléphone :</strong> 01 53 45 85 00</li>
                  <li><strong>Adresse e-mail :</strong> contact@azalee-patrimoine.fr</li>
                </ul>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'hébergeur du site <strong>www.azalee-patrimoine.fr</strong> est la société <strong>Amazon Web Services (AWS)</strong>, dont le 
                siège social est situé au 410 Terry Ave. North Seattle.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 2 : Accès au site</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le site <strong>www.azalee-patrimoine.fr</strong> permet à l'Utilisateur un accès gratuit aux services suivants :
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les 
                frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion 
                Internet, etc.) sont à sa charge.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s'inscrire en 
                remplissant le formulaire. En acceptant de s'inscrire aux services réservés, l'Utilisateur membre 
                s'engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées, 
                notamment son adresse email.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Pour accéder aux services, l'Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de son mot 
                de passe qui lui seront communiqués après son inscription.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en se 
                rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai raisonnable.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site 
                ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage 
                pas la responsabilité de <strong>www.azalee-patrimoine.fr</strong>. Dans ces cas, l'Utilisateur accepte ainsi ne pas 
                tenir rigueur à l'éditeur de toute interruption ou suspension de service, même sans préavis.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l'adresse email de 
                l'éditeur communiqué à l'ARTICLE 1.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 3 : Collecte des données</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect 
                de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers 
                et aux libertés.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit 
                d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur 
                exerce ce droit :
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <ul className="space-y-2 text-gray-700">
                  <li>• par mail à l'adresse email <strong>contact@azalee-patrimoine.fr</strong></li>
                  <li>• par voie postale au 106 rue de Richelieu 75002 Paris</li>
                  <li>• via un formulaire de contact</li>
                  <li>• via son espace personnel</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 4 : Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet 
                d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie 
                des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement 
                privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l'autorisation 
                expresse de l'exploitant du site Internet constituerait une contrefaçon sanctionnée par l'article L 335-2 
                et suivants du Code de la propriété intellectuelle.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Il est rappelé conformément à l'article L122-5 du Code de propriété intellectuelle que l'Utilisateur qui 
                reproduit, copie ou publie le contenu protégé doit citer l'auteur et sa source.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 5 : Responsabilité</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Les sources des informations diffusées sur le site <strong>www.azalee-patrimoine.fr</strong> sont réputées fiables 
                mais le site ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. 
                Malgré des mises à jour régulières, le site <strong>www.azalee-patrimoine.fr</strong> ne peut être tenu responsable de 
                la modification des dispositions administratives et juridiques survenant après la publication. De même, 
                le site ne peut être tenue responsable de l'utilisation et de l'interprétation de l'information contenue 
                dans ce site.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle 
                que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son identifiant et mot de 
                passe. Le site décline toute responsabilité.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Le site <strong>www.azalee-patrimoine.fr</strong> ne peut être tenu pour responsable d'éventuels virus qui pourraient 
                infecter l'ordinateur ou tout matériel informatique de l'Internaute, suite à une utilisation, à l'accès, ou 
                au téléchargement provenant de ce site.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et 
                insurmontable d'un tiers.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 6 : Liens hypertextes</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Des liens hypertextes peuvent être présents sur le site. L'Utilisateur est informé qu'en cliquant sur ces 
                liens, il sortira du site <strong>www.azalee-patrimoine.fr</strong>. Ce dernier n'a pas de contrôle sur les pages web sur 
                lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 7 : Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer automatiquement 
                sur son logiciel de navigation.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l'ordinateur de 
                l'Utilisateur par votre navigateur et qui sont nécessaires à l'utilisation du site <strong>www.azalee-patrimoine.fr</strong>. 
                Les cookies ne contiennent pas d'information personnelle et ne peuvent pas être utilisés 
                pour identifier quelqu'un. Un cookie contient un identifiant unique, généré aléatoirement et donc 
                anonyme. Certains cookies expirent à la fin de la visite de l'Utilisateur, d'autres restent.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'information contenue dans les cookies est utilisée pour améliorer le site <strong>www.azalee-patrimoine.fr</strong>. 
                En naviguant sur le site, L'Utilisateur les accepte.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur doit toutefois donner son consentement quant à l'utilisation de certains cookies. 
                A défaut d'acceptation, l'Utilisateur est informé que certaines fonctionnalités ou pages risquent de lui 
                être refusées.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                L'Utilisateur pourra désactiver ces cookies par l'intermédiaire des paramètres figurant au sein de son 
                logiciel de navigation.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">Article 8 : Droit applicable et juridiction compétente</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un 
                litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Pour toute question relative à l'application des présentes CGU, vous pouvez joindre l'éditeur aux 
                coordonnées inscrites à l'ARTICLE 1.
              </p>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
