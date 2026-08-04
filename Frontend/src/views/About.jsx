// Author: Kyle Angeles
// Date: 2026-07-28
// File: Frontend/src/views/About.jsx
// Description: This file just talks about the application and the story behind the idea

function About() {


    return (
        
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

            <h2 className="text-white-400 text-center">About</h2>
            <p className="text-white-400 text-center mt-4">
                Risk Diabetes Predictor is essentially a web application that combines AI and Machine learning to predict the risks of diabetes based on the user's information. 
                Web application is built using React, TailwindCSS, and Vite. The AI model is undetermined at this moment but it will be trained using a current dataset of diabetes patients and their information.
                This application is a personal project of mine that I'm currently building to learn more about AI and Machine learning. The idea behind this application is to help me focus on real world problems 
                and how to solve them using Analytics and Machine learning. 
            </p>

        </div>
    )
}

export default About;