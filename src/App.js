import React, { useEffect, useState } from "react";
import { MappingConstants } from "react-cismap";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import { md5FetchText } from "react-cismap/tools/fetching";
import HeavyRainHazardMap from "@cismet-dev/react-cismap-rainhazardmaps/HeavyRainHazardMap";
import GenericModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import Datengrundlage from "./help/Help10Datengrundlage";
import Karteninhalt from "@cismet-dev/react-cismap-rainhazardmaps/components/customizablehelp/Help20Karteninhalt";
import InKartePositionieren from "./help/Help30InKartePositionieren";
import MeinStandort from "./help/Help40MeinStandort";
import WasserstandAbfragen from "./help/Help50WasserstandAbfragen";
import SimulierteSzenarien from "./help/Help60SimulierteSzenarien";
import Aussagekraft from "./help/Help70AussagekraftDerSimulationen";
import ModellfehlerMelden from "@cismet-dev/react-cismap-rainhazardmaps/components/customizablehelp/Help80ModellfehlerMelden";
import Haftungsausschluss from "./help/Help90HaftungsausschlussWupp";
import Footer from "@cismet-dev/react-cismap-rainhazardmaps/components/customizablehelp/Help99Footer";
import { getGazDataForTopicIds } from "react-cismap/tools/gazetteerHelper";

import config from "./config";
import { getApplicationVersion } from "./version";

function App() {
  const email = "starkregen@stadt.wuppertal.de";
  const [gazData, setGazData] = useState([]);

  const getGazData = async (setData) => {
    const prefix = "GazDataForStarkregengefahrenkarteByCismet";
    const sources = {};

    sources.geps = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/geps.json"
    );
    sources.geps_reverse = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/geps_reverse.json"
    );
    sources.adressen = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/adressen.json"
    );
    sources.bezirke = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/bezirke.json"
    );
    sources.quartiere = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/quartiere.json"
    );
    sources.pois = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/pois.json"
    );
    sources.kitas = await md5FetchText(
      prefix,
      "https://wunda-geoportal.cismet.de/data/3857/kitas.json"
    );

    const gazData = getGazDataForTopicIds(sources, [
      "geps",
      "geps_reverse",
      "pois",
      "kitas",
      "quartiere",
      "bezirke",
      "adressen",
    ]);

    setData(gazData);
  };

  useEffect(() => {
    getGazData(setGazData);
  }, []);
  return (
    <TopicMapContextProvider
      appKey={"cismetRainhazardMap.Wuppertal"}
      referenceSystem={MappingConstants.crs3857}
      referenceSystemDefinition={MappingConstants.proj4crs3857def}
      infoBoxPixelWidth={370}
    >
      <HeavyRainHazardMap
        applicationMenuTooltipString='Anleitung | Hintergrund'
        appMenu={
          <GenericModalApplicationMenu
            menuIntroduction={
              <span>
                Bitte wählen Sie eine der folgenden farbigen Schaltflächen, um sich weitere
                Informationen zu dem entsprechenden Thema anzeigen zu lassen:
              </span>
            }
            menuIcon='info'
            menuTitle='Kompaktanleitung und Hintergrundinformationen'
            menuSections={[
              <Datengrundlage key='Datengrundlage' />,
              <Karteninhalt key='Karteninhalt' simulationsklammer='Stärke 6, Stärke 10' />,
              <InKartePositionieren key='InKartePositionieren' />,
              <MeinStandort key='MeinStandort' />,
              <WasserstandAbfragen key='Wasserstand' />,
              <SimulierteSzenarien key='SimulierteSzenarien' />,
              <Aussagekraft key='Aussagekraft' />,
              <ModellfehlerMelden key='ModellfehlerMelden' email={email} />,
              <Haftungsausschluss key='Haftungsausschluss' />,
            ]}
            menuFooter={
              <Footer
                appName='Starkregengefahrenkarte Wuppertal (Alpha)'
                version={getApplicationVersion()}
                hintergrundkartenText='True Orthophoto 2022, Amtliche Basiskarte (ABK), Hillshade © Stadt Wuppertal | Stadtkarte 2.0 © RVR | WebAtlasDE © BKG'
                taglineModelling={
                  <div>
                    <b>Modellierung und Simulationsberechnung</b> (Version 2.0 | 12/2020):{" "}
                    <a
                      target='_customer'
                      href='https://www.wsw-online.de/wsw-energie-wasser/privatkunden/'
                    >
                      WSW Energie und Wasser AG
                    </a>{" "}
                    |{" "}
                    <a target='_pecher' href='https://www.pecher.de/'>
                      Dr. Pecher AG (Erkrath)
                    </a>
                  </div>
                }
              />
            }
          />
        }
        gazetteerSearchPlaceholder='Stadtteil | Adresse | POI | GEP'
        emailaddress={email}
        initialState={config.initialState}
        config={config.config}
        homeZoom={18}
        homeCenter={[51.27202324060668, 7.20162372978018]}
        modeSwitcherTitle='Starkregengefahrenkarte (Alpha)'
        documentTitle='Starkregengefahrenkarte (Alpha) Wuppertal'
        gazData={gazData}
      />
    </TopicMapContextProvider>
  );
}

export default App;
