export type Certification = {
  slug: string;
  code: string;
  name: string;
  duration: string;
  price: string;
  validity: string;
  sector: string;
  summary: string;
  covers: string[];
  modules: { title: string; body: string }[];
  eligibility: string[];
  renewal: {
    cycle: string;
    refresher: string;
    notes: string;
  };
  providers: string[];
};

export const certifications: Certification[] = [
  {
    slug: "bosiet",
    code: "BOSIET",
    name: "Basic Offshore Safety Induction & Emergency Training",
    duration: "3 days",
    price: "£900 – £1,200",
    validity: "4 years",
    sector: "Oil & Gas",
    summary:
      "OPITO BOSIET is the mandatory baseline safety qualification for anyone travelling offshore to a UK or international oil & gas installation by helicopter.",
    covers: [
      "Helicopter safety and underwater escape (HUET)",
      "Sea survival and life raft drills",
      "Offshore firefighting and self-rescue",
      "First aid fundamentals",
      "Personal safety and emergency response",
    ],
    modules: [
      { title: "Safety Induction", body: "Offshore hazards, regulatory framework and personal responsibilities." },
      { title: "Helicopter Safety & Escape (HUET)", body: "Helicopter ditching procedures and underwater escape using the HUET simulator." },
      { title: "Sea Survival", body: "Life raft entry, group survival techniques and rescue signalling in cold water." },
      { title: "Firefighting & Self-Rescue", body: "Use of extinguishers, breathing apparatus and smoke-filled escape." },
      { title: "First Aid", body: "Basic life support, CPR and emergency casualty management offshore." },
    ],
    eligibility: [
      "Aged 18 or over",
      "Valid OGUK / equivalent offshore medical",
      "Able to swim 50m unaided",
      "No untreated medical conditions that affect pool work",
    ],
    renewal: {
      cycle: "Every 4 years",
      refresher: "FOET (Further Offshore Emergency Training), 1 day",
      notes: "Many operators also require the CA-EBS endorsement alongside BOSIET / FOET.",
    },
    providers: ["OPITO accredited centres in Aberdeen, Newcastle, Great Yarmouth, Rotterdam, Esbjerg, Houston and Singapore."],
  },
  {
    slug: "gwo-bst",
    code: "GWO BST",
    name: "Global Wind Organisation Basic Safety Training",
    duration: "5 days",
    price: "£1,100 – £1,500",
    validity: "2 years",
    sector: "Offshore Wind",
    summary:
      "GWO BST is the industry standard safety pathway for wind turbine technicians and offshore wind crews working with the major OEMs.",
    covers: [
      "Working at heights on wind turbines",
      "Manual handling techniques",
      "Fire awareness and prevention",
      "First aid for remote casualties",
      "Sea survival for offshore wind",
    ],
    modules: [
      { title: "Working at Heights", body: "Tower climbing, fall arrest systems, rescue from height in a nacelle." },
      { title: "Manual Handling", body: "Safe lifting and handling in turbine and CTV environments." },
      { title: "Fire Awareness", body: "Fire prevention, extinguisher use and tower evacuation drills." },
      { title: "First Aid", body: "Casualty assessment, CPR/AED and remote casualty care." },
      { title: "Sea Survival", body: "CTV transfers, PPE checks, life raft and helicopter rescue scenarios." },
    ],
    eligibility: [
      "Aged 18 or over",
      "Valid ENG1 or equivalent offshore medical",
      "Reasonable level of physical fitness for climbing",
      "No untreated fear of heights or confined spaces",
    ],
    renewal: {
      cycle: "Every 2 years",
      refresher: "GWO BSTR (refresher), 3 days",
      notes: "Some OEMs additionally require GWO BTT (technical) and Advanced Rescue Training.",
    },
    providers: ["GWO accredited centres across the UK, Netherlands, Denmark, Germany, Taiwan and US East Coast."],
  },
  {
    slug: "mist",
    code: "MIST",
    name: "Minimum Industry Safety Training",
    duration: "1 day",
    price: "£200 – £350",
    validity: "4 years",
    sector: "Oil & Gas",
    summary:
      "MIST is required for every worker mobilising to a UKCS offshore installation. It covers the offshore safety regime, common hazards and personal responsibilities.",
    covers: [
      "UKCS offshore safety regime",
      "Major accident hazards and barriers",
      "Working safely, risk assessment and permits to work",
      "Personal responsibility and stop-the-job authority",
      "Manual handling and slips, trips and falls",
    ],
    modules: [
      { title: "Hazards & Barriers", body: "Understanding offshore major accident hazards and how barriers protect them." },
      { title: "Permit to Work", body: "PTW system, isolations and how to challenge unsafe work." },
      { title: "Personal Responsibility", body: "Behavioural safety, intervention and the right to stop work." },
      { title: "Working at Height & Lifting", body: "Common offshore risks and safe practice." },
    ],
    eligibility: [
      "Aged 18 or over",
      "Travelling to a UKCS offshore installation",
      "Can be taken classroom or online (eMIST)",
    ],
    renewal: {
      cycle: "Every 4 years",
      refresher: "Full MIST repeat (1 day) or approved eMIST refresher",
      notes: "Logged on the central Vantage POB system and visible to operators before mobilisation.",
    },
    providers: ["OPITO accredited centres worldwide, plus approved eMIST online providers."],
  },
  {
    slug: "stcw",
    code: "STCW",
    name: "Standards of Training, Certification & Watchkeeping",
    duration: "5 days",
    price: "£700 – £950",
    validity: "5 years",
    sector: "Marine",
    summary:
      "STCW Basic Safety Training is the international maritime safety baseline for any seafarer working on commercial vessels, CTVs, supply boats or yachts.",
    covers: [
      "Personal survival techniques (PST)",
      "Fire prevention and firefighting (FPFF)",
      "Elementary first aid (EFA)",
      "Personal safety and social responsibility (PSSR)",
    ],
    modules: [
      { title: "Personal Survival Techniques", body: "Life jackets, life rafts, immersion suits and group survival in the water." },
      { title: "Fire Prevention & Firefighting", body: "Live fire training, hose handling, BA wear and shipboard firefighting tactics." },
      { title: "Elementary First Aid", body: "Casualty assessment, CPR and basic emergency response onboard." },
      { title: "Personal Safety & Social Responsibility", body: "Shipboard organisation, emergency procedures and effective communication." },
    ],
    eligibility: [
      "Aged 16 or over (18+ for most commercial operators)",
      "Valid ENG1 medical",
      "Able to swim 50m unaided",
      "MCA approved STCW course",
    ],
    renewal: {
      cycle: "Every 5 years",
      refresher: "STCW Updating (PST, FPFF), 2 to 3 days",
      notes: "Security awareness (PSA) and proficiency in security duties (PDSD) are usually paired with STCW Basic.",
    },
    providers: ["MCA approved training centres in Southampton, Plymouth, Glasgow, Antibes, Palma and worldwide."],
  },
  {
    slug: "oguk-eng1",
    code: "OGUK / ENG1",
    name: "Offshore Medical Certificate",
    duration: "Half day",
    price: "£90 – £150",
    validity: "2 years",
    sector: "All sectors",
    summary:
      "Medical fitness assessment required before any offshore mobilisation. OGUK is used in the energy sector, ENG1 by the MCA for seafarers.",
    covers: [
      "General health and medical history review",
      "Vision and hearing tests",
      "Blood pressure and BMI assessment",
      "Urine analysis",
      "Drug & alcohol screening (if employer requires)",
    ],
    modules: [
      { title: "Medical History", body: "Review of past illness, surgery, mental health and current medication." },
      { title: "Physical Examination", body: "Cardiovascular, respiratory and musculoskeletal checks by an approved doctor." },
      { title: "Vision & Hearing", body: "Snellen vision, colour vision and audiometry." },
      { title: "Fitness Determination", body: "Pass, conditional pass with restrictions, or referral for further investigation." },
    ],
    eligibility: [
      "Any age, but minimum 16 for ENG1",
      "Mobilising to an offshore installation, vessel or wind farm",
      "Must be examined by an approved OGUK doctor or MCA approved doctor",
    ],
    renewal: {
      cycle: "Every 2 years (annual after age 65 for ENG1)",
      refresher: "Repeat examination by an approved doctor",
      notes: "Some operators in MENA, West Africa and APAC require additional bespoke medicals.",
    },
    providers: ["OGUK approved doctors and MCA approved medical practitioners in every major port and offshore hub."],
  },
  {
    slug: "ca-ebs",
    code: "CA-EBS",
    name: "Compressed Air Emergency Breathing System",
    duration: "Half day",
    price: "£250 – £400",
    validity: "4 years",
    sector: "Oil & Gas",
    summary:
      "CA-EBS is the helicopter underwater escape add-on now required across most North Sea operators. It teaches you to use the compressed air rebreather during a ditching.",
    covers: [
      "Deployment and arming of CA-EBS",
      "Breathing technique and equalisation",
      "Underwater escape with CA-EBS in HUET",
      "Pre-flight checks and donning procedures",
    ],
    modules: [
      { title: "Equipment Familiarisation", body: "Components, function and inspection of the CA-EBS unit." },
      { title: "Dry Drills", body: "Donning, arming and deploying the unit in a controlled environment." },
      { title: "Wet Drills (HUET)", body: "Underwater escape from the HUET simulator using CA-EBS." },
    ],
    eligibility: [
      "Valid BOSIET or FOET",
      "Valid OGUK medical",
      "Able to swim 50m unaided",
      "No untreated ear, sinus or respiratory conditions",
    ],
    renewal: {
      cycle: "Every 4 years (in line with BOSIET / FOET)",
      refresher: "Renewed alongside FOET",
      notes: "Required by most North Sea operators including Shell, BP, Equinor, TotalEnergies and Harbour.",
    },
    providers: ["OPITO accredited centres in Aberdeen, Newcastle, Great Yarmouth, Stavanger and Esbjerg."],
  },
];

export function getCertBySlug(slug: string) {
  return certifications.find((c) => c.slug === slug);
}
