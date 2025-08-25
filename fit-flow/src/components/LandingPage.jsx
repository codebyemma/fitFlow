import features from "./features"
import { Link } from "react-router-dom";

const LandingPage = () => {

    let reviews = [
        {
            id: 1,
            stars: 5,
            user: "Sarah M.",
            comment: "This app transformed my fitness routine. I love the variety of exercises!"
        },
        {
            id: 2,
            stars: 4,
            user: "Mike R.",
            comment: "Perfect for busy schedules. Quick workouts that actually work."
        },
        {
            id: 3,
            stars: 3,
            user: "Lisa K.",
            comment: "The progress tracking keeps me motivated every day."
        }
    ];

    return (
        <div>
            <section className="flex flex-col bg-gray-100 items-center justify-center w-full p-6 text-center">
                <h1 className="text-3xl font-bold py-2">Welcome to FitFlow</h1>
                <p className="text-4xl py-2">Your fitness journey <br /> starts here.</p>
                <p className="max-w-xl mx-auto">Discover thousands of exercises, create personalized workout 
                    plans, and track your progress with our intelligent fitness companion.</p>
                <div className="flex gap-4 py-6">
                    <Link to="/signup">
                        <button className="p-2 bg-purple-950 rounded-2xl">Start Your Journey</button>
                    </Link>
                    <button className="p-2 border border-gray-300 rounded-2xl">Watch Demo</button>
                </div>
                <img className="my-4" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop" alt="Fitness" />
            </section>
            <section className="flex flex-col bg-gray-200 items-center p-6 text-center mx-auto w-full">
                <h2 className="text-2xl font-bold my-3">Everything You Need To Get Fit</h2>
                <p className="text-lg my-3">Our comprehensive platform provides all the tools and guidance you need for a successful fitness journey.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4 mx-auto">
                    {features.map((feat) => (
                        <div key={feat.id}
                            className="flex flex-col items-center bg-white justify-center mx-auto border border-gray-300 p-4 m-2 rounded-lg shadow-md">
                            <img src={feat.img} alt={feat.title} />
                            <h3 className="text-lg font-semibold my-3">{feat.title}</h3>
                            <p className="text-sm text-gray-600">{feat.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col items-center p-6 text-center mx-auto w-full">
                <h2 className="text-2xl font-bold my-3 text-center">Join Thousands of Happy Users</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 mx-auto">
                    <div>
                        <h1 className="text-3xl font-bold">10k+</h1>
                        <p className="text-sm text-gray-600">Active Users</p>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">500+</h1>
                        <p className="text-sm text-gray-600">Exercise Library</p>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">50k+</h1>
                        <p className="text-sm text-gray-600">Workouts Completed</p>
                    </div>
                    {/* <div> */}
                        {reviews.map((review) => (
                            <div key={review.id}
                                className="flex flex-col items-center bg-white justify-center mx-auto border border-gray-300 p-4 m-2 rounded-lg shadow-md">
                                <h3>{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</h3>
                                <p className="text-sm text-gray-600 py-6">{review.comment}</p>
                                <h4 className="text-lg">{review.user}</h4>
                            </div>
                        ))}
                    {/* </div> */}
                </div>
            </section>
            <section className="flex flex-col bg-purple-100 items-center p-8 text-center mx-auto w-full">
                <h2 className="text-2xl font-bold">Ready to Transform Your Fitness?</h2>
                <p className="text-lg py-2">Join thousands of users who have already started their fitness journey with FitFlow.</p>
                <button className="bg-white py-2 px-4 border border-gray-300 rounded-2xl">Get Started for free</button>
            </section>
            <section className="p-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full text-gray-300 text-sm text-left">
                    <div className="col-span-2">
                        <h3 className="font-bold text-2xl text-black">FitFlow</h3>
                        <p>Join thousands of users who have already started their fitness journey with FitFlow.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-2xl text-black">Features</h4>
                        <p>Exercise Library</p>
                        <p>Workout Plans</p>
                        <p>Progress Tracking</p>
                        <p>AI Recommendations</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-2xl text-black">Support</h4>
                        <p>Help Center</p>
                        <p>Contact Us</p>
                        <p>Privacy and Policy</p>
                        <p>Terms of Service</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-2xl text-black">Connect</h4>
                        <p>Newsletter</p>
                        <p>Blog</p>
                        <p>Social Media</p>
                        <p>Community</p>
                    </div>
                </div>
                    <hr className="my-4 border-gray-300 w-full" />
                    <footer>
                        <p className="text-gray-600 text-sm text-center">&copy; 2025 FitFlow. All rights reserved.</p>
                    </footer>
            </section>
        </div>
    );
};

export default LandingPage;