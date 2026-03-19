export interface ScientificTerm {
  term: string;
  definition: string;
  patentPhrasing: string;
  category: string;
}

export const scientificTerminology: ScientificTerm[] = [
  {
    term: 'Mechanism',
    definition: 'A system of parts working together in a machine; a piece of machinery.',
    patentPhrasing: 'a mechanism configured to perform [action], the mechanism comprising [components]',
    category: 'Mechanical',
  },
  {
    term: 'Apparatus',
    definition: 'The technical equipment or machinery needed for a particular activity or purpose.',
    patentPhrasing: 'an apparatus for [purpose], the apparatus comprising [components]',
    category: 'General',
  },
  {
    term: 'Embodiment',
    definition: 'A tangible or visible form of an idea, quality, or feeling; a specific implementation of an invention.',
    patentPhrasing: 'in one embodiment, [description]; in another embodiment, [alternative description]',
    category: 'Patent Language',
  },
  {
    term: 'Configuration',
    definition: 'An arrangement of elements in a particular form, figure, or combination.',
    patentPhrasing: 'a configuration comprising [elements] arranged to [function]',
    category: 'General',
  },
  {
    term: 'Substrate',
    definition: 'A surface or material on or from which an organism lives, grows, or obtains its nourishment; a base layer.',
    patentPhrasing: 'a substrate having a first surface and a second surface, wherein [description]',
    category: 'Materials',
  },
  {
    term: 'Interface',
    definition: 'A point where two systems, subjects, organizations, etc. meet and interact.',
    patentPhrasing: 'an interface configured to communicatively couple [first element] to [second element]',
    category: 'Computing/Electronics',
  },
  {
    term: 'Algorithm',
    definition: 'A process or set of rules to be followed in calculations or other problem-solving operations.',
    patentPhrasing: 'an algorithm implemented by a processor, the algorithm comprising steps of [steps]',
    category: 'Computing/Electronics',
  },
  {
    term: 'Actuator',
    definition: 'A component of a machine that is responsible for moving and controlling a mechanism or system.',
    patentPhrasing: 'an actuator operably coupled to [component], the actuator configured to [action]',
    category: 'Mechanical',
  },
  {
    term: 'Transducer',
    definition: 'A device that converts variations in a physical quantity into an electrical signal, or vice versa.',
    patentPhrasing: 'a transducer configured to convert [input signal type] to [output signal type]',
    category: 'Electronics',
  },
  {
    term: 'Polymer',
    definition: 'A substance that has a molecular structure consisting chiefly of a large number of similar units bonded together.',
    patentPhrasing: 'a polymer material comprising [monomer units], wherein the polymer has [properties]',
    category: 'Materials',
  },
  {
    term: 'Catalyst',
    definition: 'A substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change.',
    patentPhrasing: 'a catalyst selected from the group consisting of [list], wherein the catalyst facilitates [reaction]',
    category: 'Chemistry',
  },
  {
    term: 'Electrode',
    definition: 'A conductor through which electricity enters or leaves an object, substance, or region.',
    patentPhrasing: 'a first electrode and a second electrode, wherein the first electrode is configured to [function]',
    category: 'Electronics',
  },
  {
    term: 'Semiconductor',
    definition: 'A solid substance that has a conductivity between that of an insulator and that of most metals.',
    patentPhrasing: 'a semiconductor layer disposed on [substrate], the semiconductor layer comprising [material]',
    category: 'Electronics',
  },
  {
    term: 'Nanotechnology',
    definition: 'The branch of technology that deals with dimensions and tolerances of less than 100 nanometers.',
    patentPhrasing: 'a nanostructure having dimensions in the range of [range] nanometers, configured to [function]',
    category: 'Advanced Materials',
  },
  {
    term: 'Resonance',
    definition: 'The condition in which an object or system is subjected to an oscillating force having a frequency close to its own natural frequency.',
    patentPhrasing: 'a resonant frequency of approximately [value] Hz, wherein resonance is achieved by [method]',
    category: 'Physics',
  },
  {
    term: 'Photovoltaic',
    definition: 'Relating to the production of electric current at the junction of two substances exposed to light.',
    patentPhrasing: 'a photovoltaic cell configured to convert incident light into electrical energy, comprising [layers]',
    category: 'Energy',
  },
  {
    term: 'Microprocessor',
    definition: 'An integrated circuit that contains all the functions of a central processing unit of a computer.',
    patentPhrasing: 'a microprocessor configured to execute instructions stored in a memory, the microprocessor comprising [components]',
    category: 'Computing/Electronics',
  },
  {
    term: 'Viscosity',
    definition: 'The state of being thick, sticky, and semifluid in consistency, due to internal friction.',
    patentPhrasing: 'a fluid having a viscosity in the range of [range] at [temperature], wherein viscosity is measured by [method]',
    category: 'Chemistry',
  },
  {
    term: 'Thermal Conductivity',
    definition: 'The rate at which heat passes through a specified material, expressed as the amount of heat that flows per unit time.',
    patentPhrasing: 'a material having a thermal conductivity of at least [value] W/m·K, configured to [function]',
    category: 'Materials',
  },
  {
    term: 'Oscillation',
    definition: 'Movement back and forth at a regular speed; variation in magnitude or position around a central point.',
    patentPhrasing: 'an oscillating element configured to oscillate at a frequency of [value], wherein oscillation is driven by [source]',
    category: 'Physics',
  },
  {
    term: 'Membrane',
    definition: 'A thin pliable sheet of material forming a barrier or lining.',
    patentPhrasing: 'a membrane having a first surface and a second surface, the membrane configured to selectively permit [substance] to pass therethrough',
    category: 'Materials',
  },
  {
    term: 'Capacitor',
    definition: 'A device used to store an electric charge, consisting of one or more pairs of conductors separated by an insulator.',
    patentPhrasing: 'a capacitor having a capacitance of [value], the capacitor electrically coupled to [component]',
    category: 'Electronics',
  },
  {
    term: 'Torque',
    definition: 'A twisting force that tends to cause rotation.',
    patentPhrasing: 'a torque of at least [value] N·m applied to [component], wherein torque is generated by [source]',
    category: 'Mechanical',
  },
  {
    term: 'Biocompatible',
    definition: 'Not harmful or toxic to living tissue; compatible with living tissue or a living system.',
    patentPhrasing: 'a biocompatible material selected from the group consisting of [materials], wherein the material is configured to [function] in a biological environment',
    category: 'Biomedical',
  },
  {
    term: 'Spectroscopy',
    definition: 'The branch of science concerned with the investigation and measurement of spectra produced when matter interacts with or emits electromagnetic radiation.',
    patentPhrasing: 'a spectroscopic method comprising the steps of [steps], wherein spectroscopic analysis is performed using [instrument]',
    category: 'Analytical',
  },
  {
    term: 'Hydraulic',
    definition: 'Denoting, relating to, or operated by a liquid moving in a confined space under pressure.',
    patentPhrasing: 'a hydraulic system comprising a pump, a cylinder, and a fluid reservoir, wherein hydraulic pressure of [value] is applied to [component]',
    category: 'Mechanical',
  },
  {
    term: 'Electromagnetic',
    definition: 'Relating to the interrelation of electric currents or fields and magnetic fields.',
    patentPhrasing: 'an electromagnetic field generated by [source], the electromagnetic field having a frequency of [value] and an intensity of [value]',
    category: 'Physics',
  },
  {
    term: 'Alloy',
    definition: 'A metal made by combining two or more metallic elements, especially to give greater strength or resistance to corrosion.',
    patentPhrasing: 'an alloy comprising [percentage]% [element A] and [percentage]% [element B], wherein the alloy has a tensile strength of at least [value]',
    category: 'Materials',
  },
  {
    term: 'Microfluidic',
    definition: 'Relating to or involving the manipulation of very small volumes of fluid.',
    patentPhrasing: 'a microfluidic channel having a width of [value] micrometers, configured to transport [fluid] at a flow rate of [value]',
    category: 'Biomedical',
  },
  {
    term: 'Piezoelectric',
    definition: 'Having or involving electric polarization resulting from the application of mechanical stress.',
    patentPhrasing: 'a piezoelectric element configured to generate an electrical signal in response to mechanical deformation, the piezoelectric element comprising [material]',
    category: 'Electronics',
  },
  {
    term: 'Composite Material',
    definition: 'A material made from two or more constituent materials with significantly different physical or chemical properties.',
    patentPhrasing: 'a composite material comprising a matrix of [material A] reinforced with [material B], wherein the composite has [properties]',
    category: 'Materials',
  },
  {
    term: 'Photolithography',
    definition: 'A process used in microfabrication to pattern parts of a thin film or the bulk of a substrate.',
    patentPhrasing: 'a photolithographic process comprising the steps of applying a photoresist layer, exposing the layer to [radiation], and developing the pattern',
    category: 'Manufacturing',
  },
];
