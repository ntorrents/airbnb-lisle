import apartmentsData from "../data/apartments.json";

const STORAGE_KEY = "family-apartment-blocks";

const parseStoredBlocks = () => {
	if (typeof window === "undefined") return {};
	try {
		const rawValue = window.localStorage.getItem(STORAGE_KEY);
		return rawValue ? JSON.parse(rawValue) : {};
	} catch {
		return {};
	}
};

const writeStoredBlocks = (blocksMap) => {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blocksMap));
};

// Función para obtener todos los apartamentos
export const getAllApartments = () => {
	return apartmentsData.apartments;
};

// Función para obtener un apartamento por su ID
export const getApartmentById = (id) => {
	return apartmentsData.apartments.find((apt) => apt.id === id);
};

// Función para verificar disponibilidad en un rango de fechas
export const checkAvailability = (apartmentId, checkIn, checkOut) => {
	const apartment = getApartmentById(apartmentId);
	if (!apartment) return false;

	// Convertir las fechas a objetos Date
	const checkInDate = new Date(checkIn);
	const checkOutDate = new Date(checkOut);

	// Por defecto, los apartamentos están siempre disponibles
	// Solo verificamos si hay conflictos con reservas existentes
	const bookings = getApartmentBookings(apartmentId);
	return !bookings.some((booking) => {
		const bookingStart = new Date(booking.checkIn);
		const bookingEnd = new Date(booking.checkOut);

		// Verificar si hay solapamiento entre las fechas solicitadas y las reservas existentes
		return checkInDate < bookingEnd && checkOutDate > bookingStart;
	});
};

// Función para crear una nueva reserva
export const createBooking = (apartmentId, booking) => {
	// En una aplicación real, esto se haría con una API
	// Aquí simulamos la operación actualizando el objeto en memoria

	const apartment = getApartmentById(apartmentId);
	if (!apartment)
		return { success: false, message: "Apartamento no encontrado" };

	// Verificar disponibilidad
	if (!checkAvailability(apartmentId, booking.checkIn, booking.checkOut)) {
		return {
			success: false,
			message: "Las fechas seleccionadas no están disponibles",
		};
	}

	// Generar ID único para la reserva
	const bookingId = `booking-${Date.now()}`;

	// Crear objeto de reserva
	const newBooking = {
		id: bookingId,
		...booking,
		createdAt: new Date().toISOString(),
	};

	// Añadir la reserva al apartamento
	apartment.bookings.push(newBooking);

	// Ya no necesitamos manipular la disponibilidad manualmente
	// La disponibilidad se calcula automáticamente basándose en las reservas existentes

	return { success: true, booking: newBooking };
};

export const getManualBlocks = (apartmentId) => {
	const blocksMap = parseStoredBlocks();
	return blocksMap[apartmentId] || [];
};

export const addManualBlock = (apartmentId, block) => {
	const apartment = getApartmentById(apartmentId);
	if (!apartment) {
		return { success: false, message: "Apartamento no encontrado" };
	}

	if (!checkAvailability(apartmentId, block.checkIn, block.checkOut)) {
		return {
			success: false,
			message: "Ese rango ya está ocupado por otra reserva/bloqueo",
		};
	}

	const blocksMap = parseStoredBlocks();
	const newBlock = {
		id: `manual-${Date.now()}`,
		checkIn: block.checkIn,
		checkOut: block.checkOut,
		note: block.note || "Bloqueo familiar",
		type: "manual-block",
		createdAt: new Date().toISOString(),
	};

	blocksMap[apartmentId] = [...(blocksMap[apartmentId] || []), newBlock];
	writeStoredBlocks(blocksMap);

	return { success: true, block: newBlock };
};

export const addFamilyBlock = (apartmentId, block) =>
	addManualBlock(apartmentId, {
		checkIn: block.checkIn,
		checkOut: block.checkOut,
		note: block.reason || "uso-familiar",
	});

export const removeManualBlock = (apartmentId, blockId) => {
	const blocksMap = parseStoredBlocks();
	const currentBlocks = blocksMap[apartmentId] || [];
	blocksMap[apartmentId] = currentBlocks.filter((block) => block.id !== blockId);
	writeStoredBlocks(blocksMap);
	return { success: true };
};

export const removeFamilyBlock = (apartmentId, blockId) =>
	removeManualBlock(apartmentId, blockId);

// Función para cancelar una reserva
export const cancelBooking = (apartmentId, bookingId) => {
	const apartment = getApartmentById(apartmentId);
	if (!apartment)
		return { success: false, message: "Apartamento no encontrado" };

	const bookingIndex = apartment.bookings.findIndex((b) => b.id === bookingId);
	if (bookingIndex === -1)
		return { success: false, message: "Reserva no encontrada" };

	// Eliminar la reserva
	apartment.bookings.splice(bookingIndex, 1);

	// Ya no necesitamos restaurar la disponibilidad manualmente
	// La disponibilidad se calcula automáticamente basándose en las reservas restantes

	return { success: true };
};

// Función para obtener todas las reservas de un apartamento
export const getApartmentBookings = (apartmentId) => {
	const apartment = getApartmentById(apartmentId);
	if (!apartment) return [];

	const manualBlocks = getManualBlocks(apartmentId);
	return [...apartment.bookings, ...manualBlocks];
};

export const getCombinedBookings = (apartmentId) =>
	getApartmentBookings(apartmentId);

export const getAllFamilyBlocks = () => {
	return getAllApartments().flatMap((apartment) => {
		const blocks = getManualBlocks(apartment.id);
		return blocks.map((block) => ({
			...block,
			apartmentId: apartment.id,
			apartmentName: apartment.name,
			reason: block.note || "Bloqueo familiar",
		}));
	});
};
