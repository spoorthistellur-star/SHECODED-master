import { RedFlagAlert } from '../types';

interface RedFlagRule {
  category: RedFlagAlert['category'];
  patterns: (string | RegExp)[];
  headline: string;
  reason: string;
  actionRequired: string;
}

const RED_FLAG_RULES: RedFlagRule[] = [
  // 1. Extreme Heavy Bleeding (Menorrhagia / Hemorrhage)
  {
    category: 'heavy_bleeding',
    patterns: [
      /soaking\s*(a\s*)?pad\s*(in\s*|every\s*)?(an?\s*hour|1\s*hour|2\s*hours)/i,
      /changing\s*pad\s*every\s*hour/i,
      /large\s*blood\s*clots/i,
      /clots\s*bigger\s*than\s*(a\s*)?quarter|lemon/i,
      /flooding\s*blood/i,
      /bleeding\s*heavily\s*non\s*stop/i,
      /khoon\s*rukk\s*nahi\s*raha/i,
      /bahut\s*jyada\s*blood/i,
      /pad\s*1\s*ghante\s*me\s*bhar\s*raha/i,
      /raththam\s*athigam\s*podhu/i,
      /thoppu\s*thoppu\s*raththam/i,
      /bada\s*blood\s*clots/i,
      /raktha\s*thumba\s*hariyuthide/i,
      /raktha\s*nilluthilla/i,
      /రక్తం\s*ఆగకుండా/i,
      /ರಕ್ತಸ್ರಾವ\s*ನಿಲ್ಲುತ್ತಿಲ್ಲ/i,
      /खून\s*रुक\s*नहीं\s*रहा/i
    ],
    headline: 'Urgent: Abnormally Heavy Bleeding Detected',
    reason: 'Soaking through one or more sanitary pads/tampons per hour, passing large blood clots, or continuous heavy flooding can cause rapid blood loss and severe anemia.',
    actionRequired: 'Please go to the nearest emergency room or contact your gynecologist immediately. Do not wait for a routine clinic appointment.'
  },
  // 2. Severe Acute Pelvic / Abdominal Pain
  {
    category: 'severe_pain',
    patterns: [
      /severe\s*pelvic\s*pain/i,
      /unbearable\s*stomach\s*pain/i,
      /sharp\s*stabbing\s*pain\s*in\s*lower\s*abdomen/i,
      /cannot\s*walk\s*due\s*to\s*pain/i,
      /severe\s*cramps\s*vomiting/i,
      /asahyavada\s*hotte\s*novvu/i,
      /hotte\s*thumba\s*novide/i,
      /pet\s*me\s*tez\s*dard/i,
      /bahut\s*tez\s*dard/i,
      /thanga\s*mudiyatha\s*vali/i,
      /vayiru\s*kaduvali/i,
      /kadupu\s*noppi\s*tatukolekapothunnanu/i,
      /తీవ్రమైన\s*కడుపునొప్పి/i,
      /ಅಸಹನೀಯ\s*ಹೊಟ್ಟೆ\s*ನೋವು/i,
      /असहनीय\s*पेट\s*दर्द/i
    ],
    headline: 'Urgent: Severe or Sudden Pelvic Pain',
    reason: 'Sudden, severe, or unbearable lower abdominal/pelvic pain could indicate an ovarian cyst rupture, ovarian torsion (twisted ovary), appendicitis, or pelvic infection.',
    actionRequired: 'Seek urgent clinical evaluation at an emergency department or hospital immediately. Avoid taking pain relief before a doctor examines the abdomen.'
  },
  // 3. Ectopic Pregnancy Risk (Missed period + severe one-sided pain + dizziness)
  {
    category: 'ectopic_risk',
    patterns: [
      /missed\s*period.*(one\s*side\s*pain|shoulder\s*pain|dizzy|faint)/i,
      /pregnant.*(sharp\s*pain|bleeding)/i,
      /positive\s*pregnancy\s*test.*bleeding/i,
      /garbha.*novvu.*raktha/i,
      /pregnancy.*dard.*khoon/i
    ],
    headline: 'Critical: Potential Pregnancy Complication / Ectopic Risk',
    reason: 'Missed menstrual cycles combined with sharp one-sided pelvic pain, spotting/bleeding, or dizziness can indicate an ectopic pregnancy (fertilized egg growing outside the uterus), which is life-threatening.',
    actionRequired: 'Go to the nearest emergency hospital immediately for an urgent ultrasound and serum beta-hCG assessment.'
  },
  // 4. Fainting, Syncope, Extreme Weakness
  {
    category: 'fainting_syncope',
    patterns: [
      /fainted/i,
      /passed\s*out/i,
      /collapsing/i,
      /cannot\s*stand\s*up\s*dizzy/i,
      /chakar\s*aake\s*gir\s*padi/i,
      /behosh/i,
      /mayakkam\s*potu\s*vizhundhuten/i,
      /thale\s*suthu\s*biddide/i,
      /spruha\s*tappindi/i,
      /ಜ್ಞಾನ\s*ತಪ್ಪಿದೆ/i,
      /बेहोश/i,
      /மயக்கம்/i
    ],
    headline: 'Urgent: Episode of Fainting or Syncope',
    reason: 'Fainting (loss of consciousness) or severe sudden dizziness accompanied by menstrual issues may indicate severe blood loss, sudden hypotension, or internal hemorrhage.',
    actionRequired: 'Lie down flat with legs elevated, keep airways clear, and call emergency services (112 / 108) immediately.'
  },
  // 5. Mental Distress / Self-Harm
  {
    category: 'mental_distress',
    patterns: [
      /want\s*to\s*die/i,
      /kill\s*myself/i,
      /suicid/i,
      /harm\s*myself/i,
      /no\s*reason\s*to\s*live/i,
      /mar\s*jaana\s*chahti/i,
      /jeena\s*nahi\s*chahti/i,
      /saayovudu\s*beku/i,
      /saaga\s*vendum/i,
      /chavaalanipisthondi/i,
      /ಆತ್ಮಹತ್ಯೆ/i,
      /आत्महत्या/i
    ],
    headline: 'Immediate Support: You Are Not Alone',
    reason: 'Hormonal fluctuations in conditions like PCOS can deeply impact mood, neurotransmitters, and emotional well-being. Compassionate, confidential help is available right now.',
    actionRequired: 'Please talk to a counselor or someone you trust immediately. Reach out to the 24/7 free toll-free support services listed below.'
  }
];

export function checkRedFlags(text: string): RedFlagAlert {
  for (const rule of RED_FLAG_RULES) {
    for (const pattern of rule.patterns) {
      const isMatch = pattern instanceof RegExp ? pattern.test(text) : text.toLowerCase().includes(pattern.toLowerCase());
      if (isMatch) {
        return {
          isTriggered: true,
          category: rule.category,
          headline: rule.headline,
          reason: rule.reason,
          actionRequired: rule.actionRequired,
          helplines: getHelplines(rule.category)
        };
      }
    }
  }

  return {
    isTriggered: false,
    category: 'none',
    headline: '',
    reason: '',
    actionRequired: '',
    helplines: []
  };
}

function getHelplines(category: RedFlagAlert['category']) {
  if (category === 'mental_distress') {
    return [
      {
        name: 'Tele-MANAS (Govt of India 24/7 Mental Health)',
        number: '14416 / 1800-891-4416',
        description: 'Toll-free, 24/7 crisis counselling across all regional languages'
      },
      {
        name: 'KIRAN National Mental Health Helpline',
        number: '1800-599-0019',
        description: 'Govt of India psychological support and crisis management'
      },
      {
        name: 'Vandrevala Foundation Helpline',
        number: '+91 9999 666 555',
        description: 'Free 24/7 mental health and emotional distress assistance'
      }
    ];
  }

  return [
    {
      name: 'National Emergency Helpline (All Services)',
      number: '112',
      description: 'Single emergency number across all states in India'
    },
    {
      name: 'Emergency Medical & Ambulance Service',
      number: '108 / 102',
      description: 'Immediate ambulance dispatch for medical and maternal emergencies'
    },
    {
      name: 'Women Helpline (Domestic & Emergency Care)',
      number: '1091 / 181',
      description: '24/7 assistance and support for women'
    }
  ];
}
