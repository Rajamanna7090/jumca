export type Tag = "gate" | "interview";

export interface Unit {
  id: string;
  title: string;
  lectures: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  tags: Tag[];
  units: Unit[];
  books: string[];
  elective?: "I" | "II" | "III";
}

export interface Semester {
  id: "bridge" | "s1" | "s2" | "s3" | "s4";
  label: string;
  short: string;
  tone: "bridge" | "1" | "2" | "3" | "4";
  courses: Course[];
}

const u = (courseId: string, list: [string, number][]): Unit[] =>
  list.map(([title, lectures], i) => ({ id: `${courseId}-u${i + 1}`, title, lectures }));

const c = (
  id: string,
  code: string,
  title: string,
  credits: number,
  tags: Tag[],
  units: [string, number][],
  books: string[],
  elective?: Course["elective"],
): Course => ({ id, code, title, credits, tags, units: u(id, units), books, elective });

export const SEMESTERS: Semester[] = [
  {
    id: "bridge",
    label: "Bridge Course",
    short: "Bridge",
    tone: "bridge",
    courses: [
      c("b11", "CSE/MCA/T/B11", "Computer Fundamentals & C", 0, [], [
        ["Computer organisation basics", 3],
        ["Number systems & data representation", 2],
        ["C basics: data types, operators", 3],
        ["Console I/O (scanf/printf)", 2],
        ["Control statements & loops", 4],
      ], ["Fundamentals of Computers — E. Balagurusamy", "Programming with C — Byron Gottfried"]),
      c("b12", "CSE/MCA/T/B12", "Basic Electronics", 0, [], [
        ["Semiconductors & diodes", 3],
        ["Transistors & amplifiers", 3],
        ["Logic gates", 2],
        ["Flip-flops & counters", 3],
      ], ["Electronic Devices — Boylestad"]),
    ],
  },
  {
    id: "s1",
    label: "Year 1 · Semester I",
    short: "Sem I",
    tone: "1",
    courses: [
      c("111a", "CSE/MCA/T/111A", "Programming Fundamentals & OOP", 4, ["interview"], [
        ["Arrays: 1-D and 2-D", 3],
        ["Functions and pointers", 6],
        ["Structures, unions, files", 4],
        ["Classes & objects in C++", 5],
        ["Inheritance & polymorphism", 6],
        ["Templates & exception handling", 4],
      ], ["The C Programming Language — Kernighan & Ritchie", "Let Us C — Kanetkar", "OOP with C++ — Balagurusamy", "C++ Primer — Lippman"]),
      c("112a", "CSE/MCA/Math/T/112A", "Mathematical Foundations", 3, ["gate"], [
        ["Sets, relations, functions", 4],
        ["Propositional & predicate logic", 5],
        ["Counting & recurrence relations", 5],
        ["Probability fundamentals", 6],
        ["Statistics & distributions", 6],
      ], ["Discrete Mathematics — Kenneth Rosen"]),
      c("113a", "CSE/MCA/T/113A", "Management Information Systems", 3, [], [
        ["Overview & structure of MIS", 2],
        ["Concepts of information & systems", 4],
        ["Decision support systems", 5],
        ["Enterprise systems & ERP", 5],
        ["IS planning & security", 4],
      ], ["Management Information Systems — Laudon & Laudon"]),
      c("114a", "CSE/MCA/T/114A", "Digital Systems", 3, ["gate"], [
        ["Analog vs digital systems", 1],
        ["Number systems & codes", 4],
        ["Boolean algebra & K-maps", 6],
        ["Combinational circuits", 6],
        ["Sequential circuits & counters", 7],
      ], ["Digital Logic & Computer Design — Morris Mano"]),
      c("115a", "CSE/MCA/T/115A", "Graph Theory & Combinatorics", 3, ["gate"], [
        ["Intro to graph theory", 3],
        ["Paths, cycles, connectivity", 5],
        ["Trees & spanning trees", 5],
        ["Planarity & colouring", 5],
        ["Combinatorics & generating functions", 6],
      ], ["Graph Theory — Narsingh Deo"]),
    ],
  },
  {
    id: "s2",
    label: "Year 1 · Semester II",
    short: "Sem II",
    tone: "2",
    courses: [
      c("121a", "CSE/MCA/T/121A", "Data Structures & Algorithms", 3, ["gate", "interview"], [
        ["Elementary data structures", 1],
        ["Stacks, queues, linked lists", 6],
        ["Trees, BST, AVL, heaps", 8],
        ["Graphs & traversals", 6],
        ["Sorting & searching", 6],
        ["Greedy & dynamic programming", 6],
      ], ["Introduction to Algorithms — Cormen (CLRS)", "Data Structures — Tanenbaum"]),
      c("122a", "CSE/MCA/T/122A", "Advanced Programming (Java & Python)", 3, ["interview"], [
        ["Java intro & JVM", 1],
        ["Java OOP concepts", 7],
        ["Exceptions, multithreading, collections", 8],
        ["Python modules & packages", 2],
        ["File & exception handling, OS scripts", 2],
        ["Python OOP", 5],
      ], ["Java: The Complete Reference — Schildt", "Learning Python — Mark Lutz"]),
      c("123a", "CSE/MCA/T/123A", "Computer Architecture", 3, ["gate"], [
        ["Basic structure & instruction sets", 6],
        ["Control unit design", 6],
        ["Fixed & floating point arithmetic", 5],
        ["Memory hierarchy, cache, virtual memory", 8],
        ["I/O organisation, interrupts, DMA", 8],
        ["RISC & parallel processing", 4],
      ], ["Computer Organization — Hamacher", "Computer Architecture — Hennessy & Patterson"]),
      c("124a", "CSE/MCA/T/124A", "Operating Systems", 3, ["gate", "interview"], [
        ["Processes & threads", 5],
        ["CPU scheduling", 4],
        ["Synchronization & deadlocks", 7],
        ["Memory management & virtual memory", 7],
        ["File management", 4],
        ["Device management & disk scheduling", 3],
        ["Protection & security", 5],
      ], ["Operating System Concepts — Silberschatz (Galvin)", "Modern Operating Systems — Tanenbaum"]),
      c("125a", "CSE/MCA/T/125A", "Database Management Systems", 3, ["gate", "interview"], [
        ["ER model & relational model", 5],
        ["SQL & relational algebra", 6],
        ["Normalization", 5],
        ["Indexing: B/B+ trees, hashing", 3],
        ["Query optimization", 2],
        ["Transactions, recovery, concurrency", 6],
      ], ["Database System Concepts — Korth", "Fundamentals of Database Systems — Elmasri & Navathe"]),
    ],
  },
  {
    id: "s3",
    label: "Year 2 · Semester III",
    short: "Sem III",
    tone: "3",
    courses: [
      c("211a", "CSE/MCA/T/211A", "Software Engineering & Metrics", 3, [], [
        ["Process models & OOAD", 6],
        ["Web engineering architectures", 3],
        ["Software quality metrics", 10],
        ["Evaluation metrics & validation", 10],
        ["Testing techniques & strategies", 6],
      ], ["Software Engineering — Pressman"]),
      c("212a", "CSE/MCA/T/212A", "Systems Programming & Compiler Design", 3, ["gate"], [
        ["Assemblers, loaders, editors", 4],
        ["Lexical analysis", 4],
        ["Syntax analysis: LL & LR parsing", 6],
        ["Syntax directed translation", 2],
        ["Runtime environments", 2],
        ["Intermediate & code generation", 5],
      ], ["Compilers: Principles, Techniques & Tools — Aho, Ullman"]),
      c("213a", "CSE/MCA/T/213A", "Data Communication & Computer Networks", 3, ["gate", "interview"], [
        ["OSI & TCP/IP models", 1],
        ["Physical layer & transmission", 5],
        ["Data link layer, error & flow control", 6],
        ["Network layer & routing", 7],
        ["Transport layer & congestion control", 6],
        ["Application layer protocols", 4],
      ], ["Computer Networks — Tanenbaum", "Data Communications — Forouzan"]),
      ...(
        [
          ["214a", "Artificial Intelligence & Applications", ["Search & heuristics", "Knowledge representation", "Planning & reasoning", "Expert systems"]],
          ["214b", "Machine Learning", ["Supervised learning", "Unsupervised learning", "Neural networks", "Model evaluation"]],
          ["214c", "Pattern Recognition", ["Bayesian decision theory", "Parametric estimation", "Clustering", "Feature selection"]],
          ["214d", "Introduction to Data Science", ["Data wrangling", "Exploratory analysis", "Statistical modelling", "Visualisation"]],
          ["214e", "Optimization Techniques", ["Linear programming", "Simplex & duality", "Non-linear optimization", "Metaheuristics"]],
          ["214f", "Soft Computing", ["Fuzzy logic", "Neural networks", "Genetic algorithms", "Hybrid systems"]],
        ] as const
      ).map(([id, t, us]) => c(id, `CSE/MCA/T/${id.toUpperCase()}`, t, 3, [], us.map((x) => [x, 8] as [string, number]), [], "I")),
      ...(
        [
          ["215a", "Distributed Computing", ["Models & clocks", "Mutual exclusion", "Consensus", "Distributed file systems"]],
          ["215b", "Internet of Things", ["IoT architecture", "Sensors & actuators", "Protocols (MQTT, CoAP)", "IoT security"]],
          ["215c", "Network Security", ["Classical cryptography", "Symmetric & public key", "Authentication & PKI", "Firewalls & IDS"]],
          ["215d", "Web Technologies", ["HTML, CSS, JS", "Server-side programming", "Web services & APIs", "Web security"]],
          ["215e", "Software Project Management", ["Project planning", "Estimation", "Risk management", "Monitoring & control"]],
          ["215f", "Microprocessors & Embedded Systems", ["8085/8086 architecture", "Assembly programming", "Interfacing", "Embedded design"]],
        ] as const
      ).map(([id, t, us]) => c(id, `CSE/MCA/T/${id.toUpperCase()}`, t, 3, [], us.map((x) => [x, 8] as [string, number]), [], "II")),
      ...(
        [
          ["216a", "Computer Graphics", ["Raster algorithms", "2D/3D transformations", "Clipping & projection", "Shading & rendering"]],
          ["216b", "Computer Vision", ["Image formation", "Feature detection", "Segmentation", "Recognition"]],
          ["216c", "Bioinformatics", ["Sequence alignment", "Phylogenetics", "Structure prediction", "Genomic databases"]],
          ["216d", "Information Retrieval", ["Indexing", "Retrieval models", "Evaluation", "Web search"]],
          ["216e", "Natural Language Processing", ["Text processing", "Language models", "Parsing", "Semantics & applications"]],
          ["216f", "Multimedia", ["Audio & image compression", "Video coding", "Multimedia networking", "Authoring"]],
          ["216g", "Biometric Systems", ["Fingerprint", "Face & iris", "Multimodal fusion", "Performance evaluation"]],
        ] as const
      ).map(([id, t, us]) => c(id, `CSE/MCA/T/${id.toUpperCase()}`, t, 3, [], us.map((x) => [x, 8] as [string, number]), [], "III")),
    ],
  },
  {
    id: "s4",
    label: "Year 2 · Semester IV",
    short: "Sem IV",
    tone: "4",
    courses: [
      c("221", "CSE/MCA/S/221", "Seminar", 0, [], [
        ["Pick topic & literature survey", 4],
        ["Prepare slides", 4],
        ["Deliver seminar", 2],
      ], []),
      c("222", "CSE/MCA/S/222", "Major Project", 0, [], [
        ["Problem statement & proposal", 4],
        ["Design & architecture", 8],
        ["Implementation", 20],
        ["Testing & report", 8],
        ["Viva voce", 2],
      ], []),
    ],
  },
];

export const ALL_COURSES = SEMESTERS.flatMap((s) => s.courses.map((c) => ({ ...c, semester: s })));

export function findCourse(id: string) {
  return ALL_COURSES.find((c) => c.id === id);
}

export interface ProgressState {
  done: Record<string, boolean>;
  electives: { I?: string; II?: string; III?: string };
}

/** Courses that count toward the student's plan: all core courses + only the chosen elective per basket. */
export function activeCourses(electives: ProgressState["electives"]) {
  return ALL_COURSES.filter((c) => !c.elective || electives[c.elective] === c.id);
}

export function courseProgress(course: Course, done: ProgressState["done"]) {
  const total = course.units.reduce((a, x) => a + x.lectures, 0);
  const completed = course.units.filter((x) => done[x.id]).reduce((a, x) => a + x.lectures, 0);
  return { total, completed, pct: total ? completed / total : 0 };
}

export function overallStats(state: ProgressState) {
  const courses = activeCourses(state.electives);
  let total = 0;
  let completed = 0;
  let credits = 0;
  let totalCredits = 0;
  for (const c of courses) {
    const p = courseProgress(c, state.done);
    total += p.total;
    completed += p.completed;
    totalCredits += c.credits;
    if (p.total && p.completed === p.total) credits += c.credits;
  }
  return { total, completed, credits, totalCredits, pct: total ? completed / total : 0 };
}
