import { ConditionOverlap } from '../types';

export const ROTTERDAM_GUIDELINES_SUMMARY = {
  title: 'Rotterdam 2003 / 2023 International Consensus',
  overview: 'Clinical criteria require the presence of at least TWO of the three key features, after excluding other conditions with similar presentations:',
  features: [
    {
      key: 'ovulatoryDysfunction',
      title: '1. Ovulatory Dysfunction (Oligo- or Anovulation)',
      description: 'Menstrual cycles longer than 35 days, fewer than 8 periods per year, or completely absent cycles for 3+ months.',
    },
    {
      key: 'hyperandrogenism',
      title: '2. Hyperandrogenism (Clinical or Biochemical)',
      description: 'Excess male hormones evidenced by facial/body hair (hirsutism), persistent cystic acne, scalp hair thinning, or elevated blood testosterone/DHEA-S.',
    },
    {
      key: 'polycysticMorphologySigns',
      title: '3. Polycystic Ovarian Morphology (Ultrasound)',
      description: 'Multiple small (2–9mm) immature follicles arranged around the periphery ("pearl necklace" pattern) or enlarged ovarian volume (>10 mL).',
    }
  ],
  icmrFogsiNote: 'Indian Council of Medical Research (ICMR) and FOGSI guidelines emphasize that South Asian women frequently exhibit an earlier onset of metabolic features (insulin resistance, central adiposity, acanthosis nigricans) at lower BMI thresholds.'
};

export const DIFFERENTIAL_CONDITIONS_BASE: ConditionOverlap[] = [
  {
    conditionName: 'Polycystic Ovary Syndrome (PCOS / PCOD)',
    commonSymptoms: ['Irregular or missed periods', 'Facial hair growth (hirsutism)', 'Persistent adult acne', 'Weight gain around abdomen', 'Acanthosis nigricans (dark skin patches)'],
    keyDistinguishingFeatures: 'Combination of ovulatory delays with androgen signs and insulin resistance. High prevalence in reproductive-aged women.',
    likelihoodCategory: 'High alignment',
    whyConsidered: 'Multiple overlapping reproductive, dermatological, and metabolic markers.'
  },
  {
    conditionName: 'Thyroid Dysfunction (e.g., Hypothyroidism)',
    commonSymptoms: ['Irregular or heavy periods', 'Fatigue and low energy', 'Weight gain', 'Hair thinning / brittle nails', 'Cold sensitivity'],
    keyDistinguishingFeatures: 'Sluggish metabolism, feeling unusually cold, constipation, swelling in face or ankles. Easily ruled in or out with a simple TSH blood test.',
    likelihoodCategory: 'Moderate alignment',
    whyConsidered: 'Thyroid hormones directly modulate ovarian function and share fatigue, weight gain, and cycle irregularity.'
  },
  {
    conditionName: 'Hyperprolactinemia (Elevated Prolactin)',
    commonSymptoms: ['Delayed or absent periods', 'Mild acne', 'Headaches', 'Breast tenderness or milky discharge (galactorrhea)'],
    keyDistinguishingFeatures: 'Elevated pituitary prolactin suppresses GnRH, causing missed periods without androgen excess.',
    likelihoodCategory: 'Moderate alignment',
    whyConsidered: 'Directly causes menstrual gaps and anovulation that mimics PCOS.'
  },
  {
    conditionName: 'Hypothalamic Amenorrhea (Stress / Nutritional deficit)',
    commonSymptoms: ['Missed periods', 'Fatigue', 'Low mood or anxiety', 'Hair shedding'],
    keyDistinguishingFeatures: 'Typically triggered by sudden weight loss, caloric restriction, psychological distress, or intense endurance training.',
    likelihoodCategory: 'Possible contributing factor',
    whyConsidered: 'Stress and circadian disruption strongly affect the hypothalamic-pituitary-ovarian axis.'
  }
];

export const RECOMMENDED_LAB_TESTS = [
  {
    testName: 'Pelvic Ultrasound (USG Abdomen / Pelvis)',
    purpose: 'Examines ovarian volume, endometrial thickness, and checks for polycystic follicle distribution.',
    idealTiming: 'Often scheduled between Day 3 to Day 5 of the cycle, or whenever arranged by your doctor.'
  },
  {
    testName: 'Complete Hormone Panel (Total/Free Testosterone, DHEA-S, LH, FSH)',
    purpose: 'Assesses androgen excess and checks the LH to FSH ratio (often elevated in PCOS).',
    idealTiming: 'Best measured in the early follicular phase (Day 2–4 of cycle) in morning fasting state.'
  },
  {
    testName: 'Thyroid Stimulating Hormone (TSH) & Prolactin',
    purpose: 'Essential rule-out tests to verify whether a thyroid condition or elevated prolactin is driving the cycle irregularity.',
    idealTiming: 'Morning fasting blood draw.'
  },
  {
    testName: 'Metabolic & Glycemic Profile (Fasting Glucose, Fasting Insulin, HbA1c, Lipids)',
    purpose: 'Evaluates insulin resistance (HOMA-IR index) and cardiovascular metabolic health.',
    idealTiming: 'Requires 8–10 hours of overnight fasting.'
  },
  {
    testName: 'Anti-Müllerian Hormone (AMH)',
    purpose: 'Reflects the pool of growing antral follicles; significantly elevated levels are common in PCOS.',
    idealTiming: 'Can be drawn on any day of the menstrual cycle.'
  }
];

export const SPECIALIST_GUIDANCE = [
  {
    role: 'Gynecologist (OB/GYN)',
    why: 'First-line specialist for cycle regulation, pelvic ultrasound evaluation, and fertility counseling.',
    icon: 'Stethoscope'
  },
  {
    role: 'Endocrinologist',
    why: 'Hormone specialist if insulin resistance, severe metabolic markers, or complex hormonal imbalances are present.',
    icon: 'Activity'
  },
  {
    role: 'Dermatologist',
    why: 'Provides targeted medical therapies for persistent hormonal cystic acne, hirsutism, or scalp hair fall.',
    icon: 'Sparkles'
  },
  {
    role: 'Registered Clinical Dietitian',
    why: 'Designs tailored low-glycemic, anti-inflammatory meal patterns aligned with traditional Indian dietary staples.',
    icon: 'Apple'
  }
];
