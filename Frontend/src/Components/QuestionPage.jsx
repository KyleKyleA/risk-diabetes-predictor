// Author: Kyle Angeles
// File-Name: QuestionPage.jsx
// Description: This component asks users once they signup about their lifestyle

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function QuestionPage() {

  

        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const [currentStep, setCurrentStep] = useState(0);
        const [formData, setFormData] = useState ({ 
            name: "",  // String 
            diet: "",  // String []
            exercise: "", // Multiple choice
            familyHistory: "", // String [ ]
            sleepHours: "", // Number format 
            diabetesHistory: "", // yes or no question
            symptoms: "",
            diabetesType: "",


        });
    

        const handleCustomChange = (field, value) =>{
            setFormData(prev => ({ ...prev, [field]: value}));
        }

        const handleChange = (e) => {
            const {name , value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value}));



        };



        const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            try {
                const response = await fetch("/api/predict", {
                    method: "POST",
                    headers: {  "Content-Type": "application/json"  },
                    body: JSON.stringify(formData),

                });


                if (!response.ok) {
                    throw new Error(`Sever responded with ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    navigate("/dashboard", {state: {userData: formData, prediction: result}});
                } else {
                    setError(result.message || "Prediction failed. Please try again");
                }
            } catch (err) {
                console.error("Submission error:", err);
                setError("Something went wrong while submitting Please try again.");
            } finally {
                setLoading(false);
            }
        } 
         
        const nextStep = () => {
            if (currentStep === 0 && !formData.name) return alert("Name is required before moving on");
            setCurrentStep(prev => prev + 1);
        };

        const prevStep = () => {
            setCurrentStep((prev) => Math.max(0, prev -1));
        };

        // basic information based on my form data
         return (
            <form onSubmit={handleSubmit} className="">
                {currentStep === 0 && (
           
                
                    <div>
                        <h2 className="text-blue block mb-1">
                            Q1. Basic Information
                        </h2>
                        <label className="text-black block mb-1">Name</label>
                        <input className="" type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name"required></input>
                        <button type="button" onClick={nextStep} className="">next step</button>
                    </div>

            
            )}        

        {/* Diet and lifestyle questions  */}
        {currentStep === 1 && (
           
                <>
                    <div>
                        <h2 className="text-black block mb-1 text-center">
                            Q2. diet
                        </h2>
                        <label className="text-black block mb-1">Diet Preference</label>
                        <select name="diet" onChange={handleChange} value={formData.diet}>
                            <option value="">Select</option>
                            <option value="vegan">Vegan</option>
                            <option value="omnivore">Omnivore</option>
                            <option value="carnivore">Carnivore </option>
                            <option value="vegetarian">vegetarian</option>
                        </select>
                    </div>
                    <br></br>
                    <div className="">
                        <h2 className="text-black block mb-1">Exercise</h2>
                        <select name="exercise" onChange={handleChange} value={formData.exercise}>
                            <option value="">Select</option>
                            <option value="Sedentary">sedentary (Little to no exercise)</option>
                            <option value="Light">Light (1-2 days/week) </option>
                            <option value="Moderate">Moderate (2-4 days/week)</option>
                            <option value="Active">Active (4-5+ days a week)</option>
                            <option value="vigorous">Vigorous / Daily structured workouts</option>
                        </select>
                         <button type="button" onClick={prevStep} className="px-4 py-2 border rounded-md">Back</button>
                         <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                    </div>
                
                </>
        
            )
        }

        {/* History */}
        {currentStep === 2 && (
            <>
            
                <h2 className="text-black text-l">History</h2>
                <br></br>
                <label className="text-black block mb-1">Family History</label>
                <input className="" type="text" id="familyHistory" name="familyHistory" 
                placeholder="explain shortly about family history and genetics if any 
                relatives or family members had diabetes in the past" onChange={handleChange} value={formData.familyHistory} required></input>
                <br></br>
                <div className="">
                    <label className="flex flex-col gap-2 text-black block mb-1">Diabetes history</label>
                    <p className="">Have you ever experienced gestational diabetes or temporary high blood sugar in the past? </p>
                   <button type="button" onClick={() => handleCustomChange("diabetesHistory", "yes")}className={`px-4 py-2 border rounded-md ${
                   formData.diabetesHistory === "yes" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}> Yes </button>
                   <button type="button" onClick={() => handleCustomChange("diabetesHistory", "no")} className={`px-4 py-2 border rounded-md ${
                   formData.diabetesHistory === "no" ? "bg-blue-600 text-white" : "hover:bg-gray-100" }`}> No </button>
                </div>
                <div className="">
                    <label className="text-black block mb-1">Symptoms</label>
                    <p className="">Have you experienced hallmark symptoms like excessive thirst, frequent urination, unusual fatigue, or blurred vision? Describe any symptoms and how long you've noticed them</p>
                    <textarea id="symptoms" name="symptoms" className="" placeholder="Please enter your answer below" rows={4} onChange={handleChange} value={formData.symptoms} required></textarea>
                </div>
                 <button type="button" onClick={prevStep} className="px-4 py-2 border rounded-md">Back</button>
                <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
            </>
            )
        }


        


        { currentStep === 3 && (

           
                <>
                    <div className="">
                        <label className="">sleep</label>
                        <p className="">On average, how many hours of sleep do you get per night.</p>
                        <input className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm" type="number" id="sleepHours" name="sleepHours" min="0" max="24" step="0.5" value={formData.sleepHours || ''} onChange={handleChange} placeholder="e.g 7.5hrs" required></input>
                    </div>
                    <br></br>
                    <div className="">
                        <label className="text-black block mb-1">Diabetes Type</label>
                        <p className="">If applicable, select your diagnosed diabetes type:</p>
                        <select id="diabetesType" name="diabetesType" onChange={handleChange} value={formData.diabetesType} required>
                            <option value="">Select diagnosis type</option>
                            <option value="none">No Diagnosis</option>
                            <option value="type1">Type 1 Diabetes</option>
                            <option value="type2">Type 2 Diabetes</option>
                            <option value="prediabetes">Prediabetes</option>
                            <option value="gestational">Gestational Diabetes</option>
                            <option value="unknown">Not Sure</option>
                        </select>
                    </div>
                <div className="flex justify-between mt-4">
                    <button type="button" onClick={prevStep} className="px-4 py-2 border rounded-md">Back</button>
                     <button type="submit" className="px-6 py-2 rounded-md text-black font-semibold bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition">Submit</button>
                </div>
               
                </>
        )
    }
        
            </form>
            )
            
        }
        
        

    


export default QuestionPage;