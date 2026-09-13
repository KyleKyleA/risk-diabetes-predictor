// Author: Kyle Angeles
// File-Name: RiskCalc.jsx
// Description: This component handles the risk calculating derived from the Ml_pipeline folder 
// once we have trained that it would be handled into here calculating the risk of the user based off their health style and other factors.


function RiskCalc() {


    // Use state to store the input values for the risk calculator
    // using our dataset
    const [inputs, setInputs] = useState({
        gender: '', age: '', hypertension: '', heart_disease: '', smoking_history: '',
        bmi: '', HBA1C_Level: '', blood_glucose_level: '', diabetes: ''

    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


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
        try {

            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            });
            if (!response.ok) {
                throw new Error('Prediction failed');
            }
            const result = await response.json();
            setResult(result);
        } catch (err) {
            setErrors(err.message);
        } finally {
            setLoading(false);
        }


        };

        const fields = [,
            { name: 'id', label: 'ID', type: 'number'},
            { name: 'gender', label: 'Gender', type: 'select'},
            { name: 'age', label: 'age', type: 'number'},
            { name: 'hypertension', label: 'hypertension', type:}


        ];
    


    return (


        <>
        
        
        
        </>
    )
}

export default RiskCalc;