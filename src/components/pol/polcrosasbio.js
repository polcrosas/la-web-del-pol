import React from 'react';
import { LogoHeader } from "../image/LogoHeader";

const PolCrosasBio = () => (
  <div className="bg-white min-h-screen">
    <LogoHeader />

    <div className="mx-4 border-l border-r border-b border-black grid sm:grid-cols-1 lg:grid-cols-3">

      {/* text block — spans 2 cols on desktop */}
      <div className="lg:col-span-2 lg:border-r border-b border-black p-6">
        <p className="mb-5 text-sm leading-relaxed font-bold">
          Pol Crosas (b. 1999, Barcelona) is an artist and curator whose practice encompasses film, publishing, artificial intelligence, and visual/digital arts. He holds a Bachelor's degree in Fine Arts from the University of Barcelona and an MA in Curation and Creation at Elías Querejeta Zine Eskola. He is a member of the obobo collective, working alongside Domenec Miralles and Gustavo Cilleruelo in the field of artificial intelligence-driven creation. He is also a member of atractive_smithers, Barcelona based shitposting group.
        </p>
        <p className="text-sm leading-relaxed font-bold">
          Pol has curated and exhibited in various spaces in Barcelona, San Sebastián, and London. He has created and installed publications, video pieces, and sculptures in venues such as Tabakalera, Colour Factory London, Arts Libris, Gallery46, among others. He has curated film cycles, collaborative publications, and concert series at Arts Santa Mònica, Tabakalera, Rocío Santa Cruz, Galeria dels Àngels, Dabadaba, and Pumarejo, among others. He has published or self-published over 20 artist books, fanzines, catalogs, and comics.
        </p>
      </div>

      {/* links block */}
      <div className="border-b border-black p-6 flex flex-col text-sm font-bold">
        <div className="flex flex-col gap-3">
          <a href="https://www.instagram.com/huidaespectacular1999" target="_blank" rel="noreferrer" className="hover:opacity-50">instagram</a>
          <a href="https://x.com/polcrosas" target="_blank" rel="noreferrer" className="hover:opacity-50">twitter</a>
          <a href="https://vimeo.com/pol" target="_blank" rel="noreferrer" className="hover:opacity-50">vimeo</a>
          <a href="https://www.youtube.com/@polcrosas" target="_blank" rel="noreferrer" className="hover:opacity-50">youtube</a>
        </div>
      </div>

    </div>
  </div>
);

export default PolCrosasBio;
