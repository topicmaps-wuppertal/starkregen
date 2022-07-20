import { starkregenConstants } from "@cismet-dev/react-cismap-rainhazardmaps/constants";

const overridingBaseLayerConf = {};

const config = {
  upperleftX: 780160.203, //take a depth3857.tif and run gdalinfo on it get the pixelsize and upperleftcorner info from there
  upperleftY: 6678245.042,
  pixelsize: 1.595781324768881,
  minAnimationZoom: 17,
  minFeatureInfoZoom: 19,
  timeSeriesAvailable: false,
  rasterfariURL: "https://rasterfari-wuppertal.cismet.de",
  modelWMS: "https://starkregen-wuppertal.cismet.de/geoserver/wms?SERVICE=WMS",
  simulations: [
    {
      depthLayer: "starkregen:S11_T50_depth",

      velocityLayer: "starkregen:S11_T50_velocity",
      directionsLayer: "starkregen:S11_T50_direction",
      depthStyle: "starkregen:depth",
      velocityStyle: "starkregen:velocity",
      directionStyle: "starkregen:direction",

      animation: "11_T50/",
      name: "Stärke 6",
      title: "Starkregen SRI 6 (38,5 l/m² in 2h)",
      icon: "bar-chart",
      subtitle:
        "Simulation eines zweistündigen Starkregens mit 38,5 Liter/m² Niederschlag (Starkregenindex SRI 6) in ganz Wuppertal, statistische Wiederkehrzeit 50 Jahre",
    },
    {
      depthLayer: "starkregen:S12_T100_depth",
      velocityLayer: "starkregen:S12_T100_velocity",
      directionsLayer: "starkregen:S12_T100_direction",
      depthStyle: "starkregen:depth",
      velocityStyle: "starkregen:velocity",
      directionStyle: "starkregen:direction",
      animation: "12_T100/",
      name: "Stärke 7",
      icon: "bar-chart",
      title: "Starkregen SRI 7 (42 l/m² in 2h)",
      subtitle:
        "Simulation eines zweistündigen Starkregens mit 42 Liter/m² Niederschlag (Starkregenindex SRI 7) in ganz Wuppertal, statistische Wiederkehrzeit 100 Jahre",
    },
    {
      depthLayer: "starkregen:S13_hN90mm_depth",
      velocityLayer: "starkregen:S13_hN90mm_velocity",
      directionsLayer: "starkregen:S13_hN90mm_direction",
      depthStyle: "starkregen:depth",
      velocityStyle: "starkregen:velocity",
      directionStyle: "starkregen:direction",
      animation: "13_hN90mm/",
      name: "Stärke 10",
      icon: "bitbucket",
      title: "Starkregen SRI 10 (90 l/m² in 1h)",
      subtitle:
        "Simulation eines einstündigen Starkregens mit 90 Liter/m² Niederschlag (Starkregenindex SRI 10) in ganz Wuppertal",
    },
    {
      depthLayer: "starkregen:S14_Naturregen_depth",
      velocityLayer: "starkregen:S14_Naturregen_velocity",
      directionsLayer: "starkregen:S14_Naturregen_direction",
      depthStyle: "starkregen:depth",
      velocityStyle: "starkregen:velocity",
      directionStyle: "starkregen:direction",
      animation: "14_Naturregen/",
      name: "29.05.18",
      icon: "calendar",
      title: "Regen vom 29.05.2018 (SRI 11)",
      subtitle:
        "Simulation des Starkregens vom 29.05.2018 (Starkregenindex SRI 11) für das gesamte Stadtgebiet anhand gemessener Niederschlagsmengen",
    },
  ],
  backgrounds: [
    {
      layerkey: "hillshade|bplan_abkg@30|rvrGrundriss@20",
      src: "/starkregen/images/rain-hazard-map-bg/topo.png",
      title: "Top. Karte",
    },
    {
      layerkey: "rvrGrundriss@100|trueOrtho2022@75|rvrSchriftNT@100",
      src: "/starkregen/images/rain-hazard-map-bg/ortho.png",
      title: "Luftbildkarte",
    },
    {
      layerkey: "wupp-plan-live@40",
      src: "/starkregen/images/rain-hazard-map-bg/citymap.png",
      title: "Stadtplan",
    },
  ],
  heightsLegend: [
    { title: "20 cm", lt: 0.1, bg: "#AFCFF9" },
    { title: "40 cm", lt: 0.3, bg: "#FED27B" },
    { title: "75 cm", lt: 0.5, bg: "#E9B279" },
    { title: "100 cm", lt: 1.0, bg: "#DD8C7B" },
  ],
  velocityLegend: [
    { title: "0.5 m/s", lt: 0.1, bg: "#BEC356" },
    { title: "2 m/s", lt: 1, bg: "#DA723E" },
    { title: "4 m/s", lt: 3, bg: "#D64733" },
    { title: "6 m/s", lt: 5, bg: "#8F251B" },
  ],
};

const initialState = {
  displayMode: starkregenConstants.SHOW_HEIGHTS,
  valueMode: starkregenConstants.SHOW_MAXVALUES,

  modelLayerProblem: false,
  featureInfoModeActivated: false,
  currentFeatureInfoValue: undefined,
  currentFeatureInfoSelectedSimulation: undefined,
  currentFeatureInfoPosition: undefined,
  minifiedInfoBox: false,
  selectedSimulation: 0,
  backgroundLayer: undefined,
  selectedBackground: 0,
  animationEnabled: true,
};

const conf = { config, overridingBaseLayerConf, initialState };
export default conf;
