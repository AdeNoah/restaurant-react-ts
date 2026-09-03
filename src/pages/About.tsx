
import aboutDiner from "../assets/aboutDiner.png"
import aboutMapLocation from "../assets/aboutMapLocation.png"
import aboutSubscriptions from "../assets/aboutSubscriptions.png"

const About = () => {
  return (
    <main className="bg-cream text-charcoal">
      <section className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-12">
        <div className="max-w-xl">
          <h1 className="font-primary text-4xl leading-tight sm:text-5xl">About Us</h1>
          <p className="mt-4 max-w-md font-secondary text-sm leading-6 text-charcoal/75">
            We value the success of our community. Whether you wish to learn something new,
            indulge in a culinary adventure, or simply enjoy a memorable experience with us,
            we are here to make it happen.
          </p>
        </div>

        <img
          src={aboutDiner}
          alt="A beautifully set dining table"
          className="h-64 w-full rounded-sm object-cover md:h-72"
        />
      </section>

      <section className="grid items-stretch gap-8 py-4 md:grid-cols-2 md:gap-12">
        <div className="bg-white p-8 sm:p-10">
          <h2 className="font-primary text-2xl">Find Us</h2>
          <div className="mt-5 space-y-3 font-secondary text-xs leading-5 text-charcoal/75">
            <p><strong className="font-semibold text-charcoal">ADDRESS</strong><br />123 Culinary Avenue<br />City Centre, City<br />Country</p>
            <p><strong className="font-semibold text-charcoal">HOURS</strong><br />Mon - Thu &nbsp;&nbsp; 5:00 PM - 10:00 PM<br />Fri - Sat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5:00 PM - 11:00 PM<br />Sunday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12:00 PM - 8:00 PM</p>
          </div>
        </div>

        <img
          src={aboutMapLocation}
          alt="Map showing the restaurant location"
          className="min-h-64 w-full rounded-sm object-cover"
        />
      </section>

      <section className="grid gap-8 py-12 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="font-primary text-2xl">Direct Inquiries</h2>
          <p className="mt-1 font-secondary text-xs text-charcoal/60">For reservations, events, or general questions, please drop us a message.</p>
          <form className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2"><input aria-label="Your name" placeholder="Your Name" className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-secondary text-xs outline-none placeholder:text-charcoal/45" /><input aria-label="Last name" placeholder="Last Name" className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-secondary text-xs outline-none placeholder:text-charcoal/45" /></div>
            <input aria-label="Email address" placeholder="Email Address" type="email" className="w-full border-b border-charcoal/20 bg-transparent px-1 py-2 font-secondary text-xs outline-none placeholder:text-charcoal/45" />
            <textarea aria-label="Your message" placeholder="Your Message" rows={3} className="w-full resize-none border-b border-charcoal/20 bg-transparent px-1 py-2 font-secondary text-xs outline-none placeholder:text-charcoal/45" />
            <button type="submit" className="bg-terracotta px-7 py-2 font-secondary text-[10px] font-semibold uppercase tracking-wider text-white">Send Message</button>
          </form>
        </div>
        <div className="bg-white/60 p-7 sm:p-9">
          <h2 className="font-primary text-2xl">Community Suggestions</h2>
          <p className="mt-1 font-secondary text-xs text-charcoal/60">Your ideas drive our menu. Tell us what you would like to see.</p>
          <form className="mt-6 space-y-4">
            <select aria-label="Suggestion topic" defaultValue="" className="w-full border border-charcoal/10 bg-white px-3 py-3 font-secondary text-xs text-charcoal/65 outline-none"><option value="" disabled>Topics of Suggestion</option><option>Menu</option><option>Service</option><option>Events</option></select>
            <textarea aria-label="Share your thoughts" placeholder="Share your thoughts with our culinary team..." rows={3} className="w-full resize-none border border-charcoal/10 bg-white px-3 py-3 font-secondary text-xs outline-none placeholder:text-charcoal/45" />
            <button type="submit" className="w-full border border-charcoal/40 bg-transparent py-2 font-secondary text-[10px] font-semibold uppercase tracking-wider text-charcoal">Submit Suggestion</button>
          </form>
        </div>
      </section>
      <section className="relative overflow-hidden rounded-sm py-16">
        <img src={aboutSubscriptions} alt="A warm restaurant dining scene" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto max-w-xl bg-cream/90 px-6 py-8 text-center sm:px-12">
          <h2 className="font-primary text-3xl">Join the Table</h2>
          <p className="mx-auto mt-2 max-w-sm font-secondary text-xs leading-5 text-charcoal/70">Subscribe to receive exclusive invitations to tasting menus, seasonal events, and culinary insights directly from our kitchen.</p>
          <form className="mx-auto mt-5 flex max-w-sm flex-col gap-2 sm:flex-row"><input aria-label="Email for subscription" type="email" placeholder="Enter your email" className="min-w-0 flex-1 bg-white px-3 py-3 font-secondary text-xs outline-none placeholder:text-charcoal/45" /><button type="submit" className="bg-terracotta px-6 py-3 font-secondary text-[10px] font-semibold uppercase tracking-wider text-white">Subscribe</button></form>
        </div>
      </section>
    </main>
  )
}

export default About
