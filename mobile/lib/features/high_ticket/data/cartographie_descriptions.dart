/// Static descriptions for the 21 cartographie documents + bonus.
///
/// Sourced from the web version (présentation_de_la_cartographie_émotionnelle.html).
/// Each entry maps a DOC number (1–20 + 'PROTOCOLE') to its teaser and tags.
library;

class CartographieDocInfo {
  const CartographieDocInfo({
    required this.teaser,
    required this.tags,
  });

  final String teaser;
  final List<String> tags;
}

/// Phase metadata: subtitle shown under the phase title.
class PhaseInfo {
  const PhaseInfo({
    required this.title,
    required this.subtitle,
    required this.start,
    required this.end,
  });

  final String title;
  final String subtitle;
  final int start;
  final int end;
}

const kCartographiePhases = [
  PhaseInfo(
    title: 'Accueillir',
    subtitle: 'Te poser, te sentir en s\u00e9curit\u00e9, comprendre comment tu fonctionnes',
    start: 1,
    end: 3,
  ),
  PhaseInfo(
    title: 'Comprendre',
    subtitle:
        'Plonger dans ton histoire, tes racines, tes blessures, tes \u00e9motions',
    start: 4,
    end: 11,
  ),
  PhaseInfo(
    title: 'Se situer',
    subtitle:
        'C\u00e9l\u00e9brer tes forces, clarifier tes valeurs, construire ta vision',
    start: 12,
    end: 17,
  ),
  PhaseInfo(
    title: 'Agir',
    subtitle:
        'Passer de la compr\u00e9hension \u00e0 la transformation concr\u00e8te',
    start: 18,
    end: 20,
  ),
];

const kCartographieDocDescriptions = <int, CartographieDocInfo>{
  1: CartographieDocInfo(
    teaser:
        'Le premier pas, c\u2019est de se sentir en s\u00e9curit\u00e9. Ce document cr\u00e9e cet espace pour toi.',
    tags: ['Reconnaissance', 'Validation', 'Glossaire', 'Cadrage'],
  ),
  2: CartographieDocInfo(
    teaser:
        'Tu vas mettre des mots sur des choses que tu ressentais sans pouvoir les expliquer.',
    tags: ['Esprit-Corps-C\u0153ur', 'Les 3 Nafs', 'Le changement est possible'],
  ),
  3: CartographieDocInfo(
    teaser:
        'Tu sauras exactement o\u00f9 tu vas, combien de temps \u00e7a prend, et tu auras les outils pour les moments intenses.',
    tags: ['Routine personnalis\u00e9e', 'Kit d\u2019urgence', 'Phrase d\u2019ancrage'],
  ),
  4: CartographieDocInfo(
    teaser:
        'Pour la premi\u00e8re fois, quelqu\u2019un retrace ton histoire de fa\u00e7on coh\u00e9rente, sans minimiser, sans juger.',
    tags: ['Relations parentales', 'Patterns relationnels', 'Fil rouge'],
  ),
  5: CartographieDocInfo(
    teaser:
        'Certains fils invisibles traversent les g\u00e9n\u00e9rations. Ce document les rend visibles.',
    tags: ['G\u00e9nogramme', 'Sch\u00e9mas pr\u00e9coces', 'Loyaut\u00e9s invisibles'],
  ),
  6: CartographieDocInfo(
    teaser:
        'Le document le plus intense. Et le plus bienveillant. Tes blessures ne te d\u00e9finissent pas.',
    tags: ['Blessures', 'Masques', 'Lettre enfant int\u00e9rieur', 'Gu\u00e9rison'],
  ),
  7: CartographieDocInfo(
    teaser:
        'Pourquoi cette remarque anodine te met dans tous tes \u00e9tats\u00a0? Ce document te donne les r\u00e9ponses.',
    tags: ['\u00c9motions dominantes', 'D\u00e9clencheurs', 'Fen\u00eatre de tol\u00e9rance'],
  ),
  8: CartographieDocInfo(
    teaser:
        'Pourquoi tu t\u2019accroches \u00e0 ceux qui te fuient. Pourquoi tu fuis ceux qui restent.',
    tags: ['Style d\u2019attachement', 'Formation enfance', 'Chemin vers la s\u00e9curit\u00e9'],
  ),
  9: CartographieDocInfo(
    teaser:
        'Ton corps parle. Il garde la m\u00e9moire de tout ce que tu as v\u00e9cu, m\u00eame ce que ton esprit a oubli\u00e9.',
    tags: ['Cartographie corporelle', 'Syst\u00e8me nerveux', 'Rapport au corps'],
  ),
  10: CartographieDocInfo(
    teaser:
        'Qui es-tu quand personne ne regarde\u00a0? Et qui te forces-tu \u00e0 \u00eatre pour \u00eatre accept\u00e9e\u00a0?',
    tags: ['Fitrah', 'Vrai-self vs Faux-self', 'Authenticit\u00e9'],
  ),
  11: CartographieDocInfo(
    teaser:
        'Ces voix int\u00e9rieures qui te retiennent\u00a0? Elles essayaient de te prot\u00e9ger.',
    tags: ['Critique int\u00e9rieur', 'Saboteurs', 'Sage int\u00e9rieur'],
  ),
  12: CartographieDocInfo(
    teaser:
        'Apr\u00e8s avoir explor\u00e9 tes profondeurs, il est temps de c\u00e9l\u00e9brer tout ce qui fait ta lumi\u00e8re.',
    tags: ['Forces de caract\u00e8re', 'Langages de l\u2019amour', 'Amanah'],
  ),
  13: CartographieDocInfo(
    teaser:
        'Savoir ce que tu veux vraiment. Et enfin savoir dire non sans culpabilit\u00e9.',
    tags: ['Besoins profonds', 'Valeurs', '6 types de limites', 'Non-n\u00e9gociables'],
  ),
  14: CartographieDocInfo(
    teaser:
        'Parce que ta vie ne se r\u00e9sume pas \u00e0 une seule question. Tout compte.',
    tags: ['Argent & Rizq', 'Travail', 'Famille', 'Vision du mariage'],
  ),
  15: CartographieDocInfo(
    teaser:
        'La dimension que la psychologie occidentale oublie souvent. Et que l\u2019Islam place au centre.',
    tags: ['Sant\u00e9 du Qalb', 'Voiles du c\u0153ur', 'Plan de Tazkiya'],
  ),
  16: CartographieDocInfo(
    teaser:
        'Pas le prince charmant de tes r\u00eaves, mais la personne dont tu as r\u00e9ellement besoin.',
    tags: ['Crit\u00e8res', 'Compatibilit\u00e9 profonde', 'Pi\u00e8ges inconscients'],
  ),
  17: CartographieDocInfo(
    teaser:
        'Des crit\u00e8res objectifs pour \u00e9valuer un partenaire, sans te laisser pi\u00e9ger par la chimie du d\u00e9but.',
    tags: ['Green flags', 'Red flags personnalis\u00e9s', 'Istikhara'],
  ),
  18: CartographieDocInfo(
    teaser:
        'Comprendre ne suffit pas. Ce document te donne les outils concrets pour transformer.',
    tags: ['Protocole d\u2019urgence', '5 axes d\u2019exercices', 'Programme semaine 1'],
  ),
  19: CartographieDocInfo(
    teaser:
        'Ton itin\u00e9raire personnalis\u00e9, \u00e9tape par \u00e9tape. Pour ne jamais te sentir perdue.',
    tags: ['Objectifs', '\u00c9tapes concr\u00e8tes', 'Roadmap r\u00e9aliste'],
  ),
  20: CartographieDocInfo(
    teaser:
        'Le dernier document. Une vue d\u2019ensemble de tout ton voyage. Et une c\u00e9l\u00e9bration.',
    tags: ['Vision int\u00e9gr\u00e9e', '5 outils essentiels', 'Du\u2019a personnalis\u00e9e'],
  ),
};

const kProtocoleInfo = CartographieDocInfo(
  teaser:
      'Pour les \u00e9motions profondes qui ont besoin d\u2019\u00eatre travers\u00e9es, pas contourn\u00e9es.',
  tags: ['Tazkiya', 'Protocole en 8 \u00e9tapes', '9 protocoles sp\u00e9cialis\u00e9s'],
);
