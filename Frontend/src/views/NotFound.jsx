// Author: Kyle Angeles
// FileName: NotFound.jsx
// Description: Not found page view for the user to look at if they ran into any issues 
// they will have an option to return to dashboard page.

function NotFound() {

    return (

        <main className ="grid min-h-full place-items-center bg-grey-900 px 6 py 24 sm:py-32 lg:px-8">

            <div clasName="text-center">

            <p className="text-base font-semi-bold text-red-400">404</p>
            
            <p className="mt-6 text-lg font-medium text-pretty text-grey md:text-xl/8">
                Sorry, application ran into an issue please try again next time! 
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">

            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#"
                className="">

                Go back to DashBoard
                </a>
            </div>
            </div>
        
        
        </main>
    )
}


export default NotFound;