//src/components/CasinoItem.jsx
//Card de un casino: muestra info básica y se expande al estar activa.

export default function CasinoItem({ data, active, onHover, onLeave, onClick }) {
  return (
    <button
      type="button"
      aria-expanded={active}
      aria-label={`Información de ${data.nombre}`}
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      onClick={onClick}
      className={`text-left w-full rounded-3xl border-2 px-4 py-3 transition shadow-md ${
        active
          ? 'border-green-700 ring-2 ring-green-500 bg-gray-700'
          : 'border-gray-700 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold leading-tight text-white">{data.nombre}</h4>
          <p className="text-xs text-gray-400">{data.campus}</p>
        </div>
      </div>

      {/*Panel que se expande solo si está activo*/}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          active ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <p className="mt-2 text-sm text-gray-300">
            {data.direccion || 'Dirección no disponible'}
          </p>
          {data.horario && <p className="text-xs text-gray-400">Horario: {data.horario}</p>}
        </div>
      </div>
    </button>
  );
}
