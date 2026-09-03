
import menuBanner from "../assets/menuBanner.png"

const About = () => {
  return (
    <main className="bg-cream text-charcoal">
      <section className="grid min-h-[26rem] items-center gap-8 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <div className="max-w-xl">
          <p className="font-secondary text-sm uppercase tracking-[0.25em] text-terracotta">Our story</p>
          <h1 className="mt-3 font-primary text-5xl leading-tight sm:text-6xl">About us</h1>
          <p className="mt-6 font-secondary text-lg leading-8 text-charcoal/75">
            Culinary is a place for beautifully prepared food, thoughtful hospitality, and memorable moments around the table.
            We bring fresh ingredients and creative flavors together in a warm, welcoming setting.
          </p>
        </div>

        <img
          src={menuBanner}
          alt="A selection from the Culinary menu"
          className="h-80 w-full rounded-sm object-cover shadow-lg md:h-[26rem]"
        />
      </section>

      <section className="grid items-center gap-8 border-y border-charcoal/10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <div className="order-2 md:order-1">
          <p className="font-secondary text-sm uppercase tracking-[0.25em] text-terracotta">Visit us</p>
          <h2 className="mt-3 font-primary text-4xl sm:text-5xl">Find us here</h2>
          <p className="mt-5 font-secondary text-lg leading-8 text-charcoal/75">
            Come by for lunch, dinner, or a quiet drink. Our doors are open for good food and good company.
          </p>
          <address className="mt-6 not-italic font-secondary text-lg leading-8">
            123 Culinary Lane<br />
            City Centre<br />
            Open daily, 12:00 - 22:00
          </address>
        </div>

        <img
          src={menuBanner}
          alt="Location of the Culinary restaurant"
          className="order-1 h-80 w-full rounded-sm object-cover shadow-lg md:order-2 md:h-[26rem]"
        />
      </section>

      <section className="py-12 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <img
            src={menuBanner}
            alt="The Culinary dining experience"
            className="h-80 w-full rounded-sm object-cover shadow-lg md:h-[24rem]"
          />
          <div>
            <p className="font-secondary text-sm uppercase tracking-[0.25em] text-terracotta">Made with care</p>
            <h2 className="mt-3 font-primary text-4xl sm:text-5xl">A table worth gathering around</h2>
            <p className="mt-5 font-secondary text-lg leading-8 text-charcoal/75">
              Every detail is considered, from the first ingredient to the last moment of your visit. We look forward to welcoming you.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
