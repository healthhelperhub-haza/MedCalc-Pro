
// Import both Calculator and Specialty types from types.ts
import { Calculator, Specialty } from './types.ts';

export const CALCULATORS: Calculator[] = [
  // --- PHARMACOLOGY ---
  {
    id: 'standard-dose',
    name: 'Standard Dose (Ordered/On-Hand)',
    shortName: 'Dose Calc',
    specialty: 'Pharmacology',
    description: 'Calculates volume (mL) to administer based on ordered dose and concentration.',
    inputs: [
      { id: 'desired', name: 'Ordered Dose', unit: 'mg', type: 'number' },
      { id: 'have', name: 'On-Hand Dose', unit: 'mg', type: 'number' },
      { id: 'volume', name: 'On-Hand Volume', unit: 'mL', type: 'number' }
    ],
    formula: (v) => {
      const amount = (v.desired / v.have) * v.volume;
      return { value: amount.toFixed(2), unit: 'mL' };
    }
  },
  {
    id: 'weight-dosing',
    name: 'Weight-Based Dosing (mg/kg)',
    shortName: 'mg/kg Dosing',
    specialty: 'Pharmacology',
    description: 'Calculates total dose based on patient weight and mg/kg order.',
    inputs: [
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'rate', name: 'Dose Rate', unit: 'mg/kg', type: 'number' }
    ],
    formula: (v) => {
      const dose = v.weight * v.rate;
      return { value: dose.toFixed(1), unit: 'mg' };
    }
  },
  {
    id: 'bsa-dosing',
    name: 'BSA-Based Dosing (mg/m²)',
    shortName: 'mg/m² Dosing',
    specialty: 'Pharmacology',
    description: 'Calculates total dose based on Body Surface Area (BSA).',
    inputs: [
      { id: 'bsa', name: 'BSA', unit: 'm²', type: 'number' },
      { id: 'rate', name: 'Dose Rate', unit: 'mg/m²', type: 'number' }
    ],
    formula: (v) => {
      const dose = v.bsa * v.rate;
      return { value: dose.toFixed(1), unit: 'mg' };
    }
  },
  {
    id: 'infusion-rate',
    name: 'Infusion Flow Rate',
    shortName: 'Flow Rate',
    specialty: 'Pharmacology',
    description: 'Calculates the mL/hr rate for an IV pump.',
    inputs: [
      { id: 'vol', name: 'Total Volume', unit: 'mL', type: 'number' },
      { id: 'time', name: 'Time', unit: 'hrs', type: 'number' }
    ],
    formula: (v) => {
      const rate = v.vol / v.time;
      return { value: rate.toFixed(1), unit: 'mL/hr' };
    }
  },
  {
    id: 'mcg-kg-min',
    name: 'mcg/kg/min Infusion',
    shortName: 'mcg/kg/min',
    specialty: 'Critical Care',
    description: 'Calculates infusion rate for continuous vasoactive drips.',
    inputs: [
      { id: 'dose', name: 'Desired Dose', unit: 'mcg/kg/min', type: 'number' },
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'conc', name: 'Concentration', unit: 'mg/mL', type: 'number' }
    ],
    formula: (v) => {
      const rate = (v.dose * v.weight * 60) / (v.conc * 1000);
      return { value: rate.toFixed(1), unit: 'mL/hr' };
    }
  },
  {
    id: 'dilution',
    name: 'Dilution Formula (C1V1 = C2V2)',
    shortName: 'Dilution',
    specialty: 'Pharmacology',
    description: 'Calculate volume of stock solution needed for a specific dilution.',
    inputs: [
      { id: 'c1', name: 'Stock Conc (C1)', unit: '%', type: 'number' },
      { id: 'c2', name: 'Desired Conc (C2)', unit: '%', type: 'number' },
      { id: 'v2', name: 'Desired Vol (V2)', unit: 'mL', type: 'number' }
    ],
    formula: (v) => {
      const v1 = (v.c2 * v.v2) / v.c1;
      return { value: v1.toFixed(2), unit: 'mL of Stock', interpretation: `Add ${(v.v2 - v1).toFixed(2)}mL diluent.` };
    }
  },
  {
    id: 'alligation',
    name: 'Alligation Alternate',
    shortName: 'Alligation',
    specialty: 'Pharmacology',
    description: 'Mix two strengths to get an intermediate strength.',
    inputs: [
      { id: 'high', name: 'Higher Conc', unit: '%', type: 'number' },
      { id: 'low', name: 'Lower Conc', unit: '%', type: 'number' },
      { id: 'want', name: 'Desired Conc', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const partsHigh = v.want - v.low;
      const partsLow = v.high - v.want;
      return { value: `${partsHigh}:${partsLow}`, unit: 'Ratio', interpretation: `${partsHigh} parts of ${v.high}% and ${partsLow} parts of ${v.low}%` };
    }
  },
  {
    id: 'reconstitution',
    name: 'Reconstitution Displacement',
    shortName: 'Reconstitution',
    specialty: 'Pharmacology',
    description: 'Calculates the volume of powder displacement during reconstitution.',
    inputs: [
      { id: 'final', name: 'Final Volume', unit: 'mL', type: 'number' },
      { id: 'added', name: 'Diluent Added', unit: 'mL', type: 'number' }
    ],
    formula: (v) => {
      const displacement = v.final - v.added;
      return { value: displacement.toFixed(2), unit: 'mL', interpretation: 'Volume displaced by powder.' };
    }
  },
  {
    id: 'mme',
    name: 'Narcotic Equivalence (MME)',
    shortName: 'MME',
    specialty: 'Pharmacology',
    description: 'Morphine Milligram Equivalents for opioid risk assessment.',
    inputs: [
      { id: 'dose', name: 'Daily Dose', unit: 'mg', type: 'number' },
      { id: 'drug', name: 'Opioid Type', unit: '', type: 'select', options: [
        { label: 'Morphine', value: 1 },
        { label: 'Oxycodone', value: 1.5 },
        { label: 'Hydrocodone', value: 1 },
        { label: 'Hydromorphone', value: 4 },
        { label: 'Fentanyl (mcg/hr)', value: 2.4 },
        { label: 'Methadone', value: 4 }
      ]}
    ],
    formula: (v) => {
      const mme = v.dose * v.drug;
      return { value: mme.toFixed(1), unit: 'MME/day', interpretation: mme >= 50 ? 'Increased risk of overdose' : 'Lower risk' };
    }
  },
  {
    id: 'remaining-infusion',
    name: 'Remaining Infusion Time',
    shortName: 'Infusion Time',
    specialty: 'Pharmacology',
    description: 'Estimates how long until an IV bag is empty.',
    inputs: [
      { id: 'vol', name: 'Volume Left', unit: 'mL', type: 'number' },
      { id: 'rate', name: 'Flow Rate', unit: 'mL/hr', type: 'number' }
    ],
    formula: (v) => {
      const totalMin = (v.vol / v.rate) * 60;
      const hrs = Math.floor(totalMin / 60);
      const mins = Math.round(totalMin % 60);
      return { value: `${hrs}h ${mins}m`, unit: 'Remaining', interpretation: 'Estimated time until empty.' };
    }
  },

  // --- GENERAL ---
  {
    id: 'bmi',
    name: 'Body Mass Index (BMI)',
    shortName: 'BMI',
    specialty: 'General',
    description: 'Measures body fat based on height and weight.',
    inputs: [
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'h', name: 'Height', unit: 'cm', type: 'number' }
    ],
    formula: (v) => {
      const bmi = v.w / ((v.h / 100) ** 2);
      let interp = 'Normal';
      if (bmi < 18.5) interp = 'Underweight';
      else if (bmi >= 25 && bmi < 30) interp = 'Overweight';
      else if (bmi >= 30) interp = 'Obese';
      return { value: bmi.toFixed(1), unit: 'kg/m²', interpretation: interp };
    }
  },
  {
    id: 'bsa',
    name: 'Body Surface Area (Mosteller)',
    shortName: 'BSA',
    specialty: 'General',
    description: 'Calculates BSA, commonly used for drug dosing in oncology.',
    inputs: [
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'h', name: 'Height', unit: 'cm', type: 'number' }
    ],
    formula: (v) => {
      const bsa = Math.sqrt((v.h * v.w) / 3600);
      return { value: bsa.toFixed(2), unit: 'm²' };
    }
  },
  {
    id: 'ibw',
    name: 'Ideal Body Weight (Devine)',
    shortName: 'IBW',
    specialty: 'General',
    description: 'Estimates healthy weight based on height and gender.',
    inputs: [
      { id: 'h', name: 'Height', unit: 'cm', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }] }
    ],
    formula: (v) => {
      const hInch = v.h / 2.54;
      let ibw = 0;
      if (v.sex === 1) ibw = 50 + 2.3 * (hInch - 60);
      else ibw = 45.5 + 2.3 * (hInch - 60);
      return { value: ibw.toFixed(1), unit: 'kg' };
    }
  },
  {
    id: 'bmr',
    name: 'Basal Metabolic Rate (Mifflin-St Jeor)',
    shortName: 'BMR',
    specialty: 'General',
    description: 'Daily calories needed at rest.',
    inputs: [
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'h', name: 'Height', unit: 'cm', type: 'number' },
      { id: 'a', name: 'Age', unit: 'yrs', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }] }
    ],
    formula: (v) => {
      let bmr = (10 * v.w) + (6.25 * v.h) - (5 * v.a);
      bmr = v.sex === 1 ? bmr + 5 : bmr - 161;
      return { value: Math.round(bmr).toString(), unit: 'kcal/day' };
    }
  },
  {
    id: 'anc',
    name: 'Absolute Neutrophil Count',
    shortName: 'ANC',
    specialty: 'General',
    description: 'Assesses infection risk in neutropenic patients.',
    inputs: [
      { id: 'wbc', name: 'WBC Count', unit: 'cells/mm³', type: 'number' },
      { id: 'neut', name: 'Neutrophils %', unit: '%', type: 'number' },
      { id: 'bands', name: 'Bands %', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const anc = (v.wbc * (v.neut + v.bands)) / 100;
      let interp = 'Normal';
      if (anc < 500) interp = 'Severe Neutropenia';
      else if (anc < 1500) interp = 'Mild-Mod Neutropenia';
      return { value: Math.round(anc).toString(), unit: 'cells/mm³', interpretation: interp };
    }
  },
  {
    id: 'corrected-ca',
    name: 'Corrected Calcium',
    shortName: 'Corr Ca',
    specialty: 'General',
    description: 'Adjusts calcium levels for patients with low albumin.',
    inputs: [
      { id: 'ca', name: 'Total Calcium', unit: 'mg/dL', type: 'number' },
      { id: 'alb', name: 'Serum Albumin', unit: 'g/dL', type: 'number' }
    ],
    formula: (v) => {
      const corr = v.ca + 0.8 * (4.0 - v.alb);
      return { value: corr.toFixed(1), unit: 'mg/dL' };
    }
  },
  {
    id: 'curb65',
    name: 'CURB-65 Severity Score',
    shortName: 'CURB-65',
    specialty: 'General',
    description: 'Predicts mortality in community-acquired pneumonia.',
    inputs: [
      { id: 'c', name: 'Confusion', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'u', name: 'Urea >19 mg/dL', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'r', name: 'RR ≥30', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'b', name: 'BP (SBP <90 or DBP ≤60)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Age ≥65', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.c + v.u + v.r + v.b + v.a;
      let interp = 'Low Risk';
      if (score >= 3) interp = 'High Risk - Consider ICU';
      else if (score >= 2) interp = 'Moderate Risk - Hospitalize';
      return { value: score.toString(), unit: 'Points', interpretation: interp };
    }
  },

  // --- EMERGENCY ---
  {
    id: 'corrected-na',
    name: 'Corrected Sodium (Hyperglycemia)',
    shortName: 'Corr Na',
    specialty: 'Emergency',
    description: 'Adjusts serum sodium for the effects of hyperglycemia.',
    inputs: [
      { id: 'na', name: 'Measured Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'glu', name: 'Glucose', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const corr = v.na + 1.6 * ((v.glu - 100) / 100);
      return { value: corr.toFixed(1), unit: 'mEq/L' };
    }
  },
  {
    id: 'heart-score',
    name: 'HEART Score for Chest Pain',
    shortName: 'HEART Score',
    specialty: 'Emergency',
    description: 'Predicts major adverse cardiac events.',
    inputs: [
      { id: 'h', name: 'History', unit: '', type: 'select', options: [{ label: 'Slightly suspicious', value: 0 }, { label: 'Moderately suspicious', value: 1 }, { label: 'Highly suspicious', value: 2 }] },
      { id: 'e', name: 'ECG', unit: '', type: 'select', options: [{ label: 'Normal', value: 0 }, { label: 'Non-specific', value: 1 }, { label: 'ST-deviation', value: 2 }] },
      { id: 'a', name: 'Age', unit: '', type: 'select', options: [{ label: '<45', value: 0 }, { label: '45-64', value: 1 }, { label: '≥65', value: 2 }] },
      { id: 'r', name: 'Risk Factors', unit: '', type: 'select', options: [{ label: '0 factors', value: 0 }, { label: '1-2 factors', value: 1 }, { label: '≥3 factors', value: 2 }] },
      { id: 't', name: 'Troponin', unit: '', type: 'select', options: [{ label: '≤Normal', value: 0 }, { label: '1-3x Normal', value: 1 }, { label: '>3x Normal', value: 2 }] }
    ],
    formula: (v) => {
      const score = v.h + v.e + v.a + v.r + v.t;
      let interp = 'Low Risk (0.9-1.7%)';
      if (score >= 7) interp = 'High Risk (50-65%)';
      else if (score >= 4) interp = 'Intermediate Risk (12-16%)';
      return { value: score.toString(), unit: 'Points', interpretation: interp };
    }
  },
  {
    id: 'centor',
    name: 'Centor Criteria (Strep Throat)',
    shortName: 'Centor',
    specialty: 'Emergency',
    description: 'Probability of bacterial vs. viral pharyngitis.',
    inputs: [
      { id: 'f', name: 'History of Fever', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 't', name: 'Tonsillar Exudates', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'n', name: 'Ant. Cervical Lymphadenopathy', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'c', name: 'Absence of Cough', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Age', unit: '', type: 'select', options: [{ label: '3-14 yrs', value: 1 }, { label: '15-44 yrs', value: 0 }, { label: '≥45 yrs', value: -1 }] }
    ],
    formula: (v) => {
      const score = v.f + v.t + v.n + v.c + v.a;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 4 ? 'Suggest Strep - Treat' : 'Likely Viral' };
    }
  },

  // --- CRITICAL CARE ---
  {
    id: 'aa-gradient',
    name: 'Alveolar-arterial (A-a) Gradient',
    shortName: 'A-a Grad',
    specialty: 'Critical Care',
    description: 'Helps identify the cause of hypoxia.',
    inputs: [
      { id: 'fio2', name: 'FiO2', unit: '%', type: 'number', defaultValue: 21 },
      { id: 'paco2', name: 'PaCO2', unit: 'mmHg', type: 'number' },
      { id: 'pao2', name: 'PaO2', unit: 'mmHg', type: 'number' }
    ],
    formula: (v) => {
      const gradient = ((v.fio2 / 100) * 713 - (v.paco2 / 0.8)) - v.pao2;
      return { value: gradient.toFixed(1), unit: 'mmHg' };
    }
  },
  {
    id: 'map',
    name: 'Mean Arterial Pressure',
    shortName: 'MAP',
    specialty: 'Critical Care',
    description: 'Average arterial pressure during a single cardiac cycle.',
    inputs: [
      { id: 'sbp', name: 'Systolic BP', unit: 'mmHg', type: 'number' },
      { id: 'dbp', name: 'Diastolic BP', unit: 'mmHg', type: 'number' }
    ],
    formula: (v) => {
      const map = (v.sbp + 2 * v.dbp) / 3;
      return { value: map.toFixed(0), unit: 'mmHg', interpretation: map < 65 ? 'Inadequate perfusion' : 'Normal' };
    }
  },
  {
    id: 'sirs',
    name: 'SIRS Criteria',
    shortName: 'SIRS',
    specialty: 'Critical Care',
    description: 'Systemic Inflammatory Response Syndrome criteria.',
    inputs: [
      { id: 't', name: 'Temp >38°C or <36°C', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'h', name: 'HR >90', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'r', name: 'RR >20 or PaCO2 <32', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'w', name: 'WBC >12k or <4k', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.t + v.h + v.r + v.w;
      return { value: score.toString(), unit: 'Criteria', interpretation: score >= 2 ? 'SIRS Positive' : 'SIRS Negative' };
    }
  },
  {
    id: 'pf-ratio',
    name: 'PaO2/FiO2 Ratio',
    shortName: 'P/F Ratio',
    specialty: 'Critical Care',
    description: 'Assesses severity of respiratory failure (ALI/ARDS).',
    inputs: [
      { id: 'pao2', name: 'PaO2', unit: 'mmHg', type: 'number' },
      { id: 'fio2', name: 'FiO2', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const ratio = v.pao2 / (v.fio2 / 100);
      let interp = 'Normal';
      if (ratio < 100) interp = 'Severe ARDS';
      else if (ratio < 200) interp = 'Moderate ARDS';
      else if (ratio < 300) interp = 'Mild ARDS';
      return { value: ratio.toFixed(0), unit: '', interpretation: interp };
    }
  },
  {
    id: 'qsofa',
    name: 'qSOFA Score',
    shortName: 'qSOFA',
    specialty: 'Critical Care',
    description: 'Quick Sequential Organ Failure Assessment for sepsis risk.',
    inputs: [
      { id: 'r', name: 'RR ≥22', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'm', name: 'Altered Mental Status', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 's', name: 'SBP ≤100', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.r + v.m + v.s;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 2 ? 'High risk of poor outcome' : 'Low risk' };
    }
  },
  {
    id: 'anion-gap',
    name: 'Anion Gap',
    shortName: 'Anion Gap',
    specialty: 'Critical Care',
    description: 'Calculates the gap between primary measured cations and anions.',
    inputs: [
      { id: 'na', name: 'Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'cl', name: 'Chloride', unit: 'mEq/L', type: 'number' },
      { id: 'hco3', name: 'Bicarbonate', unit: 'mEq/L', type: 'number' }
    ],
    formula: (v) => {
      const gap = v.na - (v.cl + v.hco3);
      return { value: gap.toFixed(1), unit: 'mEq/L', interpretation: gap > 12 ? 'High Anion Gap' : 'Normal' };
    }
  },
  {
    id: 'bicarb-deficit',
    name: 'Bicarbonate Deficit',
    shortName: 'Bicarb Def',
    specialty: 'Critical Care',
    description: 'Calculates amount of bicarbonate to correct acidosis.',
    inputs: [
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'desired', name: 'Desired HCO3', unit: 'mEq/L', type: 'number', defaultValue: 24 },
      { id: 'meas', name: 'Measured HCO3', unit: 'mEq/L', type: 'number' }
    ],
    formula: (v) => {
      const deficit = 0.4 * v.w * (v.desired - v.meas);
      return { value: deficit.toFixed(1), unit: 'mEq' };
    }
  },
  {
    id: 'wells-pe',
    name: "Wells' Criteria for Pulmonary Embolism",
    shortName: "Wells' PE",
    specialty: 'Critical Care',
    description: 'Predicts probability of Pulmonary Embolism.',
    inputs: [
      { id: 's', name: 'Signs of DVT', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 3 }] },
      { id: 'o', name: 'Other dx less likely', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 3 }] },
      { id: 'h', name: 'HR >100', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1.5 }] },
      { id: 'i', name: 'Immobilization/Surgery', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1.5 }] },
      { id: 'p', name: 'Prior PE/DVT', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1.5 }] },
      { id: 'hm', name: 'Hemoptysis', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'm', name: 'Malignancy', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.s + v.o + v.h + v.i + v.p + v.hm + v.m;
      let interp = 'PE Unlikely';
      if (score > 4) interp = 'PE Likely';
      return { value: score.toString(), unit: 'Points', interpretation: interp };
    }
  },
  {
    id: 'gcs',
    name: 'Glasgow Coma Scale',
    shortName: 'GCS',
    specialty: 'Critical Care',
    description: 'Neurological scale for assessing level of consciousness.',
    inputs: [
      { id: 'e', name: 'Eye Opening', unit: '', type: 'select', options: [{ label: 'Spontaneous', value: 4 }, { label: 'To Speech', value: 3 }, { label: 'To Pain', value: 2 }, { label: 'None', value: 1 }] },
      { id: 'v', name: 'Verbal Response', unit: '', type: 'select', options: [{ label: 'Oriented', value: 5 }, { label: 'Confused', value: 4 }, { label: 'Inappropriate', value: 3 }, { label: 'Incomprehensible', value: 2 }, { label: 'None', value: 1 }] },
      { id: 'm', name: 'Motor Response', unit: '', type: 'select', options: [{ label: 'Obeys', value: 6 }, { label: 'Localizes Pain', value: 5 }, { label: 'Withdraws Pain', value: 4 }, { label: 'Flexion', value: 3 }, { label: 'Extension', value: 2 }, { label: 'None', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.e + v.v + v.m;
      let interp = 'Severe Brain Injury (GCS ≤8)';
      if (score >= 13) interp = 'Mild Brain Injury';
      else if (score >= 9) interp = 'Moderate Brain Injury';
      return { value: score.toString(), unit: '/15', interpretation: interp };
    }
  },
  {
    id: 'parkland',
    name: 'Parkland Formula (Burns)',
    shortName: 'Parkland',
    specialty: 'Critical Care',
    description: 'Fluid resuscitation for burn victims (first 24h).',
    inputs: [
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'tbsa', name: 'Burn TBSA', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const total = 4 * v.w * v.tbsa;
      return { value: Math.round(total).toString(), unit: 'mL', interpretation: `Give ${Math.round(total/2)}mL in first 8h.` };
    }
  },

  // --- NEPHROLOGY ---
  {
    id: 'feurea',
    name: 'Fractional Excretion of Urea (FeUrea)',
    shortName: 'FeUrea',
    specialty: 'Nephrology',
    description: 'Useful for AKI assessment when diuretics are present.',
    inputs: [
      { id: 'u_urea', name: 'Urinary Urea', unit: 'mg/dL', type: 'number' },
      { id: 'p_urea', name: 'Serum Urea', unit: 'mg/dL', type: 'number' },
      { id: 'u_cr', name: 'Urinary Creatinine', unit: 'mg/dL', type: 'number' },
      { id: 'p_cr', name: 'Serum Creatinine', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const feurea = ((v.u_urea * v.p_cr) / (v.p_urea * v.u_cr)) * 100;
      let interp = 'Intrinsic AKI (>35%)';
      if (feurea < 35) interp = 'Prerenal Azotemia (<35%)';
      return { value: feurea.toFixed(1), unit: '%', interpretation: interp };
    }
  },
  {
    id: 'fena',
    name: 'Fractional Excretion of Sodium (FeNa)',
    shortName: 'FeNa',
    specialty: 'Nephrology',
    description: 'Differentiates between prerenal and intrinsic AKI.',
    inputs: [
      { id: 'u_na', name: 'Urinary Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'p_na', name: 'Plasma Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'u_cr', name: 'Urinary Creatinine', unit: 'mg/dL', type: 'number' },
      { id: 'p_cr', name: 'Plasma Creatinine', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const fena = ((v.u_na * v.p_cr) / (v.p_na * v.u_cr)) * 100;
      let interp = 'Intrinsic AKI (ATN)';
      if (fena < 1) interp = 'Prerenal Azotemia';
      return { value: fena.toFixed(1), unit: '%', interpretation: interp };
    }
  },
  {
    id: 'water-deficit',
    name: 'Free Water Deficit',
    shortName: 'Water Def',
    specialty: 'Nephrology',
    description: 'Calculates water needed to correct hypernatremia.',
    inputs: [
      { id: 'na', name: 'Serum Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male (0.6)', value: 0.6 }, { label: 'Female (0.5)', value: 0.5 }] }
    ],
    formula: (v) => {
      const deficit = v.sex * v.w * (v.na / 140 - 1);
      return { value: deficit.toFixed(1), unit: 'Liters' };
    }
  },
  {
    id: 'crcl',
    name: 'Creatinine Clearance (Cockcroft-Gault)',
    shortName: 'CrCl',
    specialty: 'Nephrology',
    description: 'Estimation of GFR using Cockcroft-Gault equation.',
    inputs: [
      { id: 'age', name: 'Age', unit: 'yrs', type: 'number' },
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'scr', name: 'Serum Creatinine', unit: 'mg/dL', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0.85 }] }
    ],
    formula: (v) => {
      const result = ((140 - v.age) * v.w) / (72 * v.scr) * v.sex;
      return { value: result.toFixed(1), unit: 'mL/min' };
    }
  },

  // --- CARDIOLOGY ---
  {
    id: 'has-bled',
    name: 'HAS-BLED Bleeding Risk',
    shortName: 'HAS-BLED',
    specialty: 'Cardiology',
    description: 'Risk of major bleeding for AFib patients on anticoagulants.',
    inputs: [
      { id: 'h', name: 'Hypertension', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Abnormal Renal/Liver (each)', unit: '', type: 'select', options: [{ label: 'None', value: 0 }, { label: 'One', value: 1 }, { label: 'Both', value: 2 }] },
      { id: 's', name: 'Stroke History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'b', name: 'Bleeding History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'l', name: 'Labile INR', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'e', name: 'Elderly (>65)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'd', name: 'Drugs/Alcohol (each)', unit: '', type: 'select', options: [{ label: 'None', value: 0 }, { label: 'One', value: 1 }, { label: 'Both', value: 2 }] }
    ],
    formula: (v) => {
      const score = v.h + v.a + v.s + v.b + v.l + v.e + v.d;
      let interp = 'Low Risk';
      if (score >= 3) interp = 'High Risk - Caution with Anticoagulation';
      return { value: score.toString(), unit: 'Points', interpretation: interp };
    }
  },
  {
    id: 'ldl',
    name: 'LDL Cholesterol (Friedewald)',
    shortName: 'LDL Calc',
    specialty: 'Cardiology',
    description: 'Calculates LDL based on Total, HDL, and Triglycerides.',
    inputs: [
      { id: 't', name: 'Total Cholesterol', unit: 'mg/dL', type: 'number' },
      { id: 'h', name: 'HDL Cholesterol', unit: 'mg/dL', type: 'number' },
      { id: 'tg', name: 'Triglycerides', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const ldl = v.t - v.h - (v.tg / 5);
      return { value: Math.round(ldl).toString(), unit: 'mg/dL' };
    }
  },
  {
    id: 'qtc',
    name: 'Corrected QT Interval (Bazett)',
    shortName: 'QTc',
    specialty: 'Cardiology',
    description: 'Adjusts QT interval for heart rate to assess arrhythmia risk.',
    inputs: [
      { id: 'qt', name: 'QT Interval', unit: 'ms', type: 'number' },
      { id: 'hr', name: 'Heart Rate', unit: 'bpm', type: 'number' }
    ],
    formula: (v) => {
      const qtc = v.qt / Math.sqrt(60 / v.hr);
      return { value: Math.round(qtc).toString(), unit: 'ms', interpretation: qtc > 440 ? 'Prolonged' : 'Normal' };
    }
  },
  {
    id: 'chads-vasc',
    name: 'CHA2DS2-VASc Score',
    shortName: 'CHADS-VASc',
    specialty: 'Cardiology',
    description: 'Stroke risk for patients with Atrial Fibrillation.',
    inputs: [
      { id: 'c', name: 'CHF History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'h', name: 'HTN History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a2', name: 'Age ≥75', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 2 }] },
      { id: 'd', name: 'Diabetes', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 's2', name: 'Stroke/TIA', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 2 }] },
      { id: 'v', name: 'Vascular Disease', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Age 65-74', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'sc', name: 'Sex (Female)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.c + v.h + v.a2 + v.d + v.s2 + v.v + v.a + v.sc;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 2 ? 'Anticoagulation Recommended' : 'Low-Mod Risk' };
    }
  },

  // --- GASTROENTEROLOGY ---
  {
    id: 'bisap',
    name: 'BISAP Score (Pancreatitis)',
    shortName: 'BISAP',
    specialty: 'Gastroenterology',
    description: 'Predicts mortality in acute pancreatitis.',
    inputs: [
      { id: 'b', name: 'BUN >25 mg/dL', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'i', name: 'Impaired Mental Status', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 's', name: 'SIRS Present', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Age >60', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'p', name: 'Pleural Effusion', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.b + v.i + v.s + v.a + v.p;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 3 ? 'High Mortality Risk' : 'Low Mortality Risk' };
    }
  },
  {
    id: 'meld',
    name: 'MELD Score (Liver)',
    shortName: 'MELD',
    specialty: 'Gastroenterology',
    description: 'Prognosis for patients with liver disease.',
    inputs: [
      { id: 'bili', name: 'Bilirubin', unit: 'mg/dL', type: 'number' },
      { id: 'inr', name: 'INR', unit: '', type: 'number' },
      { id: 'cr', name: 'Creatinine', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const meld = 3.78 * Math.log(v.bili || 1) + 11.2 * Math.log(v.inr || 1) + 9.57 * Math.log(v.cr || 1) + 6.43;
      return { value: Math.round(meld).toString(), unit: 'Score' };
    }
  },

  // --- PEDIATRICS ---
  {
    id: 'ped-fluids',
    name: 'Pediatric Maintenance Fluids (4-2-1 Rule)',
    shortName: '4-2-1 Rule',
    specialty: 'Pediatrics',
    description: 'Calculate hourly fluid maintenance requirements.',
    inputs: [
      { id: 'w', name: 'Weight', unit: 'kg', type: 'number' }
    ],
    formula: (v) => {
      let rate = 0;
      if (v.w <= 10) rate = v.w * 4;
      else if (v.w <= 20) rate = 40 + (v.w - 10) * 2;
      else rate = 60 + (v.w - 20) * 1;
      return { value: rate.toString(), unit: 'mL/hr' };
    }
  },
  {
    id: 'apgar',
    name: 'APGAR Score',
    shortName: 'APGAR',
    specialty: 'Pediatrics',
    description: 'Quick assessment of newborn health at 1 and 5 minutes.',
    inputs: [
      { id: 'h', name: 'Heart Rate', unit: '', type: 'select', options: [{ label: 'Absent', value: 0 }, { label: '<100 bpm', value: 1 }, { label: '≥100 bpm', value: 2 }] },
      { id: 'r', name: 'Respiration', unit: '', type: 'select', options: [{ label: 'Absent', value: 0 }, { label: 'Slow/Irreg', value: 1 }, { label: 'Good/Crying', value: 2 }] },
      { id: 't', name: 'Muscle Tone', unit: '', type: 'select', options: [{ label: 'Flaccid', value: 0 }, { label: 'Some Flex', value: 1 }, { label: 'Active', value: 2 }] },
      { id: 'g', name: 'Grimace', unit: '', type: 'select', options: [{ label: 'No response', value: 0 }, { label: 'Grimace', value: 1 }, { label: 'Cough/Sneeze', value: 2 }] },
      { id: 'c', name: 'Color', unit: '', type: 'select', options: [{ label: 'Blue/Pale', value: 0 }, { label: 'Extr Blue', value: 1 }, { label: 'Pink', value: 2 }] }
    ],
    formula: (v) => {
      const score = v.h + v.r + v.t + v.g + v.c;
      return { value: score.toString(), unit: '/10' };
    }
  },

  // --- OTHERS ---
  {
    id: 'pheny-corr',
    name: 'Corrected Phenytoin (Winter-Tozer)',
    shortName: 'Corr Pheny',
    specialty: 'Pharmacology',
    description: 'Adjusts phenytoin levels for hypoalbuminemia.',
    inputs: [
      { id: 'p', name: 'Measured Pheny', unit: 'mcg/mL', type: 'number' },
      { id: 'a', name: 'Serum Albumin', unit: 'g/dL', type: 'number' }
    ],
    formula: (v) => {
      const corr = v.p / (0.2 * v.a + 0.1);
      return { value: corr.toFixed(1), unit: 'mcg/mL' };
    }
  },
  {
    id: 'temp-conv',
    name: 'Temperature Converter',
    shortName: 'Temp Conv',
    specialty: 'General',
    description: 'Convert between Celsius and Fahrenheit.',
    inputs: [
      { id: 't', name: 'Temperature', unit: '', type: 'number' },
      { id: 'dir', name: 'Conversion', unit: '', type: 'select', options: [{ label: '°C to °F', value: 1 }, { label: '°F to °C', value: 2 }] }
    ],
    formula: (v) => {
      if (v.dir === 1) return { value: (v.t * 9/5 + 32).toFixed(1), unit: '°F' };
      return { value: ((v.t - 32) * 5/9).toFixed(1), unit: '°C' };
    }
  },
  {
    id: 'drip-rate',
    name: 'IV Drip Rate',
    shortName: 'Drip Rate',
    specialty: 'Pharmacology',
    description: 'Calculate drops per minute for IV infusions.',
    inputs: [
      { id: 'v', name: 'Volume', unit: 'mL', type: 'number' },
      { id: 't', name: 'Time', unit: 'min', type: 'number' },
      { id: 'df', name: 'Drop Factor', unit: 'gtt/mL', type: 'number', defaultValue: 20 }
    ],
    formula: (v) => {
      const rate = (v.v * v.df) / v.t;
      return { value: Math.round(rate).toString(), unit: 'gtt/min' };
    }
  }
];

export const SPECIALTIES: Specialty[] = ['General', 'Critical Care', 'Nephrology', 'Cardiology', 'Pediatrics', 'Pharmacology', 'Gastroenterology', 'Neurology', 'Emergency'];
