export type TeamMember = {
  name: string;
  role: string;
  education: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  linkedinUrl?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Fernando Robles Rivera",
    role: "Ingeniero en Sistemas Computacionales",
    education: "Maestría en Inteligencia Artificial",
    description: "Desarrollador de sistemas inteligentes enfocado en convertir retos reales en soluciones de software, modelos de IA e integraciones que puedan comprenderse, medirse y evolucionar con la comunidad.",
    imageUrl: "/team/fernando-robles-rivera-1024.avif",
  },
  {
    name: "Manuel Antonio Camacho Reyes",
    role: "Desarrollador de Sistemas Inteligentes",
    education: "Maestría en Inteligencia Artificial",
    description: "Profesional de inteligencia artificial orientado al diseño de soluciones inteligentes, la experimentación aplicada y la construcción responsable de tecnología con impacto en problemas concretos.",
    imageUrl: "/team/manuel-antonio-camacho-reyes-1024.avif",
  },
  {
    name: "Eduardo T. Martínez Morales",
    role: "Geólogo de Exploración Senior",
    education: "Maestría en Inteligencia Artificial en curso · UPMH",
    description: "Especialista en cartografía, sensores remotos y geociencia de datos.",
    imageUrl: "/team/eduardo-martinez.svg",
    imageAlt: "Iniciales EM",
    linkedinUrl: "https://www.linkedin.com/in/martinezmoraleset/",
  },
  {
    name: "José Manuel Meza González",
    role: "Profesional de tecnología · Emergys México",
    education: "Universidad Politécnica Metropolitana de Hidalgo · 2022–2025",
    description: "Desarrolla su trayectoria en tecnología, con experiencia en Emergys México y formación en la Universidad Politécnica Metropolitana de Hidalgo.",
    imageUrl: "/team/jose-manuel-meza.svg",
    imageAlt: "Iniciales JM",
    linkedinUrl: "https://www.linkedin.com/in/jose-manuel-meza-gonzalez-574342a6/",
  },
  {
    name: "Mauro Alberto Ramos Ángeles",
    role: "Ingeniero de Sistemas",
    education: "Universidad Politécnica Metropolitana de Hidalgo · 2025–2027",
    description: "Ingeniero de sistemas con experiencia gerencial e interés en tecnología y desarrollo.",
    imageUrl: "/team/mauro-ramos.svg",
    imageAlt: "Iniciales MR",
    linkedinUrl: "https://www.linkedin.com/in/mauro-alberto-ramos-angeles-4b4649194/",
  },
];
