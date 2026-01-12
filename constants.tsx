
// Import both Calculator and Specialty types from types.ts
import { Calculator, Specialty } from './types.ts';

export const CALCULATORS: Calculator[] = [
  // --- DRUG DISPENSING & PHARMACY ---
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
      return { value: amount.toFixed(2), unit: 'mL', interpretation: 'Volume to dispense/administer.' };
    }
  },
  {
    id: 'weight-dose',
    name: 'Weight-Based Dosing (mg/kg)',
    shortName: 'mg/kg Dose',
    specialty: 'Pharmacology',
    description: 'Calculates total dose based on patient weight and mg/kg order.',
    inputs: [
      { id: 'weight', name: 'Patient Weight', unit: 'kg', type: 'number' },
      { id: 'dose_per_kg', name: 'Ordered Dose', unit: 'mg/kg', type: 'number' }
    ],
    formula: (v) => {
      const total = v.weight * v.dose_per_kg;
      return { value: total.toFixed(1), unit: 'mg', interpretation: 'Total calculated dose.' };
    }
  },
  {
    id: 'bsa-dose',
    name: 'BSA-Based Dosing (mg/m²)',
    shortName: 'mg/m² Dose',
    specialty: 'Pharmacology',
    description: 'Calculates total dose based on Body Surface Area (BSA).',
    inputs: [
      { id: 'bsa', name: 'Patient BSA', unit: 'm²', type: 'number' },
      { id: 'dose_per_m2', name: 'Ordered Dose', unit: 'mg/m²', type: 'number' }
    ],
    formula: (v) => {
      const total = v.bsa * v.dose_per_m2;
      return { value: total.toFixed(1), unit: 'mg', interpretation: 'Total calculated dose.' };
    }
  },
  {
    id: 'infusion-rate',
    name: 'Infusion Flow Rate',
    shortName: 'mL/hr Rate',
    specialty: 'Pharmacology',
    description: 'Calculates the mL/hr rate for an IV pump.',
    inputs: [
      { id: 'volume', name: 'Total Volume', unit: 'mL', type: 'number' },
      { id: 'time', name: 'Time (hours)', unit: 'hr', type: 'number' }
    ],
    formula: (v) => {
      const rate = v.volume / v.time;
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
      // (mcg/kg/min * kg * 60 min/hr) / (conc * 1000 mcg/mg)
      const rate = (v.dose * v.weight * 60) / (v.conc * 1000);
      return { value: rate.toFixed(1), unit: 'mL/hr' };
    }
  },
  {
    id: 'dilution-v1',
    name: 'Dilution Formula (C1V1 = C2V2)',
    shortName: 'Dilution',
    specialty: 'Pharmacology',
    description: 'Calculate volume of stock solution needed for a specific dilution.',
    inputs: [
      { id: 'c2', name: 'Desired Concentration', unit: '%', type: 'number' },
      { id: 'v2', name: 'Desired Volume', unit: 'mL', type: 'number' },
      { id: 'c1', name: 'Stock Concentration', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const v1 = (v.c2 * v.v2) / v.c1;
      return { value: v1.toFixed(2), unit: 'mL', interpretation: `Use ${v1.toFixed(2)}mL of stock and add ${(v.v2 - v1).toFixed(2)}mL diluent.` };
    }
  },
  {
    id: 'alligation',
    name: 'Alligation Alternate',
    shortName: 'Alligation',
    specialty: 'Pharmacology',
    description: 'Mix two strengths to get an intermediate strength.',
    inputs: [
      { id: 'high', name: 'Higher Concentration', unit: '%', type: 'number' },
      { id: 'low', name: 'Lower Concentration', unit: '%', type: 'number' },
      { id: 'target', name: 'Desired Concentration', unit: '%', type: 'number' },
      { id: 'total', name: 'Desired Total Volume', unit: 'mL', type: 'number' }
    ],
    formula: (v) => {
      const highParts = v.target - v.low;
      const lowParts = v.high - v.target;
      const totalParts = highParts + lowParts;
      const vHigh = (highParts / totalParts) * v.total;
      const vLow = (lowParts / totalParts) * v.total;
      return { value: vHigh.toFixed(1), unit: 'mL High', interpretation: `Mix ${vHigh.toFixed(1)}mL of ${v.high}% with ${vLow.toFixed(1)}mL of ${v.low}%` };
    }
  },
  {
    id: 'powder-displace',
    name: 'Reconstitution Displacement',
    shortName: 'Recon',
    specialty: 'Pharmacology',
    description: 'Calculates the volume of powder displacement during reconstitution.',
    inputs: [
      { id: 'total_v', name: 'Total Final Volume', unit: 'mL', type: 'number' },
      { id: 'diluent_v', name: 'Diluent Added', unit: 'mL', type: 'number' }
    ],
    formula: (v) => {
      const displacement = v.total_v - v.diluent_v;
      return { value: displacement.toFixed(2), unit: 'mL', interpretation: 'Volume of the medication powder itself.' };
    }
  },
  {
    id: 'mme-calc',
    name: 'Narcotic Equivalence (MME)',
    shortName: 'MME',
    specialty: 'Pharmacology',
    description: 'Morphine Milligram Equivalents for opioid risk assessment.',
    inputs: [
      { id: 'drug', name: 'Opioid Type', unit: '', type: 'select', options: [
        { label: 'Morphine (1.0)', value: 1.0 },
        { label: 'Oxycodone (1.5)', value: 1.5 },
        { label: 'Hydrocodone (1.0)', value: 1.0 },
        { label: 'Hydromorphone (4.0)', value: 4.0 },
        { label: 'Codeine (0.15)', value: 0.15 },
        { label: 'Methadone (4.0)', value: 4.0 }
      ]},
      { id: 'dose', name: 'Daily Dose', unit: 'mg', type: 'number' }
    ],
    formula: (v) => {
      const mme = v.drug * v.dose;
      return { value: mme.toFixed(1), unit: 'MME/day', interpretation: mme >= 50 ? 'High Risk (>50 MME)' : 'Lower Risk' };
    }
  },
  {
    id: 'remaining-time',
    name: 'Remaining Infusion Time',
    shortName: 'Time Left',
    specialty: 'Pharmacology',
    description: 'Estimates how long until an IV bag is empty.',
    inputs: [
      { id: 'volume', name: 'Remaining Volume', unit: 'mL', type: 'number' },
      { id: 'rate', name: 'Current Rate', unit: 'mL/hr', type: 'number' }
    ],
    formula: (v) => {
      const hours = Math.floor(v.volume / v.rate);
      const minutes = Math.round(((v.volume / v.rate) - hours) * 60);
      return { value: `${hours}h ${minutes}m`, unit: 'remaining', interpretation: 'Estimated time until bag empty.' };
    }
  },

  // --- EXISTING CALCULATORS ---
  {
    id: 'bmi',
    name: 'Body Mass Index (BMI)',
    shortName: 'BMI',
    specialty: 'General',
    description: 'Measures body fat based on height and weight.',
    inputs: [
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'height', name: 'Height', unit: 'cm', type: 'number' }
    ],
    formula: (v) => {
      const heightM = v.height / 100;
      const bmi = v.weight / (heightM * heightM);
      let interpretation = 'Normal';
      if (bmi < 18.5) interpretation = 'Underweight';
      else if (bmi >= 25 && bmi < 30) interpretation = 'Overweight';
      else if (bmi >= 30) interpretation = 'Obese';
      return { value: bmi.toFixed(1), unit: 'kg/m²', interpretation };
    }
  },
  {
    id: 'bsa',
    name: 'Body Surface Area (Mosteller)',
    shortName: 'BSA',
    specialty: 'General',
    description: 'Calculates BSA, commonly used for drug dosing in oncology.',
    inputs: [
      { id: 'height', name: 'Height', unit: 'cm', type: 'number' },
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' }
    ],
    formula: (v) => {
      const bsa = Math.sqrt((v.height * v.weight) / 3600);
      return { value: bsa.toFixed(2), unit: 'm²' };
    }
  },
  {
    id: 'corr-na',
    name: 'Corrected Sodium (Hyperglycemia)',
    shortName: 'Corr Na',
    specialty: 'Emergency',
    description: 'Adjusts serum sodium for the effects of hyperglycemia.',
    inputs: [
      { id: 'na', name: 'Measured Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'glu', name: 'Serum Glucose', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const corrected = v.na + 0.016 * (v.glu - 100);
      return { value: corrected.toFixed(1), unit: 'mEq/L' };
    }
  },
  {
    id: 'aa-grad',
    name: 'Alveolar-arterial (A-a) Gradient',
    shortName: 'A-a Gradient',
    specialty: 'Critical Care',
    description: 'Helps identify the cause of hypoxia.',
    inputs: [
      { id: 'fio2', name: 'FiO2', unit: '%', type: 'number', defaultValue: 21 },
      { id: 'paco2', name: 'PaCO2', unit: 'mmHg', type: 'number' },
      { id: 'pao2', name: 'PaO2', unit: 'mmHg', type: 'number' }
    ],
    formula: (v) => {
      const pio2 = (v.fio2 / 100) * 713; // Room air at sea level
      const pao2_calc = pio2 - (v.paco2 / 0.8);
      const gradient = pao2_calc - v.pao2;
      return { value: gradient.toFixed(1), unit: 'mmHg', interpretation: gradient > 15 ? 'High Gradient' : 'Normal Gradient' };
    }
  },
  {
    id: 'fe-urea',
    name: 'Fractional Excretion of Urea (FeUrea)',
    shortName: 'FeUrea',
    specialty: 'Nephrology',
    description: 'Useful for AKI assessment when diuretics are present.',
    inputs: [
      { id: 'una', name: 'Urinary Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'uurea', name: 'Urinary Urea', unit: 'mg/dL', type: 'number' },
      { id: 'surea', name: 'Serum Urea', unit: 'mg/dL', type: 'number' },
      { id: 'ucr', name: 'Urinary Creatinine', unit: 'mg/dL', type: 'number' },
      { id: 'scr', name: 'Serum Creatinine', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const feurea = ((v.uurea * v.scr) / (v.surea * v.ucr)) * 100;
      return { value: feurea.toFixed(1), unit: '%', interpretation: feurea < 35 ? 'Prerenal' : 'Intrinsic' };
    }
  },
  {
    id: 'has-bled',
    name: 'HAS-BLED Bleeding Risk',
    shortName: 'HAS-BLED',
    specialty: 'Cardiology',
    description: 'Risk of major bleeding for AFib patients on anticoagulants.',
    inputs: [
      { id: 'h', name: 'Hypertension (SBP >160)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Abnormal Renal/Liver Function', unit: '', type: 'select', options: [{ label: 'None', value: 0 }, { label: 'One', value: 1 }, { label: 'Both', value: 2 }] },
      { id: 's', name: 'Stroke History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'b', name: 'Bleeding History or Predisposition', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'l', name: 'Labile INR', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'e', name: 'Elderly (Age >65)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'd', name: 'Drugs/Alcohol Use', unit: '', type: 'select', options: [{ label: 'None', value: 0 }, { label: 'One', value: 1 }, { label: 'Both', value: 2 }] }
    ],
    formula: (v) => {
      const score = v.h + v.a + v.s + v.b + v.l + v.e + v.d;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 3 ? 'High Risk' : 'Low/Moderate Risk' };
    }
  },
  {
    id: 'bisap',
    name: 'BISAP Score (Pancreatitis)',
    shortName: 'BISAP',
    specialty: 'Gastroenterology',
    description: 'Predicts mortality in acute pancreatitis.',
    inputs: [
      { id: 'bun', name: 'BUN >25 mg/dL', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'ment', name: 'Impaired Mental Status', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'sirs', name: 'SIRS Present', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'age', name: 'Age >60', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'eff', name: 'Pleural Effusion', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.bun + v.ment + v.sirs + v.age + v.eff;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 3 ? 'High Mortality Risk' : 'Lower Risk' };
    }
  },
  {
    id: 'pheny-corr',
    name: 'Corrected Phenytoin (Winter-Tozer)',
    shortName: 'Corr Pheny',
    specialty: 'Pharmacology',
    description: 'Adjusts phenytoin levels for hypoalbuminemia.',
    inputs: [
      { id: 'p', name: 'Measured Phenytoin', unit: 'mcg/mL', type: 'number' },
      { id: 'a', name: 'Serum Albumin', unit: 'g/dL', type: 'number' }
    ],
    formula: (v) => {
      const corrected = v.p / (0.2 * v.a + 0.1);
      return { value: corrected.toFixed(1), unit: 'mcg/mL' };
    }
  },
  {
    id: 'heart-score',
    name: 'HEART Score for Chest Pain',
    shortName: 'HEART',
    specialty: 'Emergency',
    description: 'Predicts major adverse cardiac events.',
    inputs: [
      { id: 'h', name: 'History (Suspicion)', unit: '', type: 'select', options: [{ label: 'Low', value: 0 }, { label: 'Moderate', value: 1 }, { label: 'High', value: 2 }] },
      { id: 'e', name: 'ECG', unit: '', type: 'select', options: [{ label: 'Normal', value: 0 }, { label: 'Non-specific', value: 1 }, { label: 'ST-Depression', value: 2 }] },
      { id: 'a', name: 'Age', unit: '', type: 'select', options: [{ label: '<45', value: 0 }, { label: '45-64', value: 1 }, { label: '≥65', value: 2 }] },
      { id: 'r', name: 'Risk Factors', unit: '', type: 'select', options: [{ label: 'None', value: 0 }, { label: '1-2', value: 1 }, { label: '≥3', value: 2 }] },
      { id: 't', name: 'Troponin', unit: '', type: 'select', options: [{ label: 'Normal', value: 0 }, { label: '1-3x Limit', value: 1 }, { label: '>3x Limit', value: 2 }] }
    ],
    formula: (v) => {
      const score = v.h + v.e + v.a + v.r + v.t;
      let interpretation = 'Low Risk (Discharge possible)';
      if (score >= 7) interpretation = 'High Risk (Consider early invasive)';
      else if (score >= 4) interpretation = 'Moderate Risk (Observe/Test)';
      return { value: score.toString(), unit: 'Points', interpretation };
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
      { id: 'e', name: 'Tonsillar Exudates', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'n', name: 'Tender Ant. Cervical Nodes', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'c', name: 'Absence of Cough', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'a', name: 'Age', unit: '', type: 'select', options: [{ label: '15-44', value: 0 }, { label: '45+', value: -1 }, { label: '3-14', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.f + v.e + v.n + v.c + v.a;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 4 ? 'Suggests Antibiotics' : 'Likely Viral' };
    }
  },
  {
    id: 'meld',
    name: 'MELD Score (Liver)',
    shortName: 'MELD',
    specialty: 'Gastroenterology',
    description: 'Prognosis for patients with liver disease.',
    inputs: [
      { id: 'b', name: 'Bilirubin', unit: 'mg/dL', type: 'number' },
      { id: 'i', name: 'INR', unit: '', type: 'number' },
      { id: 'c', name: 'Creatinine', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const meld = 3.78 * Math.log(v.b || 1) + 11.2 * Math.log(v.i || 1) + 9.57 * Math.log(v.c || 1) + 6.43;
      return { value: Math.round(meld).toString(), unit: 'Score' };
    }
  },
  {
    id: 'temp-conv',
    name: 'Temperature Converter',
    shortName: 'Temp',
    specialty: 'General',
    description: 'Convert between Celsius and Fahrenheit.',
    inputs: [
      { id: 'temp', name: 'Temperature', unit: 'Value', type: 'number' },
      { id: 'scale', name: 'From Scale', unit: '', type: 'select', options: [{ label: 'Celsius (°C)', value: 1 }, { label: 'Fahrenheit (°F)', value: 2 }] }
    ],
    formula: (v) => {
      if (v.scale === 1) {
        const result = (v.temp * 9/5) + 32;
        return { value: result.toFixed(1), unit: '°F', interpretation: `${v.temp}°C is ${result.toFixed(1)}°F` };
      } else {
        const result = (v.temp - 32) * 5/9;
        return { value: result.toFixed(1), unit: '°C', interpretation: `${v.temp}°F is ${result.toFixed(1)}°C` };
      }
    }
  },
  {
    id: 'ibw',
    name: 'Ideal Body Weight (Devine)',
    shortName: 'IBW',
    specialty: 'General',
    description: 'Estimates healthy weight based on height and gender.',
    inputs: [
      { id: 'height', name: 'Height', unit: 'cm', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }] }
    ],
    formula: (v) => {
      const heightIn = v.height / 2.54;
      const baseHeight = 60; // 5 feet
      let ibw = 0;
      if (v.sex === 1) {
        ibw = 50 + 2.3 * (heightIn - baseHeight);
      } else {
        ibw = 45.5 + 2.3 * (heightIn - baseHeight);
      }
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
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'height', name: 'Height', unit: 'cm', type: 'number' },
      { id: 'age', name: 'Age', unit: 'yrs', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 5 }, { label: 'Female', value: -161 }] }
    ],
    formula: (v) => {
      const bmr = (10 * v.weight) + (6.25 * v.height) - (5 * v.age) + v.sex;
      return { value: Math.round(bmr).toString(), unit: 'kcal/day', interpretation: 'Total energy expenditure at rest.' };
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
      return { value: map.toFixed(0), unit: 'mmHg', interpretation: map < 65 ? 'Low (Danger)' : 'Normal' };
    }
  },
  {
    id: 'fena',
    name: 'Fractional Excretion of Sodium (FeNa)',
    shortName: 'FeNa',
    specialty: 'Nephrology',
    description: 'Differentiates between prerenal and intrinsic AKI.',
    inputs: [
      { id: 'una', name: 'Urinary Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'pna', name: 'Plasma Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'pcr', name: 'Plasma Creatinine', unit: 'mg/dL', type: 'number' },
      { id: 'ucr', name: 'Urinary Creatinine', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const fena = (v.una * v.pcr) / (v.pna * v.ucr) * 100;
      let interpretation = 'Intrinsic Renal Failure';
      if (fena < 1) interpretation = 'Prerenal (Dehydration)';
      else if (fena > 2) interpretation = 'Intrinsic (ATN)';
      return { value: fena.toFixed(2), unit: '%', interpretation };
    }
  },
  {
    id: 'water-def',
    name: 'Free Water Deficit',
    shortName: 'Water Deficit',
    specialty: 'Nephrology',
    description: 'Calculates water needed to correct hypernatremia.',
    inputs: [
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'nas', name: 'Serum Sodium', unit: 'mEq/L', type: 'number' },
      { id: 'sex', name: 'Sex (Water %)', unit: '', type: 'select', options: [{ label: 'Male (0.6)', value: 0.6 }, { label: 'Female (0.5)', value: 0.5 }] }
    ],
    formula: (v) => {
      const deficit = v.sex * v.weight * (v.nas / 140 - 1);
      return { value: deficit.toFixed(1), unit: 'Liters', interpretation: `Free water required to reach Na 140 mEq/L.` };
    }
  },
  {
    id: 'corr-calc',
    name: 'Corrected Calcium',
    shortName: 'Corr Ca',
    specialty: 'General',
    description: 'Adjusts calcium levels for patients with low albumin.',
    inputs: [
      { id: 'ca', name: 'Serum Calcium', unit: 'mg/dL', type: 'number' },
      { id: 'alb', name: 'Serum Albumin', unit: 'g/dL', type: 'number' }
    ],
    formula: (v) => {
      const corrected = v.ca + 0.8 * (4.0 - v.alb);
      return { value: corrected.toFixed(1), unit: 'mg/dL', interpretation: corrected > 10.5 ? 'Hypercalcemia' : (corrected < 8.5 ? 'Hypocalcemia' : 'Normal') };
    }
  },
  {
    id: 'ldl',
    name: 'LDL Cholesterol (Friedewald)',
    shortName: 'LDL',
    specialty: 'Cardiology',
    description: 'Calculates LDL based on Total, HDL, and Triglycerides.',
    inputs: [
      { id: 'tc', name: 'Total Cholesterol', unit: 'mg/dL', type: 'number' },
      { id: 'hdl', name: 'HDL Cholesterol', unit: 'mg/dL', type: 'number' },
      { id: 'tg', name: 'Triglycerides', unit: 'mg/dL', type: 'number' }
    ],
    formula: (v) => {
      const ldl = v.tc - v.hdl - (v.tg / 5);
      return { value: ldl.toFixed(0), unit: 'mg/dL', interpretation: ldl > 160 ? 'High' : (ldl < 100 ? 'Optimal' : 'Near Optimal') };
    }
  },
  {
    id: 'sirs',
    name: 'SIRS Criteria',
    shortName: 'SIRS',
    specialty: 'Critical Care',
    description: 'Systemic Inflammatory Response Syndrome criteria.',
    inputs: [
      { id: 'temp', name: 'Temp <36 or >38°C', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'hr', name: 'Heart Rate >90', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'rr', name: 'RR >20 or PaCO2 <32', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'wbc', name: 'WBC <4k, >12k or >10% bands', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.temp + v.hr + v.rr + v.wbc;
      return { value: score.toString(), unit: '/4', interpretation: score >= 2 ? 'SIRS Positive' : 'SIRS Negative' };
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
      { id: 'fio2', name: 'FiO2 (%)', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const ratio = v.pao2 / (v.fio2 / 100);
      let interpretation = 'Normal';
      if (ratio <= 100) interpretation = 'Severe ARDS';
      else if (ratio <= 200) interpretation = 'Moderate ARDS';
      else if (ratio <= 300) interpretation = 'Mild ARDS';
      return { value: Math.round(ratio).toString(), unit: '', interpretation };
    }
  },
  {
    id: 'bic-def',
    name: 'Bicarbonate Deficit',
    shortName: 'Bic Def',
    specialty: 'Critical Care',
    description: 'Calculates amount of bicarbonate to correct acidosis.',
    inputs: [
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'target', name: 'Target HCO3', unit: 'mEq/L', type: 'number', defaultValue: 24 },
      { id: 'actual', name: 'Current HCO3', unit: 'mEq/L', type: 'number' }
    ],
    formula: (v) => {
      const deficit = 0.4 * v.weight * (v.target - v.actual);
      return { value: deficit.toFixed(0), unit: 'mEq', interpretation: 'Total bicarbonate deficit.' };
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
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'creatinine', name: 'Serum Creatinine', unit: 'mg/dL', type: 'number' },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0.85 }] }
    ],
    formula: (v) => {
      const result = ((140 - v.age) * v.weight) / (72 * v.creatinine) * v.sex;
      return { value: result.toFixed(1), unit: 'mL/min' };
    }
  },
  {
    id: 'qsofa',
    name: 'qSOFA Score',
    shortName: 'qSOFA',
    specialty: 'Critical Care',
    description: 'Quick Sequential Organ Failure Assessment for sepsis risk.',
    inputs: [
      { id: 'rr', name: 'Resp Rate ≥22/min', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'ment', name: 'Altered Mentation (GCS <15)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'sbp', name: 'Systolic BP ≤100 mmHg', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.rr + v.ment + v.sbp;
      return { value: score.toString(), unit: '/3', interpretation: score >= 2 ? 'High risk for poor outcome' : 'Low risk' };
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
      const rr = 60 / v.hr;
      const qtc = v.qt / Math.sqrt(rr);
      return { value: qtc.toFixed(0), unit: 'ms', interpretation: qtc > 440 ? 'Prolonged (Male >440, Female >460)' : 'Normal' };
    }
  },
  {
    id: 'chads',
    name: 'CHA2DS2-VASc Score',
    shortName: 'CHA2DS2',
    specialty: 'Cardiology',
    description: 'Stroke risk for patients with Atrial Fibrillation.',
    inputs: [
      { id: 'age', name: 'Age', unit: '', type: 'select', options: [{ label: '<65', value: 0 }, { label: '65-74', value: 1 }, { label: '≥75', value: 2 }] },
      { id: 'sex', name: 'Sex', unit: '', type: 'select', options: [{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }] },
      { id: 'chf', name: 'CHF History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'htn', name: 'Hypertension History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'stroke', name: 'Stroke/TIA History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 2 }] },
      { id: 'vasc', name: 'Vascular Disease History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'dm', name: 'Diabetes History', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.age + v.sex + v.chf + v.htn + v.stroke + v.vasc + v.dm;
      return { value: score.toString(), unit: 'Points', interpretation: score >= 2 ? 'Anticoagulation recommended' : 'Low/Moderate risk' };
    }
  },
  {
    id: 'anion-gap',
    name: 'Anion Gap',
    shortName: 'AG',
    specialty: 'Critical Care',
    description: 'Calculates the gap between primary measured cations and anions.',
    inputs: [
      { id: 'na', name: 'Sodium (Na)', unit: 'mEq/L', type: 'number' },
      { id: 'cl', name: 'Chloride (Cl)', unit: 'mEq/L', type: 'number' },
      { id: 'hco3', name: 'Bicarbonate (HCO3)', unit: 'mEq/L', type: 'number' }
    ],
    formula: (v) => {
      const ag = v.na - (v.cl + v.hco3);
      return { value: ag.toFixed(1), unit: 'mEq/L', interpretation: ag > 12 ? 'High Anion Gap' : 'Normal (8-12)' };
    }
  },
  {
    id: 'anc',
    name: 'Absolute Neutrophil Count',
    shortName: 'ANC',
    specialty: 'General',
    description: 'Assesses infection risk in neutropenic patients.',
    inputs: [
      { id: 'wbc', name: 'WBC Count', unit: 'cells/µL', type: 'number' },
      { id: 'polys', name: 'Neutrophils/Polys (%)', unit: '%', type: 'number' },
      { id: 'bands', name: 'Bands (%)', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const anc = v.wbc * ((v.polys + v.bands) / 100);
      let interpretation = 'Normal';
      if (anc < 500) interpretation = 'Severe Neutropenia';
      else if (anc < 1000) interpretation = 'Moderate Neutropenia';
      else if (anc < 1500) interpretation = 'Mild Neutropenia';
      return { value: Math.round(anc).toString(), unit: 'cells/µL', interpretation };
    }
  },
  {
    id: 'drip-rate',
    name: 'IV Drip Rate',
    shortName: 'Drip Rate',
    specialty: 'Pharmacology',
    description: 'Calculate drops per minute for IV infusions.',
    inputs: [
      { id: 'volume', name: 'Total Volume', unit: 'mL', type: 'number' },
      { id: 'time', name: 'Time', unit: 'min', type: 'number' },
      { id: 'factor', name: 'Drop Factor', unit: 'gtt/mL', type: 'number', defaultValue: 20 }
    ],
    formula: (v) => {
      const rate = (v.volume * v.factor) / v.time;
      return { value: rate.toFixed(0), unit: 'gtt/min' };
    }
  },
  {
    id: 'maintenance-fluids',
    name: 'Pediatric Maintenance Fluids (4-2-1 Rule)',
    shortName: 'Maintenance Fluids',
    specialty: 'Pediatrics',
    description: 'Calculate hourly fluid maintenance requirements.',
    inputs: [
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' }
    ],
    formula: (v) => {
      let rate = 0;
      const w = v.weight;
      if (w <= 10) rate = w * 4;
      else if (w <= 20) rate = 40 + (w - 10) * 2;
      else rate = 60 + (w - 20) * 1;
      return { value: rate.toFixed(0), unit: 'mL/hr' };
    }
  },
  {
    id: 'apgar',
    name: 'APGAR Score',
    shortName: 'APGAR',
    specialty: 'Pediatrics',
    description: 'Quick assessment of newborn health at 1 and 5 minutes.',
    inputs: [
      { id: 'hr', name: 'Heart Rate', unit: '', type: 'select', options: [{ label: 'Absent', value: 0 }, { label: '<100 bpm', value: 1 }, { label: '>100 bpm', value: 2 }] },
      { id: 'resp', name: 'Respiratory Effort', unit: '', type: 'select', options: [{ label: 'Absent', value: 0 }, { label: 'Weak/Irregular', value: 1 }, { label: 'Strong/Crying', value: 2 }] },
      { id: 'tone', name: 'Muscle Tone', unit: '', type: 'select', options: [{ label: 'Limp', value: 0 }, { label: 'Some Flexion', value: 1 }, { label: 'Active Motion', value: 2 }] },
      { id: 'grim', name: 'Reflex Irritability', unit: '', type: 'select', options: [{ label: 'No Response', value: 0 }, { label: 'Grimace', value: 1 }, { label: 'Cough/Sneeze/Cry', value: 2 }] },
      { id: 'color', name: 'Color', unit: '', type: 'select', options: [{ label: 'Blue/Pale', value: 0 }, { label: 'Body Pink/Extremities Blue', value: 1 }, { label: 'Completely Pink', value: 2 }] }
    ],
    formula: (v) => {
      const score = v.hr + v.resp + v.tone + v.grim + v.color;
      let interpretation = 'Excellent condition';
      if (score <= 3) interpretation = 'Critically low';
      else if (score <= 6) interpretation = 'Fairly low';
      return { value: score.toString(), unit: '/10', interpretation };
    }
  },
  {
    id: 'parkland',
    name: 'Parkland Formula (Burns)',
    shortName: 'Parkland',
    specialty: 'Critical Care',
    description: 'Fluid resuscitation for burn victims (first 24h).',
    inputs: [
      { id: 'weight', name: 'Weight', unit: 'kg', type: 'number' },
      { id: 'tbsa', name: 'TBSA Burned', unit: '%', type: 'number' }
    ],
    formula: (v) => {
      const total = 4 * v.weight * v.tbsa;
      return { value: total.toFixed(0), unit: 'mL (Total 24h)', interpretation: `Give ${Math.round(total/2)} mL in first 8h.` };
    }
  },
  {
    id: 'gcs',
    name: 'Glasgow Coma Scale',
    shortName: 'GCS',
    specialty: 'Critical Care',
    description: 'Neurological scale for assessing level of consciousness.',
    inputs: [
      { id: 'eye', name: 'Eye Opening', unit: '', type: 'select', options: [{ label: 'Spontaneous', value: 4 }, { label: 'To Speech', value: 3 }, { label: 'To Pain', value: 2 }, { label: 'None', value: 1 }] },
      { id: 'verbal', name: 'Verbal Response', unit: '', type: 'select', options: [{ label: 'Oriented', value: 5 }, { label: 'Confused', value: 4 }, { label: 'Inappropriate', value: 3 }, { label: 'Incomprehensible', value: 2 }, { label: 'None', value: 1 }] },
      { id: 'motor', name: 'Motor Response', unit: '', type: 'select', options: [{ label: 'Obeys', value: 6 }, { label: 'Localizes Pain', value: 5 }, { label: 'Withdraws Pain', value: 4 }, { label: 'Flexion (Decorticate)', value: 3 }, { label: 'Extension (Decerebrate)', value: 2 }, { label: 'None', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.eye + v.verbal + v.motor;
      let interpretation = 'Severe Injury (GCS 3-8)';
      if (score >= 13) interpretation = 'Mild Injury';
      else if (score >= 9) interpretation = 'Moderate Injury';
      return { value: score.toString(), unit: '/15', interpretation };
    }
  },
  {
    id: 'wells-pe',
    name: "Wells' Criteria for Pulmonary Embolism",
    shortName: "Wells' PE",
    specialty: 'Critical Care',
    description: 'Predicts probability of Pulmonary Embolism.',
    inputs: [
      { id: 'clin', name: 'Clinical signs of DVT', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 3 }] },
      { id: 'alt', name: 'Alternative diagnosis less likely', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 3 }] },
      { id: 'hr', name: 'Heart rate >100', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1.5 }] },
      { id: 'immob', name: 'Immobilization/Surgery (last 4 wks)', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1.5 }] },
      { id: 'prev', name: 'Previous DVT/PE', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1.5 }] },
      { id: 'hemop', name: 'Hemoptysis', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'malig', name: 'Malignancy', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.clin + v.alt + v.hr + v.immob + v.prev + v.hemop + v.malig;
      let interpretation = 'PE Unlikely';
      if (score > 4) interpretation = 'PE Likely';
      return { value: score.toString(), unit: 'Points', interpretation };
    }
  },
  {
    id: 'curb65',
    name: 'CURB-65 Severity Score',
    shortName: 'CURB-65',
    specialty: 'General',
    description: 'Predicts mortality in community-acquired pneumonia.',
    inputs: [
      { id: 'conf', name: 'Confusion', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'bun', name: 'BUN >19 mg/dL', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'rr', name: 'Resp Rate ≥30/min', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'bp', name: 'Systolic <90 or Diastolic ≤60', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
      { id: 'age', name: 'Age ≥65', unit: '', type: 'select', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] }
    ],
    formula: (v) => {
      const score = v.conf + v.bun + v.rr + v.bp + v.age;
      let interpretation = 'Low risk (Outpatient)';
      if (score >= 3) interpretation = 'High risk (Urgent hospitalize)';
      else if (score >= 2) interpretation = 'Moderate risk (Hospitalize)';
      return { value: score.toString(), unit: 'Points', interpretation };
    }
  }
];

export const SPECIALTIES: Specialty[] = ['General', 'Critical Care', 'Nephrology', 'Cardiology', 'Pediatrics', 'Pharmacology', 'Gastroenterology', 'Neurology', 'Emergency'];
