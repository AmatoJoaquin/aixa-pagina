const titulo = document.getElementById("titulo");
const mensaje = document.getElementById("mensaje");
const diasSpan = document.getElementById("dias");
const carrusel = document.getElementById("carrusel");

titulo.innerText = CONFIG.titulo;
mensaje.innerText = CONFIG.mensaje;

// CONTADOR DIAS
const inicio = new Date(CONFIG.fechaInicio);
const hoy = new Date();
const diff = hoy - inicio;
const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
diasSpan.innerText = dias;

// CREAR FOTOS
CONFIG.fotos.forEach((foto) => {
	const img = document.createElement("img");
	img.src = foto;
	carrusel.appendChild(img);
});

// CARRUSEL
let index = 0;
let startX = 0;

carrusel.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
});

carrusel.addEventListener("touchend", (e) => {
	let endX = e.changedTouches[0].clientX;
	let diff = startX - endX;

	if (Math.abs(diff) < 40) return;

	if (diff > 0 && index < CONFIG.fotos.length - 1) index++;
	if (diff < 0 && index > 0) index--;

	carrusel.style.transform = `translateX(-${index * 100}%)`;
});

// SERVICE WORKER
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("service-worker.js");
}
lottie.loadAnimation({
	container: document.getElementById("lottie-overlay"),
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "animaciones/corazones.json",
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
});
