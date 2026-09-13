// Author: Kyle Angeles
// File-Name: RiskCalc.jsx
// Description: This component handles the risk calculating derived from the Ml_pipeline folder 
// once we have trained that it would be handled into here calculating the risk of the user based off their health style and other factors.

import { useState } from 'react';


function RiskCalc({ onResult}) {


    // Use state to store the input values for the risk calculator
    // using our dataset
    const [inputs, setInputs] = useState({
        gender: '', age: '', hypertension: '', heart_disease: '', smoking_history: '',
        bmi: '', HBA1C_Level: '', blood_glucose_level: ''

    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const handleChange = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading(true);
        setErrors('');

        // SAMPLE TESTING
        const payload = {
            ...inputs,
            age: Number(inputs.age),
            hypertension: Number(inputs.hypertension),
            heart_disease: Number(inputs.heart_disease),
            bmi: Number(inputs.bmi),
            HBA1C_Level: Number(inputs.HBA1C_Level),
            blood_glucose_level: Number(inputs.blood_glucose_level),

        }
        try {

            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( payload )
            });
            if (!response.ok) {
                throw new Error('Prediction failed');
            }
            const result = await response.json();
            setResult(result);
            onResult?.(result);
        } catch (err) {
            setErrors(err.message);
        } finally {
            setLoading(false);
        }


        };

        // Fields for the risk calculator form
        const fields = [
            { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female']},
            { name: 'age', label: 'age', type: 'number'},
            { name: 'hypertension', label: 'hypertension (mmHg)', type: 'select', options: [{ label: 'No', value: '0' }, { label: 'Yes', value: '1' }]},
            { name: 'heart_disease', label: 'heart_disease (mmHg)', type: 'select', options: [{ label: 'No', value: '0' }, { label: 'Yes', value: '1' }]},
            { name: 'smoking_history', label: 'smoking_history', type: 'select', options: ['Never', 'Former', 'Current']},
            { name: 'bmi', label: 'bmi (kg/m^2)', type: 'number'},
            { name: 'HBA1C_Level', label: 'HBA1C_Level (%)', type: 'number'},
            { name: 'blood_glucose_level', label: 'blood_glucose_level (mg/dL)', type: 'number'},
          


        ];
    


    return (
        <>
            <form onSubmit={handleSubmit} className="risk-calc-form">
                <h2>Risk Calculator</h2>

                {fields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>

                        {field.type === 'select' ? (
                            <select id={field.name} name={field.name} value={inputs[field.name] ?? ''} onChange={handleChange} required>
                                <option value="">Select</option>
                                {field.options.map((option) => {
                                    // Handle both object { label, value } and plain string options
                                    const optValue = typeof option === 'object' ? option.value : option;
                                    const optLabel = typeof option === 'object' ? option.label : option;

                                    return (
                                        <option key={optValue} value={optValue}>
                                            {optLabel}
                                        </option>
                                    );
                                })}
                            </select>
                        ) : (
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                step="any"
                                value={inputs[field.name] ?? ''}
                                onChange={handleChange}
                                required
                            />
                        )}
                    </div>
                ))}

                <button type="submit" disabled={loading}>
                    {loading ? 'Calculating...' : 'Calculate Risk'}
                </button>

                {errors && <p style={{ color: 'red' }}>{errors}</p>}
            </form>

            {result && (
                <div className="risk-result">
                    <h3>Risk Result</h3>
                    <p>Risk Score: {result.risk_score}</p>
                    <p>Category: {result.risk_category}</p>
                    <p>Recommendation: {result.risk_next_steps}</p>
                </div>
            )}
        </>
    );
}

export default RiskCalc;