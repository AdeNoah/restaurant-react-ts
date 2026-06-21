

const Home = () => {

    return (
        <div>
            <div className="mx-0 w-full px-0 relative h-fit">
                <img src="src/assets/images/home-banner.png" alt="Home banner" className="w-full h-91 object-cover " />

                <div className="text-cream absolute inset-0 flex flex-col items-center justify-center ">
                    <div className="bg-white/30 p-10 rounded-md  max-w-lg text-center">
                        <p>Welcome to Culinary</p>
                        <p>Our Collection</p>
                        <p>A visual journey through our gastronomic creations, eveery plate is a canvas, every dish a masterpiece.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home