import React, { useState } from 'react';
import { X, Printer, Copy, Check, Share2, FileCheck, Stethoscope, AlertCircle } from 'lucide-react';
import { AssessmentResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface DoctorSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: AssessmentResult;
  rawInput: string;
  currentLang: SupportedLanguage;
}

export const DoctorSummaryModal: React.FC<DoctorSummaryModalProps> = ({
  isOpen,
  onClose,
  assessment,
  rawInput,
  currentLang
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generatePlainText = () => {
    const lines = [
      "SHEDECODED • WOMEN'S HEALTH CONSULTATION BRIEF (FOR CLINICAL DISCUSSION)",
      `Date: ${new Date(assessment.generatedAt).toLocaleDateString()}`,
      `Primary Input Language: ${assessment.detectedLanguage.toUpperCase()}`,
      "",
      "--- PATIENT'S NARRATIVE DESCRIPTION ---",
      `"${rawInput}"`,
      "",
      "--- IDENTIFIED CLINICAL SYMPTOMS (ROTTERDAM / SNOMED CT) ---",
      ...assessment.extractedSymptoms.map(
        s => `• ${s.name} [SNOMED: ${s.snomedCode || 'N/A'}] (Category: ${s.category}, Severity: ${s.severity})`
      ),
      "",
      "--- ROTTERDAM 2-OF-3 ALIGNMENT CHECK ---",
      `• Ovulatory Dysfunction: ${assessment.rotterdamCriteriaMatch.ovulatoryDysfunction ? 'Indicated' : 'Not reported'}`,
      `• Hyperandrogenism: ${assessment.rotterdamCriteriaMatch.hyperandrogenism ? 'Indicated' : 'Not reported'}`,
      `• Polycystic Morphology on USG: ${assessment.rotterdamCriteriaMatch.polycysticMorphologySigns ? 'Reported by patient' : 'Needs USG evaluation'}`,
      `Total Criteria Features Indicated: ${assessment.rotterdamCriteriaMatch.criteriaMetCount} of 3`,
      "",
      "--- RED FLAG SCREENING ---",
      assessment.redFlags.isTriggered
        ? `⚠️ ALERT: ${assessment.redFlags.headline} - ${assessment.redFlags.reason}`
        : "✅ No acute red flags (heavy hemorrhage, acute severe abdomen, syncope) detected in input.",
      "",
      "--- DIFFERENTIAL CONDITIONS TO DISCUSS ---",
      ...assessment.differentialConditions.map(c => `• ${c.conditionName} (${c.likelihoodCategory})`),
      "",
      "--- PROPOSED INVESTIGATIONS TO REVIEW WITH DOCTOR ---",
      ...assessment.careGuidance.testsToAskAbout.map(test => `• ${test.testName} (${test.purpose})`),
      "",
      "DISCLAIMER: This document is an informational consultation guide prepared by a non-diagnostic digital health tool. It does not constitute a clinical diagnosis."
    ];
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generatePlainText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header (Hidden in Print) */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500 text-white">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Doctor Consultation Summary Card
              </h3>
              <p className="text-[11px] text-slate-500">
                Ready to show to your Gynecologist or Endocrinologist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Share to WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 print-card">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-rose-600" />
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  Patient Symptom & Consultation Brief
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Prepared with SheDecoded • Rotterdam Framework Aligned
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono sm:text-right">
              <div>Date: {new Date(assessment.generatedAt).toLocaleDateString()}</div>
              <div>Urgency: {assessment.careGuidance.urgencyLevel.toUpperCase()}</div>
            </div>
          </div>

          {/* Section 1: Patient Narrative */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
              1. Patient&apos;s Stated Concerns (Original Input)
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm italic font-serif text-slate-700 leading-relaxed">
              &ldquo;{rawInput}&rdquo;
            </div>
          </div>

          {/* Section 2: Clinical Symptoms Inventory */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              2. Clinical Symptoms Extracted (SNOMED Aligned)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {assessment.extractedSymptoms.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-[10px] text-slate-500">{s.category} • Severity: {s.severity}</div>
                  </div>
                  {s.snomedCode && (
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {s.snomedCode}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Rotterdam 2-of-3 Criteria Status */}
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs">
            <h4 className="font-bold text-purple-950 uppercase tracking-wider text-xs mb-2">
              3. Rotterdam PCOS 2-of-3 Evaluation Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 bg-white rounded-lg border border-purple-100">
                <div className="font-semibold text-slate-900">Ovulatory Dysfunction</div>
                <div className={`text-[11px] font-bold ${assessment.rotterdamCriteriaMatch.ovulatoryDysfunction ? 'text-purple-700' : 'text-slate-400'}`}>
                  {assessment.rotterdamCriteriaMatch.ovulatoryDysfunction ? '✓ Indicated in History' : '✗ Not Reported'}
                </div>
              </div>

              <div className="p-2 bg-white rounded-lg border border-purple-100">
                <div className="font-semibold text-slate-900">Hyperandrogenism</div>
                <div className={`text-[11px] font-bold ${assessment.rotterdamCriteriaMatch.hyperandrogenism ? 'text-purple-700' : 'text-slate-400'}`}>
                  {assessment.rotterdamCriteriaMatch.hyperandrogenism ? '✓ Clinical Signs Present' : '✗ Not Reported'}
                </div>
              </div>

              <div className="p-2 bg-white rounded-lg border border-purple-100">
                <div className="font-semibold text-slate-900">Polycystic Ovarian Scan</div>
                <div className="text-[11px] font-bold text-slate-500">
                  {assessment.rotterdamCriteriaMatch.polycysticMorphologySigns ? '✓ Mentioned by Patient' : '○ Recommended USG'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Red Flag Status */}
          <div className={`p-3.5 rounded-xl border text-xs ${
            assessment.redFlags.isTriggered ? 'bg-red-50 border-red-300 text-red-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <span className="font-bold uppercase tracking-wider">Red Flag Screener: </span>
            {assessment.redFlags.isTriggered
              ? `FLAGGED: ${assessment.redFlags.headline} (${assessment.redFlags.reason})`
              : 'Negative for acute red flags (heavy flooding hemorrhage, severe acute abdomen, syncope).'}
          </div>

          {/* Section 5: Differential Diagnoses & Tests */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              4. Differential Considerations & Suggested Lab Investigations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800 mb-1">Differential Considerations:</div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {assessment.differentialConditions.map((c, i) => (
                    <li key={i}>{c.conditionName} ({c.likelihoodCategory})</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800 mb-1">Standard Diagnostic Tests to Consider:</div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {assessment.careGuidance.testsToAskAbout.map((tItem, i) => (
                    <li key={i}>{tItem.testName}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Clinical Disclaimer */}
          <div className="pt-3 border-t border-slate-200 flex items-start gap-2 text-[11px] text-slate-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Note for Clinician: This document is generated for patient-physician discussion. It does not represent a medical diagnosis or lab report. Clinical correlation, history, and examination remain standard of care.
            </p>
          </div>
        </div>

        {/* Footer (Hidden in Print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            {t.close}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-rose-600 text-white shadow-md shadow-rose-200 hover:bg-rose-700 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printSummaryBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
