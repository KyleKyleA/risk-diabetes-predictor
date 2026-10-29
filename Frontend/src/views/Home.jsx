// Author: Kyle Angeles
// File-Name: Home.jsx
// Description: This view renders in the dashboard for the users to see what their stats once they submitted their questionairre 
// after they have signup or login into the page.

function Home() {


    return (

        <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">

            <h2 className="text-black-400 text-center">
                Welcome to Diabetes Risk Predictor

            </h2>
            <p className="text-white-400 text-center mt-4">Please Sign Up to Know what risks for for being presented with diabetes</p>
            <p>Through the signup button below</p>


            <p className="text-center text-bold">Sign up here</p>
            <br></br>
            <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200">Sign up</a>




           
        
        
        </main>
    )
}


export default Home;