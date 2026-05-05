import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSAGeneration as English } from "./ECDSAGeneration";

// French translation of ECDSAGeneration.
//
// Pattern: spread the English article, then override the fields you've
// translated. Anything you don't override stays English — so you can ship
// the article in stages without breaking it.
//
// Keep `href`, `shortHandTitle`, and `lesson` identical to the English
// version so URLs stay stable across locales.

const FRENCH_CONTENT_PREFIX: ArticleViewProps["content"] = [
  {
    type: "main title",
    content: "Génération ECDSA",
  },
  {
    type: "title",
    content: "Prouver la propriété d'un message signé",
  },
  {
    type: "paragraph",
    content: "(bold)Introduction(bold)",
  },
  {
    type: "paragraph",
    content:
      "On dit souvent que la blockchain n'est rien d'autre qu'une liste chaînée de signatures numériques. D'une certaine manière, c'est vrai — les signatures numériques sont au cœur de la cryptographie qui sous-tend Bitcoin. Ces signatures servent d'outils de vérification, permettant aux nœuds d'authentifier la réception de bitcoins lors des transactions précédentes. Cette authentification est sécurisée par un verrou numérique unique, accessible uniquement par une clé publique spécifique et une transaction au format spécifique.",
  },
];

export const ECDSAGenerationFr: ArticleViewProps = {
  ...English,
  title: "Génération ECDSA",
  description:
    "Apprenez les bases de la génération ECDSA pour les signatures numériques, en vous concentrant sur le processus de création d'une signature numérique cryptographique pour les transactions Bitcoin.",
  content: [
    ...FRENCH_CONTENT_PREFIX,
    // Remaining content blocks are still in English; translate them
    // incrementally by moving items out of English.content.slice(...) above.
    ...English.content.slice(FRENCH_CONTENT_PREFIX.length),
  ],
};
