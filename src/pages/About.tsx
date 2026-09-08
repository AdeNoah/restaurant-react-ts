// the imports for the about page
import { useState, useEffect, useRef } from "react"
import aboutDiner from "../assets/aboutDiner.png"
import aboutMapLocation from "../assets/aboutMapLocation.png"
import aboutSubscriptions from "../assets/aboutSubscriptions.png"

import { type SuggestionsOptions, type SuggestionsDropdownProps } from "../data/types"

// component for the suggestions logic and dropdown menu
const SuggestionsDropdown = ({
  options,
  selected,
  onChange,
  placeholder = "Select a topic to make a suggestion",
}: SuggestionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((isDropdownOpen) => !isDropdownOpen)}
        className="flex w-full items-center justify-between rounded border border-charcoal/10 bg-white px-3 py-3 text-left font-secondary text-xs text-charcoal"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected?.label ?? placeholder}</span>
        <span aria-hidden="true">{isOpen ? "\u25B2" : "\u25BC"}</span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-charcoal bg-white shadow"
          role="listbox"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={selected?.value === option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className="w-full px-3 py-2 text-left font-secondary text-xs hover:bg-cream"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// the main about page component
const About = () => {

  
  const hours = [
    { days: "Mon - Thu", time: "5:00 PM - 10:00 PM" },
    { days: "Fri - Sat", time: "5:00 PM - 11:00 PM" },
    { days: "Sunday",    time: "12:00 PM - 8:00 PM" },
  ]

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const suggestionOptions: SuggestionsOptions[] = [
    { label: "Menu", value: "menu" },
    { label: "Service", value: "service" },
    { label: "Events", value: "events" },
  ]

  // all the useStates for the about page, including the form, suggestion, and subscription states
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestionsOptions | null>(null)
  const [suggestionMessage, setSuggestionMessage] = useState("")
  const [subscriptionEmail, setSubscriptionEmail] = useState("")
  const [subscriptionList, setSubscriptionList] = useState<string[]>(() => {
    const storedSubscriptions = localStorage.getItem("subscription list")

    if (!storedSubscriptions) {
      return []
    }

    try {
      const parsedSubscriptions: unknown = JSON.parse(storedSubscriptions)
      return Array.isArray(parsedSubscriptions) && parsedSubscriptions.every((email) => typeof email === "string")
        ? parsedSubscriptions
        : []
    } catch {
      return []
    }
  })

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.message.trim()) {
      return
    }

    console.log("form submitted:", form)
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    })
  }

  const handleSuggestionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedSuggestion || !suggestionMessage.trim()) {
      return
    }

    const submittedSuggestion = {
      topic: selectedSuggestion?.value ?? "",
      message: suggestionMessage,
    }

    console.log("suggestion submitted:", submittedSuggestion)
    setSelectedSuggestion(null)
    setSuggestionMessage("")
  }

  // button to handle subscription form submission and store the email in localStorage if it is not already present in the subscription list
  const handleSubscriptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = subscriptionEmail.trim()

    if (!email || subscriptionList.includes(email)) {
      return
    }

    const updatedSubscriptionList = [...subscriptionList, email]
    setSubscriptionList(updatedSubscriptionList)
    localStorage.setItem("subscription list", JSON.stringify(updatedSubscriptionList))
    console.log("subscription list updated:", updatedSubscriptionList)
    setSubscriptionEmail("")
  }

  return (
    // the about us section
    <main className="bg-cream text-charcoal">
      <section className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-12">
        <div className="px-4 max-w-xl md:px-8">
          <h1 className="font-primary text-4xl leading-tight sm:text-4xl md:text-7xl">About Us</h1>
          <p className="mt-4 max-w-md font-secondary text-sm leading-6 text-charcoal/75">
            We value our community, Whether you wish to learn something new,
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

      {/* the address and time section */}
      <section className="grid items-stretch gap-8 py-4 md:grid-cols-2 md:gap-12">
        <div className="bg-white p-8 sm:p-10 text-charcoal">
          <h2 className="font-primary text-3xl uppercase tracking-[0.2em]">
            Address
          </h2>
          <address className="not-italic  font-secondary text-sm tracking-[0.1em] leading-6">
            123 Culinary Avenue
            <br />
            City Centre, City
            <br />
            Country
          </address>

          <h2 className="font-primary text-3xl uppercase tracking-[0.2em] tracking-[0.2em] mt-4">
            Hours
          </h2>
          <dl>
            {hours.map(({days: days, time: time}) => (
              <div key={days} className="font-secondary text-sm leading-6 tracking-[0.1em]">
                {/* <p>{days} {time}</p> */}
                <dt>{days}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
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
          <p className="mt-1 font-secondary text-xs text-charcoal/60">
            For reservations, events, or general questions, please drop us a message.
          </p>

          <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-2  gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleFormInputChange}
                className="w-full border-b border-black bg-transparent pb-1 text-sm outline-none  focus:border-b-3 "
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleFormInputChange}
                className="w-full border-b border-black bg-transparent pb-1 text-sm outline-none  focus:border-b-3 "
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleFormInputChange}
              className="w-full border-b border-black  bg-transparent pb-1 text-sm outline-none focus:border-b-3"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleFormInputChange}
              className="w-full border-b border-black bg-transparent pb-1 text-sm outline-none focus:border-b-3 resize-none"
            />

            <button
              type="submit"
              disabled={!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.message.trim()}
              className="bg-terracotta text-cream text-sm font-semibold uppercase px-8 py-2"
            >
              Send Message
            </button>
          </form>

        </div>
        <div className="bg-white/60 p-7 sm:p-9">
          <h2 className="font-primary text-2xl">Community Suggestions</h2>
          <p className="mt-1 font-secondary text-xs text-charcoal/60">Your ideas drive our menu. Tell us what you would like to see.</p>

          <form onSubmit={handleSuggestionSubmit} className="mt-6 space-y-4">
            <SuggestionsDropdown
              options={suggestionOptions}
              selected={selectedSuggestion}
              onChange={setSelectedSuggestion}
            />
            <textarea
              aria-label="Share your thoughts with React"
              placeholder="Share your thoughts with our culinary team..."
              rows={3}
              value={suggestionMessage}
              onChange={(e) => setSuggestionMessage(e.target.value)}
              className="w-full resize-none border border-charcoal/10 bg-white px-3 py-3 font-secondary text-xs outline-none placeholder:text-charcoal/45"
            />
            <button
              type="submit"
              disabled={!selectedSuggestion || !suggestionMessage.trim()}
              className="w-full border border-charcoal bg-transparent py-2 font-secondary text-sm font-semibold uppercase tracking-wider text-charcoal disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Suggestion
            </button>
          </form>

        </div>
      </section>
      <section className="relative overflow-hidden rounded-sm py-16 text-cream">
        <img src={aboutSubscriptions} alt="A warm restaurant dining scene" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto max-w-xl bg-cream/90 px-6 py-8 text-center sm:px-12">
          <h2 className="font-primary text-3xl">Join the Table</h2>
          <p className="mx-auto mt-2 max-w-sm font-secondary text-xs leading-5 text-charcoal/70">Subscribe to receive exclusive invitations to tasting menus, seasonal events, and culinary insights directly from our kitchen.</p>

          {/* the subscription section displayed */}
          <form onSubmit={handleSubscriptionSubmit} className="mx-auto mt-5 flex max-w-sm flex-col gap-2 sm:flex-row">
            <input
              aria-label="Email for subscription"
              type="email"
              placeholder="Enter your email"
              value={subscriptionEmail}
              onChange={(e) => setSubscriptionEmail(e.target.value)}
              required
              className="min-w-0 flex-1 bg-white px-3 py-3 font-secondary text-xs text-charcoal outline-none placeholder:text-charcoal/45"
            />
            <button
              type="submit"
              disabled={!subscriptionEmail.trim()}
              className="bg-terracotta px-6 py-3 font-secondary text-[10px] font-semibold uppercase tracking-wider text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default About
