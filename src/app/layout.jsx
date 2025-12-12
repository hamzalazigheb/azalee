import { Inter } from "next/font/google";
import "../styles/index.css";
import ClientProviders from "../components/common/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

// Liste des principales villes françaises pour le SEO
const villesFranceSEO = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille",
  "Rennes", "Reims", "Saint-Étienne", "Le Havre", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne",
  "Saint-Denis", "Le Mans", "Aix-en-Provence", "Clermont-Ferrand", "Brest", "Limoges", "Tours", "Amiens", "Perpignan", "Metz",
  "Besançon", "Boulogne-Billancourt", "Orléans", "Mulhouse", "Rouen", "Caen", "Nancy", "Argenteuil", "Montreuil", "Nanterre",
  "Avignon", "Créteil", "Dunkirk", "Poitiers", "Asnières-sur-Seine", "Courbevoie", "Vitry-sur-Seine", "Aubervilliers", "Colombes", "Aulnay-sous-Bois",
  "La Rochelle", "Rueil-Malmaison", "Champigny-sur-Marne", "Antibes", "Saint-Maur-des-Fossés", "Cannes", "Calais", "Béziers", "Bourges", "Colmar",
  "Drancy", "Mérignac", "Saint-Nazaire", "Valence", "Quimper", "Issy-les-Moulineaux", "Noisy-le-Grand", "La Seyne-sur-Mer", "Hyères", "Évry",
  "Villeneuve-d'Ascq", "Sète", "Pau", "Chambéry", "Pantin", "Lorient", "Montauban", "Niort", "Vannes", "Bayonne",
  "Cergy", "Annecy", "Laval", "Belfort", "Brive-la-Gaillarde", "Charleville-Mézières", "Cholet", "Épinal", "Évreux", "Fontenay-sous-Bois",
  "Fréjus", "Gap", "Gennevilliers", "Ivry-sur-Seine", "Le Blanc-Mesnil", "Mâcon", "Meaux", "Melun", "Montbéliard", "Neuilly-sur-Seine",
  "Périgueux", "Roanne", "Romainville", "Saint-Brieuc", "Saint-Ouen", "Saint-Quentin", "Sarcelles", "Thionville", "Troyes", "Vaulx-en-Velin",
  "Vénissieux", "Vincennes", "Wattrelos", "Albi", "Angoulême", "Arles", "Arras", "Aubagne", "Auxerre", "Beauvais",
  "Blois", "Bourgoin-Jallieu", "Carcassonne", "Castres", "Chalon-sur-Saône", "Châteauroux", "Chartres", "Cherbourg", "Compiègne", "Dieppe",
  "Douai", "Draguignan", "Dreux", "Forbach", "Fougères", "Grasse", "Haguenau", "La Ciotat", "La Roche-sur-Yon", "Lannion",
  "Libourne", "Longwy", "Lons-le-Saunier", "Lunéville", "Mantes-la-Jolie", "Martigues", "Maubeuge", "Mayenne", "Menton", "Millau",
  "Montargis", "Mont-de-Marsan", "Montluçon", "Moulins", "Nevers", "Narbonne", "Orange", "Pithiviers", "Pontarlier", "Pontoise",
  "Privas", "Provins", "Quimperlé", "Rambouillet", "Redon", "Remiremont", "Rodez", "Romans-sur-Isère", "Rosny-sous-Bois", "Royan",
  "Saint-Amand-les-Eaux", "Saint-Avold", "Saint-Chamond", "Saint-Dié-des-Vosges", "Saint-Dizier", "Saintes", "Saint-Flour", "Saint-Gaudens",
  "Saint-Germain-en-Laye", "Saint-Jean-de-Luz", "Saint-Lô", "Saint-Malo", "Saint-Omer", "Salon-de-Provence", "Sarlat-la-Canéda", "Sarreguemines",
  "Sartrouville", "Sens", "Soissons", "Tarbes", "Thonon-les-Bains", "Tulle", "Ussel", "Valenciennes", "Vendôme", "Verdun",
  "Versailles", "Vesoul", "Vichy", "Vienne", "Vierzon", "Villefranche-sur-Saône", "Villeneuve-sur-Lot", "Vitré", "Yvetot"
].join(", ");

export const metadata = {
  title: "Azalée Patrimoine - Gestion de patrimoine et conseil financier",
  description: `Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Disponible partout en France : ${villesFranceSEO}. Découvrez nos solutions personnalisées pour sécuriser et faire croître votre patrimoine.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
