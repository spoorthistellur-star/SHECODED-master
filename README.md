# SheDecoded
> **Tagline:** Making Women's Health Easier to Understand.
> *A tech-forward, privacy-focused platform for understanding symptoms, planning personal health steps, and guiding appropriate clinical care.*

---

## 🌟 Key Features

1. **User Authentication & Consultation History**:
   - Create an account or log in securely with local browser storage.
   - Saves historical symptom logs and previous consultations for quick retrieval.

2. **Personalized Care Action Timeline ("What to do Tomorrow / Next Month")**:
   - Structured timeline covering **Immediate (Today/Tomorrow)**, **This Week**, **Next Month (Cycle Tracking)**, and **Long-Term Sustained Habits**.
   - Check off completed actions as you prepare for doctor appointments and healthy routines.

3. **Multilingual & Code-Mixed Input**:
   - Supports **Kannada (ಕನ್ನಡ)**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, **Telugu (తెలుగు)**, and **English**.
   - Handles transliterated & colloquial phrases (*"periods late aagide"*, *"mahina chadh gaya"*, *"face la mudi"*, *"pet me charbi"*, *"irregular dates"*).
   - Real-time **Speech-to-Text Voice Input** via the Web Speech API.

4. **Regional Audio Read-Aloud**:
   - Listen to full symptom explanations in Telugu, Kannada, Hindi, Tamil, or English with native synthesized speech.

5. **Interactive Symptom Refinement & Checklists**:
   - Structured symptom extraction mapped to **SNOMED CT** terms.
   - Interactive checkbox cards on Page 2 allowing users to mark, refine, or add any symptoms directly.

6. **Smart Follow-Up Questions with Submit**:
   - Targeted questions (cycle intervals, duration, metabolic changes, medications).
   - Quick tappable chips with **dedicated "Submit Answers & Re-Analyze Symptoms" buttons** for instant recalculation.

7. **Clinical Pattern Matching (Rotterdam Criteria)**:
   - Evaluates symptoms against the **Rotterdam 2-of-3 Criteria** (Ovulatory dysfunction, Hyperandrogenism, Polycystic ovaries).
   - Differential overlap view comparing PCOS, Thyroid dysfunction, Hyperprolactinemia, and Hypothalamic stress.
   - Strict non-diagnostic safety guardrails (blocks phrasing like *"you have PCOS"* in favor of educational framing).

8. **Red-Flag Emergency Screener**:
   - Immediate detection of heavy hemorrhage (soaking pad <1–2 hrs), acute severe pelvic pain, ectopic pregnancy risk, syncope, and emotional distress.
   - Prominently displays emergency contact numbers: **112**, **108/102**, and **Tele-MANAS (14416 / 1800-891-4416)**.

9. **Doctor Consultation Brief**:
   - Printable and shareable summary formatted for your Gynecologist or Endocrinologist visit.
   - Includes 1-click **Print / Save as PDF**, **Copy to Clipboard**, and **Share via WhatsApp**.

---

## 🚀 How to Run the Project

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes bundled with Node.js)

### Step 1: Clone or Extract the Project
Extract the zip file to your preferred folder:
```bash
cd hackathon
```

### Step 2: Install Dependencies
Run the following command in PowerShell, Terminal, or Command Prompt:
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Open in Your Browser
Once the server starts, open your browser and go to:
```
http://localhost:5173/
```

---

## 🏗️ Project Structure

```
├── src/
│   ├── types/
│   │   └── index.ts                 # TypeScript types (Symptom, Assessment, Language)
│   ├── services/
│   │   ├── languageDetector.ts      # Indian language & code-mixed detector
│   │   ├── normalizer.ts            # Regional colloquialisms dictionary & normalizer
│   │   ├── redFlags.ts              # Emergency safety screening & crisis lines
│   │   ├── symptomExtractor.ts      # NER extraction & SNOMED CT ontology
│   │   ├── knowledgeBase.ts         # Rotterdam criteria, lab tests, specialists
│   │   ├── evaluator.ts             # Pattern matching & non-diagnostic guardrails
│   │   ├── translations.ts          # Complete translations for EN, KN, HI, TA, TE
│   │   ├── speechService.ts         # Web Speech API (STT & TTS audio)
│   │   └── geminiService.ts         # Optional Google Gemini 2.5 Flash SDK integration
│   ├── components/
│   │   ├── Navbar.tsx               # Header with language switcher & safety bar
│   │   ├── VoiceInput.tsx           # Microphone recording with animated waveform
│   │   ├── InputSection.tsx         # Multilingual textarea & quick sample prompts
│   │   ├── RedFlagAlert.tsx         # Emergency banner & helplines (112, Tele-MANAS)
│   │   ├── ExtractedSymptomsCard.tsx# Structured symptoms & interactive checklist
│   │   ├── FollowUpQuestions.tsx    # Tappable questions & Re-Analyze Submit button
│   │   ├── ExplanationCard.tsx      # Grade 6-8 explanation & Rotterdam meter
│   │   ├── DifferentialConditions.tsx# PCOS vs Thyroid vs Prolactin overlap
│   │   ├── DoctorConsultationCard.tsx# Specialist care & lab tests checklist
│   │   ├── DoctorSummaryModal.tsx   # Printable PDF/WhatsApp consultation brief
│   │   ├── EducationalSnippets.tsx  # Ovary biology, insulin, Indian nutrition
│   │   ├── FeedbackWidget.tsx       # User feedback & rating
│   │   └── ApiKeyModal.tsx          # Optional Gemini API key configuration
│   ├── App.tsx                      # Main application flow & state manager
│   ├── index.css                    # Tailwind CSS & print media styles
│   └── main.tsx                     # React entrypoint
├── index.html                       # HTML shell with Inter typography
├── tailwind.config.js               # Tailwind design system configuration
├── tsconfig.json                    # TypeScript compiler configuration
└── package.json                     # Dependencies & scripts
```

---

## 🔒 Privacy & Safety Notice
This tool is for educational purposes only and does **not** provide a medical diagnosis. All symptom evaluation is performed locally in the browser to safeguard personal privacy. Always consult a qualified medical professional for health concerns.
