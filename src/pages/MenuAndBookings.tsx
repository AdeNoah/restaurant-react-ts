
const MenuAndBookings = () => {
  return (
    <div>
      <div className="mx-0 w-full px-0 relative h-fit">
        <img src="src/assets/images/menu-banner.png" alt="Home banner" className="w-full h-91 object-cover" />

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white/30 text-charcoal p-10 rounded-md  max-w-lg text-center">
            <p className="font-primary text-2xl mb-2">Our Menu</p>
            <p>Experience flavours prepared with precision.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuAndBookings
