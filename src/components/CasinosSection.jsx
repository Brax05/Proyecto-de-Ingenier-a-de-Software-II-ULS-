//src/components/CasinosSection.jsx
//Sección que muestra el mapa y la lista de casinos.

import { useMemo, useState } from 'react';
import { CASINOS } from '../data/casinos.js';
import MapPane from './MapPanel.jsx';
import CasinoItem from './CasinoItem';

export default function CasinosSection() {
  const [selectedId, setSelectedId] = useState(CASINOS[0]?.id ?? null);
  const [hoverId, setHoverId] = useState(null);

  const activeId = hoverId ?? selectedId;
  const active = useMemo(
    () => CASINOS.find((c) => c.id === activeId) ?? null,
    [activeId],
  );

  return (
    <section className="mt-10">
      <div className="rounded-[2.5rem] border-4 border-black p-5 md:p-6 bg-green-950">
        <div className="grid gap-6 md:grid-cols-12">
          {/*Mapa a la izquierda*/}
          <div className="md:col-span-7">
            <MapPane lat={active?.lat} lng={active?.lng} />
            <p className="mt-2 text-xs text-white">
              Arrastra y haz zoom en el mapa. Click en una card para centrar el pin.
            </p>
          </div>

          {/*Cards de casinos a la derecha*/}
          <aside className="md:col-span-5">
            <div className="grid gap-3">
              {CASINOS.map((c) => (
                <CasinoItem
                  key={c.id}
                  data={c}
                  active={activeId === c.id}
                  onHover={() => setHoverId(c.id)}
                  onLeave={() => setHoverId(null)}
                  onClick={() => setSelectedId(c.id)}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
