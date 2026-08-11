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
                        <h2 className="">Exercise</h2>
                        <select name="exercise" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Sedentary">sedentary (Little to no exercise)</option>
                            <option value="Light">Light (1-2 days/week) </option>
                            <option value="Moderate">Moderate (2-4 days/week)</option>
                            <option value="Active">Active (4-5+ days a week)</option>
                            <option value="vigorous">Vigorous / Daily structured workouts</option>
                        </select>
                        
                         <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                    </div>
                
                </>
            )
        }

        {/* History */}
        if (currentStep === 3) {
            return(
            <>
                <h2 className="text-black text-l">History</h2>
                <br></br>
                <label className="">Family History</label>
                <input className="" type="text" id="family history" name="family history" 
                placeholder="explain shortly about family history and genetics if any 
                relatives or family members had diabetes in the past" onChange={handleChange} value={familyHistory} required></input>
                <br></br>
                <div className="">
                    <label className="flex flex-col gap 2">Diabetes history</label>
                    <p className="">Have you ever experienced gestational diabetes or temporary high blood sugar in the past? </p>
                    <input className="px-4 py-2 border rounded-md hover:bg-blue-50 focus:ring-2 focus:ring-blue-500" type="button" onClick={() => handleChange('hasHistory', true)} required>Yes</input>
                    <input className="px-4 py-2 border rounded-md hover:bg-blue-50 focus:ring-2 focus:ring-blue-500" type="button" onClick={() => handleChange('hasHistory', false )} required>No</input>
                </div>
                <div className="">
                    <label className="">Symptoms</label>
                    <p className="">Have you experienced hallmark symptoms like excessive thirst, frequent urination, unusual fatigue, or blurred vision? Describe any symptoms and how long you've noticed them</p>
                    <textarea id="symptoms" name="symptoms" className="" placeholder="Please enter your answer below" rows={4} onChange={handleChange} value={formData.symptoms} required></textarea>
                </div>
                <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
            </>
            )

        }


        if (currentStep === 4 ) {

            return (
                <>
                    <div className="">
                        <label className="">sleep</label>
                        <p className="">On average, how many hours of sleep do you get per night.</p>
                        <input className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm" type="number" id="sleepHours" name="sleepHours" min="0" max="24" step="0.5" value={formData.sleep || ''} onChange={handleChange} placeholder="e.g 7.5hrs" required></input>
                    </div>
                    <br></br>
                    <div className="">
                        <label className="">Diabetes Type</label>
                        <p className="">If applicable, select your diagnosed diabetes type:</p>
                        <select id="diabetesType" name="diabetesType" required></select>
                    </div>
                
                <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                </>
            )
        } 


        


        


    }

    return(
        <>
        
        
        </>
    )
}

export default QuestionPage;