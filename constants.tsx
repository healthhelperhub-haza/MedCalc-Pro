
// Import both Calculator and Specialty types from types.ts
import { Calculator, Specialty } from './types.ts';

export const CALCULATORS: Calculator[] = [
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
  }
];

// Specialty type is correctly imported and used here
export const SPECIALTIES: Specialty[] = ['General', 'Critical Care', 'Nephrology', 'Cardiology', 'Pediatrics', 'Pharmacology'];
