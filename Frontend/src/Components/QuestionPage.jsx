// Author: Kyle Angeles
// File-Name: QuestionPage.jsx
// Description: This component asks users once they signup about their lifestyle

import { useState } from "react";


function QuestionPage() {

    const lifeStyleQuestions = () => {

        const [currentStep, setCurrentStep] = useState(0);
        const [formData, setFormData] = useState ({ 
            name: "",  // String 
            diet: "",  // String []
            exercise: "", // Multiple choice
            familyHistory: "", // String [ ]
            sleep: "", // Number format 
            diabetesHistory: "", // yes or no question
            symptoms: "",
            diabetesType: "",


        })


        const handleChange = (e) => {
            const {name , value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value}));


        };
        
        const nextStep = () => {
            if (currentStep === 0 && !formData.name) return alert("Name is required before moving on");
            setCurrentStep(prev => prev + 1);
        };

        // basic information based on my form data
        if (currentStep === 0) {
            return (
                <>
                    <div>
                        <h2 className="">
                            Q1. Basic Information
                        </h2>
                        <label className="">Name</label>
                        <input className="" type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Your Name"required></input>
                        <button onClick={nextStep} className="">next step</button>
                    </div>

                </>
            );

        }

        {/* Diet and lifestyle questions  */}
        if (currentStep === 1) {
            return (
                <>
                    <div>
                        <h2 className="">
                            Q2. diet
                        </h2>
                        <label className="">Diet Preference</label>
                        <select name="diet" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="vegan">Vegan</option>
                            <option value="omnivore">Omnivore</option>
                            <option value="carnivore">Carnivore </option>
                            <option value="vegetarian">vegetarian</option>
                        </select>
                    </div>
                    <br></br>
                    <div className="">
                        <h2 className="">
                        <select name="exercise" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Sedentary">sedentary (Little to no exercise)</option>
                            <option value="Light">Light (1-2 days/week) </option>
                            <option value="Moderate">Moderate (2-4 days/week)</option>
                            <option value="Active">Active (4-5+ days a week)</option>
                            <option value="vigorous">Vigorous / Daily structured workouts</option>
                        </select>
                        </h2>
                         <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                    </div>
                
                </>
            )
        }

        {/* History */}
        if (currentStep === 3) {
            

        }

        


        


    }

    return(
        <>
        
        
        </>
    )
}

export default QuestionPage;