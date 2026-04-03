// Service de Génération de Légendes par IA
// Utilise l'API Claude si ANTHROPIC_API_KEY est défini, sinon utilise un mock intelligent

const PLATFORM_PROMPTS = {
  TIKTOK: {
    style: 'viral, accroches fortes, tendance, langage Gen-Z francophone',
    format: 'Commence par une accroche forte (POV:, Attends la fin, Personne ne parle de ça). Utilise l\'argot tendance francophone. Garde un ton énergique et rapide. Inclus 3-5 hashtags tendance.',
    charLimit: 2200,
    example: 'POV : Tu viens de découvrir la méthode la plus simple pour multiplier ta productivité par 10 🤯 \n\nCette astuce a changé ma vie... #productivité #astuce #fyp'
  },
  INSTAGRAM: {
    style: 'esthétique, engageant, riche en émojis, storytelling',
    format: 'Commence par une première ligne accrocheuse. Utilise des sauts de ligne pour la lisibilité. Inclus des émojis. Ajoute une histoire personnelle ou un insight. Termine par un CTA.',
    charLimit: 2200,
    example: '✨ Le secret que personne ne te dit sur la création de marque...\n\nJ\'ai passé 3 ans à faire ça mal avant de comprendre 👇\n\n📌 Sauvegarde ça pour plus tard\n#branding #marketing'
  },
  YOUTUBE: {
    style: 'optimisé SEO, suscite la curiosité, informatif',
    format: 'Commence par une question ou déclaration captivante qui rend les spectateurs curieux. Inclus des mots-clés pertinents. Ajoute des horodatages si applicable. Termine par un CTA d\'abonnement.',
    charLimit: 5000,
    example: 'Comment je suis passé de 0 à 100K abonnés en 6 mois (la méthode exacte)\n\nDans cette vidéo, je détaille la stratégie...\n\n🔔 Abonne-toi pour plus de contenu ! #Croissance #YouTube'
  },
  TWITTER: {
    style: 'court, percutant, qui fait réfléchir, controversé si approprié',
    format: 'Sois concis et percutant. Utilise des déclarations audacieuses. Crée des sujets de conversation. Maximum 280 caractères. Utilise 1-2 hashtags max.',
    charLimit: 280,
    example: 'La plupart des gens échouent en création de contenu parce qu\'ils optimisent pour les likes plutôt que pour l\'impact.\n\nL\'algorithme récompense l\'audace, pas la perfection.'
  },
  LINKEDIN: {
    style: 'professionnel, structuré, axé sur les apprentissages et la valeur ajoutée',
    format: 'Accroche forte avec de l\'espace, liste à puces ou numérotée pour les leçons clés, ton authentique de leadership, CTA posant une question à la communauté professionnelle.',
    charLimit: 3000,
    example: 'J\'ai échoué 3 fois avant de lancer cette startup.\n\nVoici les 3 leçons difficiles que j\'ai apprises :\n\n1. Le produit n\'est rien sans distribution.\n2. Embaucher tard, licencier tôt.\n\nEt vous, quelle est votre plus grande erreur en affaires ?\n\n#Leadership #Startups #Entrepreneuriat'
  },
  FACEBOOK: {
    style: 'communautaire, conversationnel, engageant et accessible',
    format: 'Ton amical et proche de l\'audience. Posez une question qui suscite des commentaires. Longueur moyenne à longue. Utilisez quelques emojis pour rendre le texte vivant.',
    charLimit: 5000,
    example: 'Aujourd\'hui on a accompli quelque chose d\'incroyable avec l\'équipe ! 🎉\n\nJe voulais juste prendre un moment pour vous remercier tous pour votre soutien constant. Sans cette communauté, rien de tout cela ne serait possible.\n\nQu\'est-ce qui vous rend le plus fier aujourd\'hui ? Dites-le moi en commentaire ! 👇'
  },
  THREADS: {
    style: 'très concis, humoristique, réflexion rapide, tendance textuelle',
    format: 'Comme un tweet mais plus chaleureux. Évitez les gros blocs de texte. Partagez une pensée spontanée ou une question rapide sans hashtags excessifs.',
    charLimit: 500,
    example: 'Petit rappel : dormir au moins 8 heures par nuit est de loin le meilleur hack de productivité. \n\nLâchez vos écrans.'
  },
  PINTEREST: {
    style: 'inspirant, esthétique, axé sur la découverte et l\'enregistrement',
    format: 'Appel à l\'action clair pour enregistrer l\'épingle. Mots-clés SEO très forts au début. Description claire de ce que l\'image ou la vidéo apporte. Hashtags ciblés.',
    charLimit: 500,
    example: 'Transformez votre espace de travail avec ces 5 idées minimalistes ! 🌿 Enregistrez cette épingle pour ne pas la perdre.\n\n#DécoBureau #Minimalisme #AstuceRangement #Productivité'
  }
};

export async function generateCaptions(baseIdea, platforms, options = {}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) return generateWithClaude(baseIdea, platforms, options, apiKey);
  return generateMockCaptions(baseIdea, platforms, options);
}

async function generateWithClaude(baseIdea, platforms, options, apiKey) {
  const platformInstructions = platforms.map(p => {
    const config = PLATFORM_PROMPTS[p];
    if (!config) return null;
    return `\n## ${p}\n- Style : ${config.style}\n- Format : ${config.format}\n- Limite : ${config.charLimit}\n- Exemple : ${config.example}`;
  }).filter(Boolean).join('\n');

  const systemPrompt = `Tu es un expert en stratégie de contenu pour les réseaux sociaux. Génère des légendes spécifiques à chaque plateforme pour l'idée de contenu donnée. Chaque légende doit être uniquement optimisée pour sa plateforme. TOUT DOIT ETRE EN FRANCAIS.
${options.tone ? `Ton général : ${options.tone}` : ''}
${options.contentType ? `Type de contenu : ${options.contentType}` : ''}

Réponds avec un JSON valide :
{ "captions": { "NOM_PLATEFORME": { "caption": "...", "hashtags": "...", "hookText": "...", "ctaText": "..." } } }`;

  const userPrompt = `Idée: "${baseIdea}"\n\nPlateformes: ${platforms.join(', ')}\n\nInstructions par plateforme :${platformInstructions}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, system: systemPrompt, messages: [{ role: 'user', content: userPrompt }] })
    });
    if (!response.ok) return generateMockCaptions(baseIdea, platforms, options);
    
    const data = await response.json();
    const jsonMatch = data.content[0].text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]).captions || JSON.parse(jsonMatch[0]);
    return generateMockCaptions(baseIdea, platforms, options);
  } catch (err) {
    return generateMockCaptions(baseIdea, platforms, options);
  }
}

function generateMockCaptions(baseIdea, platforms, options = {}) {
  const captions = {};
  const ideaShort = baseIdea.length > 50 ? baseIdea.substring(0, 50) : baseIdea;

  const mockGenerators = {
    TIKTOK: (idea) => ({
      caption: `POV : Tu viens de découvrir ${idea} et ton esprit est BLOWN 🤯\n\nNon mais sérieusement, ça change TOUT.\n\nMets un 🔥 si t'avais besoin de ça\n#fyp #viral #${idea.split(' ')[0]?.toLowerCase() || 'tendance'}`,
      hashtags: '#fyp #viral #tendance #pourtoi', hookText: `POV : Tu viens de découvrir ${idea} 🤯`, ctaText: 'Mets un 🔥'
    }),
    INSTAGRAM: (idea) => ({
      caption: `✨ Parlons de ${idea}\n\nJ'avais envie de partager ça depuis un moment 👇\n\nLa vérité c'est qu'une fois que tu comprends ça, tout change 💡\n\n💬 Dis-moi en commentaire !\n📌 SAUVEGARDE ce post.`,
      hashtags: '#créateurdecontenu #réseauxsociaux #viral', hookText: `✨ Parlons de ${idea}`, ctaText: '📌 SAUVEGARDE ce post'
    }),
    YOUTUBE: (idea) => ({
      caption: `${idea} — Le Guide Complet\n\nDans cette vidéo, je détaille tout sur ${idea.toLowerCase()}.\n\n⏱️ 0:00 - Introduction\n⏱️ 1:30 - Les Bases\n\n🔔 Abonne-toi !`,
      hashtags: '#tutoriel #guide', hookText: `${idea} — Le Guide Complet`, ctaText: '🔔 Abonne-toi !'
    }),
    TWITTER: (idea) => ({
      caption: `La plupart des gens se trompent sur ${idea.toLowerCase()}.\n\nVoici la vérité que personne ne veut entendre :`,
      hashtags: `#faits`, hookText: `La plupart des gens se trompent sur ${idea.toLowerCase()}.`, ctaText: 'RT si tu es d\'accord 🔄'
    }),
    LINKEDIN: (idea) => ({
      caption: `Hier encore, je bloquais sur : ${idea}.\n\nAujourd'hui, j'ai compris une chose fondamentale pour mon business.\n\n1. Oubliez la perfection.\n2. Fixez des systèmes.\n\nC'est quoi votre avis métier là-dessus ? 👇💭\n\n#Business #Croissance #Expertise`,
      hashtags: '#Business #Croissance #Expertise #Discussions', hookText: `Hier encore, je bloquais sur : ${idea}`, ctaText: 'C\'est quoi votre avis métier là-dessus ? 👇'
    }),
    FACEBOOK: (idea) => ({
      caption: `Coucou tout le monde ! 👋 J'ai super envie de parler de ${idea.toLowerCase()} aujourd'hui.\n\nFranchement, beaucoup sous-estiment ça, mais avec notre communauté, on sait mieux pas vrai ? 😉\n\nRacontez-moi vos propres expériences en dessous, je vous lis tous !`,
      hashtags: '#Communauté #Partage #Famille', hookText: `Coucou tout le monde ! 👋 J'ai super envie de parler de ${idea}...`, ctaText: 'Racontez-moi vos propres expériences en dessous !'
    }),
    THREADS: (idea) => ({
      caption: `Entre nous, ${idea.toLowerCase()} c'est vraiment le mood du jour. \nTotalement d'accord ? 🤷‍♂️`,
      hashtags: '', hookText: `Entre nous, ${idea} c'est vraiment le mood du jour.`, ctaText: 'Totalement d\'accord ?'
    }),
    PINTEREST: (idea) => ({
      caption: `Nouveau look ou nouvelle organisation autour de ${idea} ! 📍 Enregistrez pour retrouver facilement plus tard. \nC'est ultra utile !`,
      hashtags: '#Sauvegarde #Inspiration #Guide', hookText: `Nouveau look ou organisation autour de ${idea} !`, ctaText: '📍 Enregistrez pour ne rien rater.'
    })
  };

  for (const platform of platforms) {
    if (mockGenerators[platform]) captions[platform] = mockGenerators[platform](ideaShort);
  }
  return captions;
}

export async function classifyContent(content) {
  // Simple Mock
  return { contentType: 'EDUCATIONAL', confidence: 0.8, keywords: content.split(/\s+/).slice(0, 5) };
}

export function suggestBestTime(platforms, contentType) {
  const suggestions = {};
  const bestTimes = {
    TIKTOK: { weekday: '19:00', weekend: '11:00', peak: 'Mardi & Jeudi 19h-21h' },
    INSTAGRAM: { weekday: '12:00', weekend: '10:00', peak: 'Mercredi & Vendredi 11h-13h' },
    YOUTUBE: { weekday: '15:00', weekend: '09:00', peak: 'Jeudi & Vendredi 14h-16h' },
    TWITTER: { weekday: '09:00', weekend: '10:00', peak: 'Lundi & Mercredi 8h-10h' },
    LINKEDIN: { weekday: '08:30', weekend: '10:00', peak: 'Mardi à Jeudi 8h-10h' },
    FACEBOOK: { weekday: '13:00', weekend: '13:00', peak: 'Mercredi & Vendredi 13h-15h' },
    THREADS: { weekday: '08:00', weekend: '10:00', peak: 'Tous les matins 8h' },
    PINTEREST: { weekday: '20:00', weekend: '14:00', peak: 'Samedi & Dimanche 14h-16h' }
  };

  for (const platform of platforms) {
    if (bestTimes[platform]) {
      const now = new Date();
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      suggestions[platform] = { suggestedTime: isWeekend ? bestTimes[platform].weekend : bestTimes[platform].weekday, peakWindow: bestTimes[platform].peak, timezone: 'Europe/Paris' };
    }
  }
  return suggestions;
}
