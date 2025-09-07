import { useState } from "react";
import { FaStar, FaCalendarAlt, FaUsers } from "react-icons/fa";

const BookingCard = () => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState(1);
	const [showGuestSelector, setShowGuestSelector] = useState(false);

	const pricePerNight = 95;
	const rating = 4.9;
	const reviews = 124;
	const serviceFee = 25;
	const cleaningFee = 45;

	// Calcular el número de noches entre las fechas seleccionadas
	const calculateNights = () => {
		if (!checkIn || !checkOut) return 0;

		const start = new Date(checkIn);
		const end = new Date(checkOut);
		const diffTime = Math.abs(end - start);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	};

	const nights = calculateNights();
	const subtotal = nights * pricePerNight;
	const total = subtotal + serviceFee + cleaningFee;

	const handleReservation = (e) => {
		e.preventDefault();
		alert(
			"¡Gracias por tu interés! Esta es una demostración, en una aplicación real aquí se procesaría la reserva."
		);
	};

	return (
		<div className="border rounded-xl shadow-lg p-6 sticky top-24">
			<div className="flex items-center justify-between mb-6">
				<div>
					<span className="font-bold text-xl">${pricePerNight}</span>
					<span className="text-gray-600"> / noche</span>
				</div>
				<div className="flex items-center">
					<FaStar className="text-[#FF385C] mr-1" />
					<span>{rating}</span>
					<span className="mx-1 text-gray-400">·</span>
					<span className="text-gray-600 underline">{reviews} reseñas</span>
				</div>
			</div>

			<form onSubmit={handleReservation}>
				<div className="border rounded-t-lg overflow-hidden">
					<div className="grid grid-cols-2 border-b">
						<div className="p-3 border-r">
							<label className="block text-xs font-bold mb-1">LLEGADA</label>
							<div className="flex items-center">
								<FaCalendarAlt className="text-gray-400 mr-2" />
								<input
									type="date"
									value={checkIn}
									onChange={(e) => setCheckIn(e.target.value)}
									className="w-full outline-none text-gray-700"
									required
								/>
							</div>
						</div>
						<div className="p-3">
							<label className="block text-xs font-bold mb-1">SALIDA</label>
							<div className="flex items-center">
								<FaCalendarAlt className="text-gray-400 mr-2" />
								<input
									type="date"
									value={checkOut}
									onChange={(e) => setCheckOut(e.target.value)}
									className="w-full outline-none text-gray-700"
									required
								/>
							</div>
						</div>
					</div>

					<div className="relative">
						<div
							className="p-3 flex justify-between items-center cursor-pointer"
							onClick={() => setShowGuestSelector(!showGuestSelector)}>
							<div>
								<label className="block text-xs font-bold mb-1">
									HUÉSPEDES
								</label>
								<div className="flex items-center">
									<FaUsers className="text-gray-400 mr-2" />
									<span>
										{guests} huésped{guests !== 1 ? "es" : ""}
									</span>
								</div>
							</div>
							<div className="text-gray-400">
								{showGuestSelector ? "▲" : "▼"}
							</div>
						</div>

						{showGuestSelector && (
							<div className="absolute top-full left-0 right-0 bg-white border-t p-4 shadow-lg z-10 rounded-b-lg">
								<div className="flex justify-between items-center mb-4">
									<span>Huéspedes</span>
									<div className="flex items-center gap-3">
										<button
											type="button"
											onClick={() => setGuests(Math.max(1, guests - 1))}
											className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-gray-700 transition">
											-
										</button>
										<span>{guests}</span>
										<button
											type="button"
											onClick={() => setGuests(Math.min(4, guests + 1))}
											className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-gray-700 transition">
											+
										</button>
									</div>
								</div>
								<p className="text-sm text-gray-600">Máximo 4 huéspedes</p>
							</div>
						)}
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-[#FF385C] text-white py-3 rounded-lg font-bold mt-4 hover:bg-[#E00B41] transition">
					Reservar
				</button>
			</form>

			{nights > 0 && (
				<div className="mt-6">
					<div className="flex justify-between mb-2">
						<span className="underline">
							${pricePerNight} x {nights} noches
						</span>
						<span>${subtotal}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span className="underline">Tarifa de limpieza</span>
						<span>${cleaningFee}</span>
					</div>
					<div className="flex justify-between mb-4">
						<span className="underline">Tarifa de servicio</span>
						<span>${serviceFee}</span>
					</div>
					<div className="border-t pt-4 flex justify-between font-bold">
						<span>Total</span>
						<span>${total}</span>
					</div>
				</div>
			)}

			<p className="text-center text-sm text-gray-600 mt-4">
				No se te cobrará todavía
			</p>
		</div>
	);
};

export default BookingCard;
