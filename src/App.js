import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";
import { HomePage } from "./components/pages/HomePage";
import { MetalGearFeelings } from "./components/pages/dome/MetalGearFeelings";
import { DimonsWizardLair } from "./components/pages/dome/DimonsWizardLair";
import { Serbal } from "./components/pages/pol/Serbal";
import { SavingVhuVhu } from "./components/pages/dome/SavingVhuVhu";
import { MantineProvider } from "@mantine/core";
import { Mu } from "./components/pages/pol/Mu";
import { PeepingDeath } from "./components/pages/dome/PeepingDeath";
import { Chiuhuahua } from "./components/pages/pol/Chiuhuahua";
import { Miscellaneous } from "./components/pages/dome/Miscellaneous";
import BlankComponent from "./components/pol/blank";
import { Video_Camara } from "./components/pol/en_que_momento_esta_camara_deja_de_serlo";
import { Cundits_EU } from "./components/pol/cundits_en_euskalherria";
import { Vertical } from "./components/pol/vertical";
import { Rxtx } from "./components/pol/rxtx";
import { Casa } from "./components/pol/cosas_de_casa";
import { F } from "./components/pol/f";
import Dededemons from "./components/pol/dededemons";
import Bio from "./components/pol/polcrosasbio";
import ScrollToTop from "./components/pages/pol/ScrollToTop";
import { TapetumLucidum } from "./components/pages/dome/TapetumLucidum";
import Cundits from "./components/pol/cundits";
import Carglass from "./components/pol/carglass";
import Inout from "./components/pol/inout";
import Tarot from "./components/pol/tarot";
import Volum from "./components/pol/volum";
import { Foflas } from "./components/pol/foflas";

const App = () => {
  return (
    <div className="my-element">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Router>
          <ScrollToTop></ScrollToTop>
          <Routes>
            <Route path="/:artistName" element={<HomePage />} />
            <Route
              path="/metal_gear_feelings"
              element={<MetalGearFeelings />}
            />
            <Route path="/tapetum_lucidum" element={<TapetumLucidum />} />
            <Route path="/dimons-wizard-lair" element={<DimonsWizardLair />} />
            <Route path="/miau" element={<SavingVhuVhu />} />
            <Route path="/serbal" element={<Serbal />} />
            {/* <Route path="/" element={<MajinDonPatchInfo />} /> */}
            <Route path="/mu" element={<Mu />} />
            <Route path="/bobobo" element={<PeepingDeath />} />
            <Route path="/chiuhuahua" element={<Chiuhuahua />} />
            <Route path="/miscellaneous" element={<Miscellaneous />} />

            <Route path="/blank" element={<BlankComponent />} />
            <Route
              path="/en_que_momento_esta_camara_deja_de_serlo"
              element={<Video_Camara />}
            />
            <Route path="/cundits_en_euskalherria" element={<Cundits_EU />} />
            <Route
              path="/vertical_but_rather_be_horizontal"
              element={<Vertical />}
            />
            <Route path="/rxtx" element={<Rxtx />} />
            <Route path="/cosas_de_casa" element={<Casa />} />
            <Route path="/f" element={<F />} />
            <Route path="/dededemons" element={<Dededemons />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/cundits" element={<Cundits />} />
            <Route path="/carglass" element={<Carglass />} />
            <Route path="/inout" element={<Inout />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/volum" element={<Volum />} />
            <Route path="/foflas" element={<Foflas />} />

            <Route path="/" element={<Navigate to="/pol" />} />
            <Route path="*" element={<Navigate to="/pol" />} />
          </Routes>
        </Router>
      </MantineProvider>
    </div>
  );
};

export default App;
