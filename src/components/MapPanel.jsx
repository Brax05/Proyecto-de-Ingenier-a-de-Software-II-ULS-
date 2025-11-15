//src/components/MapPane.jsx
//Muestra un mapa de Google centrado en las coordenadas recibidas.

export default function MapPane({ lat, lng, zoom = 16 }) {
  const src =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=${zoom}&output=embed`
      : `https://www.google.com/maps?q=Universidad%20de%20La%20Serena&hl=es&z=14&output=embed`;

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border-4 border-slate-900/80 bg-white shadow-xl md:h-[560px]">
      <iframe
        key={`${lat ?? 'uls'},${lng ?? 'uls'}`} //fuerza recarga al cambiar coordenadas
        title="Mapa casinos ULS"
        src={src}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
