export type Lang = 'de' | 'en';

export const copy = {
  de: {
    brand: {
      name: 'AzubiStimme Pflege',
      tagline: 'Anonym. Sicher. Gemeinsam Ausbildung verbessern.',
    },
    home: {
      hero: {
        title: 'Sprich darüber. Bleib geschützt. Lerne weiter.',
        paragraph: 'Die Pflegeausbildung soll dich stärken – nicht überfordern oder krank machen. AzubiStimme Pflege ist eine sichere, anonyme Plattform für Pflege-Auszubildende. Hier kannst du:',
        list: [
          'Erfahrungen anonym teilen',
          'Unterstützung bekommen',
          'deine Rechte verstehen',
          'und dazu beitragen, die Pflegeausbildung zu verbessern',
        ],
        closing: 'Du entscheidest selbst, was passiert. Du bist nicht allein.',
        cta: {
          primary: 'Erfahrung anonym teilen',
          secondary: 'Meine Rechte kennenlernen',
        },
        trust: {
          anonymous: 'Von Anfang an anonym',
          respectful: 'Respektvoll & sicher',
          rights: 'Rechte verständlich erklärt',
        },
      },
      features: {
        title: 'Was diese Plattform bietet',
        subtitle: 'Drei Grundpfeiler zur Unterstützung von Pflege-Auszubildenden',
        voice: {
          title: 'Anonyme Stimme',
          description: 'Teile Erfahrungen ohne Angst. Deine Geschichte hilft anderen und schafft Bewusstsein.',
        },
        rights: {
          title: 'Rechte & Orientierung',
          description: 'Wisse, was fair ist und was nicht. Lerne deine rechtlichen Schutzmöglichkeiten klar verstehen.',
        },
        support: {
          title: 'Unterstützung & Kontakt',
          description: 'Erreiche die richtigen Personen mit einer klaren Botschaft. Erhalte Orientierung, wen du kontaktieren kannst.',
        },
      },
      howItWorks: {
        title: 'So funktioniert es',
        subtitle: 'Drei einfache Schritte, um Unterstützung zu erhalten und deine Stimme zu erheben',
        step1: {
          title: 'Anonym teilen',
          description: 'Teile deine Erfahrung ohne Angst. Deine Stimme zählt.',
        },
        step2: {
          title: 'Deine Rechte lernen',
          description: 'Verstehe, was während deiner Ausbildung fair ist und was nicht.',
        },
        step3: {
          title: 'Sicher handeln',
          description: 'Kontaktiere deine Schule oder Einrichtung mit Klarheit und Selbstvertrauen.',
        },
      },
      voices: {
        title: 'Anonyme Stimmen',
        subtitle: 'Echte Erfahrungen von Pflege-Auszubildenden',
        encouragement: {
          title: 'Deine Geschichte zählt',
          text: 'Jede geteilte Erfahrung hilft, Bewusstsein und Unterstützung für Pflege-Auszubildende zu schaffen. Deine Stimme kann einen Unterschied machen, ohne deine Identität preiszugeben.',
          safety: 'Keine Namen. Keine Belästigung. Sicherheit zuerst.',
        },
        cta: 'Anonyme Nachricht schreiben',
      },
      rights: {
        title: 'Rechte & Kontakt',
        subtitle: 'Kenne deine Rechte und melde dich, wenn sie nicht respektiert werden',
        rightsTitle: 'Deine Rechte (Einfach)',
        contactTitle: 'Orientierung & Unterstützung',
        contactNote: 'Du kannst dich hier melden, um deine Situation einzuordnen oder Fragen zu klären.',
        disclaimer: 'Nicht für Notfälle. Wenn du in Gefahr bist, kontaktiere die örtlichen Notdienste.',
        rightsList: ['Arbeitszeiten', 'Pausen', 'Aufsicht', 'Respekt', 'Sicheres Umfeld'],
      },
      articles: {
        title: 'Wissen & Prävention',
        subtitle: 'Bildungsinhalte und Orientierung für Pflege-Auszubildende',
        cta: 'Alle Artikel anzeigen',
      },
    },
    about: {
      title: 'Warum es AzubiStimme Pflege gibt',
      content: [
        'Viele Pflege-Auszubildende erleben: Überforderung, fehlende Anleitung, respektlosen Umgang oder Angst vor Konsequenzen, wenn sie Probleme ansprechen.',
        'Aus Angst zu scheitern oder Nachteile zu bekommen, bleiben viele still – und Belastungen werden nicht sichtbar.',
        'AzubiStimme Pflege wurde geschaffen, um genau hier anzusetzen.',
        'Unsere Plattform verbindet:',
        '- konkrete Hilfe für einzelne Auszubildende',
        '- mit struktureller Prävention auf Systemebene',
        'Grundsätze:',
        '- Schutz der Auszubildenden',
        '- Anonymität ohne Ausnahmen',
        '- Keine Bloßstellung',
        '- Prävention statt Eskalation',
        '- Zusammenarbeit statt Schuldzuweisung',
      ],
    },
    help: {
      title: 'Du brauchst Hilfe? Du bist nicht allein.',
      intro: 'Hier kannst du Situationen aus deiner Ausbildung sicher und anonym mitteilen. Du entscheidest selbst, ob du nur berichten oder Unterstützung erhalten möchtest.',
      step1: {
        title: 'Schritt 1: Was beschäftigt dich?',
        options: [
          'Fehlende Anleitung',
          'Alleinarbeit',
          'Respektloser Umgang',
          'Überforderung / psychische Belastung',
          'Keine Pausen / zu lange Arbeitszeiten',
          'Angst vor Konsequenzen',
          'Gedanken an Ausbildungsabbruch',
          'Sonstiges',
        ],
      },
      step2: {
        title: 'Schritt 2: Was möchtest du?',
        options: [
          'Nur mitteilen',
          'Orientierung zu meinen Rechten',
          'Hilfe beim nächsten Schritt',
          'Unterstützung bei einem Gespräch',
          'Weiterleitung an passende Stellen (nur auf Wunsch)',
        ],
      },
      step3: {
        title: 'Schritt 3: Kontakt (optional)',
        anonymous: 'Anonym bleiben (Standard)',
        email: 'E-Mail-Adresse (nur wenn Rückmeldung gewünscht)',
        placeholder: 'deine@email.de',
      },
      note: 'AzubiStimme Pflege ersetzt keine offizielle Anzeige. Die Plattform hilft dir, sicher und informiert den nächsten Schritt zu gehen.',
      submit: 'Absenden',
      success: 'Vielen Dank. Deine Nachricht wurde anonym übermittelt.',
    },
    voices: {
      title: 'Anonyme Stimmen – echte Erfahrungen',
      intro: 'Jede geteilte Erfahrung hilft anderen Pflege-Auszubildenden und macht strukturelle Probleme sichtbar.',
      safety: {
        title: 'Sicherheit steht an erster Stelle:',
        rules: [
          'Keine Namen',
          'Keine Einrichtungen',
          'Keine Weitergabe einzelner Berichte',
        ],
        note: 'Einzelne Erfahrungsberichte werden niemals an Behörden weitergegeben.',
      },
      cta: 'Anonyme Nachricht schreiben',
    },
    rights: {
      title: 'Deine Rechte in der Pflegeausbildung – einfach erklärt',
      intro: 'Du hast Rechte. Auch als Azubi.',
      topics: [
        'Arbeitszeiten & Pausen',
        'Anleitung & Aufsicht',
        'Respekt & Schutz',
        'Lernauftrag statt Ausnutzung',
        'Sicheres Arbeitsumfeld',
      ],
      closing: 'Du musst nicht alles wissen – aber du hast das Recht, es zu erfahren.',
    },
    articles: {
      title: 'Wissen & Prävention',
      intro: 'AzubiStimme Pflege bietet Artikel und Orientierung zu Themen wie:',
      topics: [
        'Rechte von Pflege-Auszubildenden',
        'Burnout früh erkennen',
        'Sicher über Probleme sprechen',
        'Umgang mit Fehlern',
        'Selbstwert und Rolle als Azubi',
      ],
    },
    prevention: {
      title: 'Von einzelnen Stimmen zu struktureller Verbesserung',
      intro: 'AzubiStimme Pflege wertet anonymisierte Rückmeldungen aus, um wiederkehrende Belastungen in der Pflegeausbildung frühzeitig sichtbar zu machen.',
      important: {
        title: 'Wichtig:',
        points: [
          'Keine personenbezogenen Daten',
          'Keine Namen oder Einrichtungen',
          'Keine Einzelfälle',
        ],
        note: 'Nur zusammengefasste Themen & Trends',
      },
      goal: 'Prävention, Qualitätssicherung und frühzeitige Entlastung – nicht Kontrolle oder Sanktion.',
      invitation: 'Schulen, Fachstellen und Behörden sind eingeladen, diese Erkenntnisse fachlich einzuordnen und gemeinsam Lösungen zu entwickeln.',
    },
    official: {
      title: 'Offizielle Erklärung (für Gesundheitsamt & Schule)',
      intro: 'AzubiStimme Pflege ist eine unabhängige, anonyme Unterstützungs- und Präventionsplattform für Pflege-Auszubildende.',
      goals: {
        title: 'Zwei klar getrennte Ziele:',
        support: {
          title: '1) Unterstützung einzelner Auszubildender:',
          points: [
            'anonyme Meldemöglichkeit',
            'Orientierung zu Rechten',
            'Hilfe bei nächsten Schritten',
            'keine Weitergabe ohne Zustimmung',
          ],
        },
        prevention: {
          title: '2) Prävention auf Systemebene:',
          points: [
            'anonymisierte Auswertung wiederkehrender Themen',
            'keine personenbezogenen Daten',
            'keine Anzeige- oder Kontrollfunktion',
          ],
        },
      },
      privacy: {
        title: 'Datenschutz & Sicherheit:',
        points: [
          'Datensparsamkeit',
          'strikte Trennung der Ebenen',
          'keine Rückverfolgbarkeit',
          'DSGVO-orientiertes Vorgehen',
        ],
      },
      stance: 'AzubiStimme Pflege versteht sich als Ergänzung bestehender Strukturen und als Brücke zwischen Auszubildenden und System – nicht als Beschwerdeplattform.',
    },
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      rights: 'Rechte & Orientierung',
      voices: 'Anonyme Stimmen',
      articles: 'Wissen & Prävention',
      help: 'Hilfe-Portal',
      prevention: 'Prävention',
      official: 'Offizielle Erklärung',
      shareAnonymously: 'Anonym teilen',
    },
    footer: {
      mission: 'Kein Pflege-Auszubildender sollte im Stillen leiden.',
      disclaimer: 'Diese Plattform ist kein Notdienst. Bei unmittelbaren medizinischen oder rechtlichen Notfällen wenden Sie sich bitte an die zuständigen Behörden.',
    },
  },
  en: {
    brand: {
      name: 'AzubiStimme Pflege',
      tagline: 'Anonymous. Safe. Together we improve training.',
    },
    home: {
      hero: {
        title: 'Speak up. Stay safe. Keep learning.',
        paragraph: 'Nursing training should strengthen you – not overwhelm or harm you. AzubiStimme Pflege is a safe and anonymous platform for nursing trainees. Here you can:',
        list: [
          'share experiences anonymously',
          'receive support',
          'understand your rights',
          'and help improve nursing training',
        ],
        closing: 'You decide what happens next. You are not alone.',
        cta: {
          primary: 'Share Your Experience',
          secondary: 'Know Your Rights',
        },
        trust: {
          anonymous: 'Anonymous by design',
          respectful: 'Respectful community',
          rights: 'Rights explained simply',
        },
      },
      features: {
        title: 'What This Platform Provides',
        subtitle: 'Three core pillars to support nursing trainees',
        voice: {
          title: 'Anonymous Voice',
          description: 'Share experiences without fear. Your story helps others and raises awareness.',
        },
        rights: {
          title: 'Rights & Guidance',
          description: 'Know what is fair and what is not. Learn your legal protections clearly.',
        },
        support: {
          title: 'Support & Contact',
          description: 'Reach the right people with a clear message. Get guidance on who to contact.',
        },
      },
      howItWorks: {
        title: 'How It Works',
        subtitle: 'Three simple steps to get support and make your voice heard',
        step1: {
          title: 'Share anonymously',
          description: 'Share your experience without fear. Your voice matters.',
        },
        step2: {
          title: 'Learn your rights',
          description: 'Understand what is fair and what is not during your training.',
        },
        step3: {
          title: 'Take action safely',
          description: 'Contact your school or institution with clarity and confidence.',
        },
      },
      voices: {
        title: 'Anonymous Voices',
        subtitle: 'Real experiences shared by nursing trainees',
        encouragement: {
          title: 'Your Story Matters',
          text: 'Every experience shared helps create awareness and support for nursing trainees. Your voice can make a difference without revealing your identity.',
          safety: 'No names. No harassment. Safety first.',
        },
        cta: 'Write an anonymous message',
      },
      rights: {
        title: 'Rights & Contact',
        subtitle: 'Know your rights and get in touch when they are not respected',
        rightsTitle: 'Your Rights (Simple)',
        contactTitle: 'Orientation & Support',
        contactNote: 'You can contact us here to assess your situation or clarify questions.',
        disclaimer: 'Not emergency services. If you are in danger, contact local emergency help.',
        rightsList: ['Working hours', 'Breaks', 'Supervision', 'Respect', 'Safe environment'],
      },
      articles: {
        title: 'Knowledge & Prevention',
        subtitle: 'Educational content and guidance for nursing trainees',
        cta: 'View all articles',
      },
    },
    about: {
      title: 'Why AzubiStimme Pflege exists',
      content: [
        'Many nursing trainees experience overload, lack of supervision, disrespectful treatment, or fear consequences if they speak up.',
        'Out of fear of harming their training, many remain silent – and serious issues stay invisible.',
        'AzubiStimme Pflege was created to close this gap.',
      ],
    },
    help: {
      title: 'Do you need help? You are not alone.',
      intro: 'Here you can share situations from your training safely and anonymously. You decide whether you want to just share or receive support.',
      step1: {
        title: 'Step 1: What concerns you?',
        options: [
          'Missing supervision',
          'Working alone',
          'Disrespectful treatment',
          'Overload / psychological stress',
          'No breaks / too long working hours',
          'Fear of consequences',
          'Thoughts of dropping out',
          'Other',
        ],
      },
      step2: {
        title: 'Step 2: What do you want?',
        options: [
          'Just share',
          'Guidance on my rights',
          'Help with next steps',
          'Support for a conversation',
          'Referral to appropriate places (only if requested)',
        ],
      },
      step3: {
        title: 'Step 3: Contact (optional)',
        anonymous: 'Stay anonymous (default)',
        email: 'Email address (only if feedback desired)',
        placeholder: 'your@email.com',
      },
      note: 'AzubiStimme Pflege does not replace official reporting. The platform helps you take the next step safely and informed.',
      submit: 'Submit',
      success: 'Thank you. Your message has been sent anonymously.',
    },
    voices: {
      title: 'Anonymous Voices – real experiences',
      intro: 'Every shared experience helps other trainees and makes structural issues visible.',
      safety: {
        title: 'Safety comes first:',
        rules: [
          'No names',
          'No institutions',
          'No sharing of individual reports',
        ],
        note: 'Individual experience reports are never forwarded to authorities.',
      },
      cta: 'Write an anonymous message',
    },
    rights: {
      title: 'Your Rights in Nursing Training – Simply Explained',
      intro: 'You have rights. Even as a trainee.',
      topics: [
        'Working hours & breaks',
        'Supervision & guidance',
        'Respect & protection',
        'Learning task instead of exploitation',
        'Safe working environment',
      ],
      closing: 'You don\'t have to know everything – but you have the right to find out.',
    },
    articles: {
      title: 'Knowledge & Prevention',
      intro: 'AzubiStimme Pflege offers articles and guidance on topics such as:',
      topics: [
        'Rights of nursing trainees',
        'Recognizing burnout early',
        'Speaking safely about problems',
        'Dealing with mistakes',
        'Self-worth and role as a trainee',
      ],
    },
    prevention: {
      title: 'From individual voices to system-level improvement',
      intro: 'AzubiStimme Pflege analyzes anonymized feedback to identify recurring burdens in nursing training.',
      important: {
        title: 'Important:',
        points: [
          'No personal data',
          'No names or institutions',
          'No individual cases',
        ],
        note: 'Only summarized topics & trends',
      },
      goal: 'Prevention, quality assurance and early relief – not control or sanctions.',
      invitation: 'Schools, specialist offices and authorities are invited to professionally classify these findings and develop solutions together.',
    },
    official: {
      title: 'Official Statement (for Health Department & School)',
      intro: 'AzubiStimme Pflege is an independent, anonymous support and prevention platform for nursing trainees.',
      goals: {
        title: 'Two clearly separated goals:',
        support: {
          title: '1) Support for individual trainees:',
          points: [
            'anonymous reporting option',
            'guidance on rights',
            'help with next steps',
            'no sharing without consent',
          ],
        },
        prevention: {
          title: '2) Prevention at system level:',
          points: [
            'anonymized analysis of recurring topics',
            'no personal data',
            'no reporting or control function',
          ],
        },
      },
      privacy: {
        title: 'Data Protection & Security:',
        points: [
          'Data minimization',
          'strict separation of levels',
          'no traceability',
          'GDPR-oriented approach',
        ],
      },
      stance: 'AzubiStimme Pflege sees itself as a complement to existing structures and as a bridge between trainees and the system – not as a complaint platform.',
    },
    nav: {
      home: 'Home',
      about: 'About Us',
      rights: 'Rights & Orientation',
      voices: 'Anonymous Voices',
      articles: 'Knowledge & Prevention',
      help: 'Help Portal',
      prevention: 'Prevention',
      official: 'Official Statement',
      shareAnonymously: 'Share Anonymously',
    },
    footer: {
      mission: 'No nursing trainee should suffer in silence.',
      disclaimer: 'This platform is not emergency services. For immediate medical or legal emergencies, please contact the appropriate authorities.',
    },
  },
} as const;

export function getCopy(lang: Lang) {
  return copy[lang];
}

