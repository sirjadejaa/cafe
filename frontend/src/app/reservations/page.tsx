import ReservationForm from "@/components/sections/ReservationForm";

export default function ReservationsPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-4 text-gradient">Reserve Your Table</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Join us for an unforgettable dining experience. Please fill out the form below to secure your spot.
          </p>
        </div>
        <ReservationForm />
      </div>
    </div>
  );
}
