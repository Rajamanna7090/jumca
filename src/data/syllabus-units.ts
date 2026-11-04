// Extracted from the official JU MCA syllabus PDF: every unit with its subtopics and lecture hours.
export const SYLLABUS_UNITS: Record<string, [string, number, string[]][]> = {
 "b11": [
  [
   "Evolution of Computers and Computer Organization",
   4,
   [
    "Stored Program Concept",
    "Von Neumann Architecture",
    "Computer Hardware Generations",
    "Brief overview of organization of modern computers",
    "Basic description of input devices",
    "output devices",
    "storage devices",
    "Primary and Secondary memory",
    "Communication bus",
    "Address bus",
    "Data bus",
    "Control bus",
    "Data and Information",
    "Data Processing"
   ]
  ],
  [
   "Data Representation",
   6,
   [
    "Number System",
    "Decimal",
    "Binary",
    "Octal and Hexadecimal (Whole numbers and fractions)",
    "Addition and subt raction of numbers in different number systems",
    "Different methods of negative number representation",
    "signed magnitude",
    "one’scomplement",
    "two’scomplement",
    "subtraction using complements"
   ]
  ],
  [
   "Definition of Software",
   2,
   [
    "Concept of programming languages –high level",
    "low level programming languages and assembly languages",
    "Types of software",
    "system software",
    "application software",
    "translators (compiler",
    "interpreter",
    "assembler)",
    "operating system",
    "utility software. Introduction to problem solving",
    "Basic concepts of an algorithm",
    "program design methods",
    "flowcharts"
   ]
  ],
  [
   "Introduction to C Programming",
   2,
   [
    "Introduction to Cprogramming",
    "Variables",
    "Data Types",
    "Operator and Expression: Identifier and Keyword",
    "Constant",
    "Integer",
    "Floating Point",
    "Character",
    "String",
    "Enumeration",
    "Data Types in C",
    "Data Declaration & Definition",
    "Operators",
    "Arithmetic",
    "Relational",
    "Logical",
    "Increment & Decrement",
    "Bit wise",
    "Assignment",
    "Conditional",
    "Precedence & Associability of Operators"
   ]
  ],
  [
   "Console I/O",
   2,
   [
    "Character input & Output",
    "String Input & Output",
    "Formatted Input / Output (scanf/printf)"
   ]
  ],
  [
   "Control Statement",
   4,
   [
    "selection statements",
    "nested if",
    "if -else-if",
    "the ? alternative",
    "conditional expression",
    "switch",
    "nested switch",
    "Iteration Statements",
    "for loop",
    "while loop",
    "do- while loop",
    "goto & label",
    "break & continue",
    "exit() function"
   ]
  ]
 ],
 "b12": [
  [
   "DC circuits",
   2,
   [
    "Mesh analysis",
    "Superposition theorem",
    "Thevenin’sand Norton’stheorems",
    "Maximum Power Transfer theorem"
   ]
  ],
  [
   "Circuit Transients",
   2,
   [
    "RC",
    "RL",
    "RLC circuits"
   ]
  ],
  [
   "Semiconductor fundamentals",
   2,
   [
    "Band structure of solids",
    "Intrinsic and extrinsic semiconductor",
    "generation and recombination of carriers",
    "carrier diffusion"
   ]
  ],
  [
   "p-njunction Diodes",
   4,
   [
    "Energy band diagram of p-njunction in equilibrium",
    "under forward and reverse bias",
    "I-Vcharacteristics",
    "breakdown mechanisms",
    "Zener diode",
    "LED"
   ]
  ],
  [
   "Diode Circuits",
   2,
   [
    "Half-wave rectifier",
    "Full-wave rectifier",
    "Zener voltage regulator"
   ]
  ],
  [
   "Transistor",
   2,
   [
    "Structure and operation of BJT"
   ]
  ],
  [
   "Transistor Circuits",
   6,
   [
    "CE",
    "CB",
    "CC configurations",
    "Input",
    "output characteristics",
    "R-Ccoupled amplifiers",
    "Oscillators"
   ]
  ]
 ],
 "111a": [
  [
   "Arrays",
   3,
   [
    "1-Darrays",
    "2-Darrays"
   ]
  ],
  [
   "Functions and Pointers",
   9,
   [
    "function prototypes",
    "nested function calls",
    "Concepts of Recursion",
    "concepts of pointers",
    "Parameter Passing techniques - call by value and call by address",
    "passing arrays to function",
    "void pointer",
    "static vs. Dynamic memory allocation",
    "array of pointers",
    "string handling using pointers",
    "pointer to a function",
    "function returning pointer"
   ]
  ],
  [
   "Structure",
   2,
   [
    "nested structure",
    "array of structures",
    "pointer to structure",
    "self-referential structure"
   ]
  ],
  [
   "IO Handling",
   3,
   [
    "File pointer",
    "File operations",
    "text mode files",
    "binary mode files"
   ]
  ],
  [
   "Pre-processing directives and macro",
   1,
   []
  ],
  [
   "Object Oriented Concepts and C++",
   2,
   [
    "Introduction to object oriented programming concept"
   ]
  ],
  [
   "Overview of Procedural Feature",
   2,
   [
    "Concept of Reference variable",
    "Default Parameters to Function",
    "Function overloading",
    "Inline function",
    "Macro"
   ]
  ],
  [
   "Fundamental Object Oriented Features",
   3,
   [
    "Structure and Class and Object",
    "Abstraction/ Encapsulation",
    "Access Specifier"
   ]
  ],
  [
   "Static Members",
   6,
   [
    "Static Members",
    "Friend Function",
    "Constructor and Destructor",
    "Operator Overloading",
    "Inheritance"
   ]
  ],
  [
   "Abstract Class",
   4,
   [
    "Abstract Class",
    "Run time polymorphism",
    "Virtual Base Class",
    "case studies for class design"
   ]
  ],
  [
   "File Handling",
   4,
   [
    "File Handling",
    "Case Studies for class design"
   ]
  ],
  [
   "Exception Handling",
   2,
   []
  ],
  [
   "Class Template and Function Template",
   2,
   []
  ],
  [
   "Introduction to Namespace",
   1,
   []
  ],
  [
   "Introduction to STL",
   4,
   [
    "Introduction to STL",
    "Case studies for class design"
   ]
  ]
 ],
 "112a": [
  [
   "Statistical Methods",
   10,
   [
    "Objectives of a sample survey",
    "Sample estimate of the attribute of a population",
    "Selection of a sample without bias",
    "Simple random sampling",
    "with and without replacement",
    "Sampling Distributions",
    "Central Limit Theorems",
    "Confidence interval",
    "Hypothesis Testing",
    "Chi-square tests and other testing methods"
   ]
  ],
  [
   "Linear Algebra",
   6,
   [
    "Matrices and Determinants",
    "Characteristic polynomials",
    "Eigen values",
    "Vector spaces",
    "Concept of Inner Product and Metric",
    "Linear Transformations"
   ]
  ],
  [
   "Abstract Algebra",
   12,
   [
    "Binary Operations",
    "Groupoid",
    "Semi -group and Monoid",
    "Group and Subgroup",
    "Cosets",
    "Lagrange’stheorem",
    "Cyclic group",
    "Order of a group",
    "Generators",
    "Normal subgroup",
    "Quotient group",
    "Homomorphism",
    "Isomorphism",
    "Permutation group",
    "Direct product",
    "Rings and sub- rings",
    "Ideals and quotient rings",
    "Integral domains and Fields"
   ]
  ],
  [
   "Introduction to Number Theory",
   6,
   [
    "Divisibility",
    "GCD",
    "Prime Numbers",
    "Infinitude of Primes",
    "Fundamental Theorem of Arithmetic",
    "Congruences",
    "Fermat’s Little Theorem",
    "Euler’s Formula",
    "Chinese Remainder Theorem"
   ]
  ],
  [
   "Induction and Recursion",
   6,
   [
    "Mathematical Induction",
    "Strong Induction and Well-Ordering",
    "Recursive Definitions and Structural Induction"
   ]
  ]
 ],
 "113a": [
  [
   "An overview of MIS",
   2,
   [
    "An overview of MIS",
    "Structure of a MIS",
    "Hardware",
    "Software and Communication technology for information systems"
   ]
  ],
  [
   "Concepts of information",
   6,
   [
    "Concepts of information",
    "Information systems requirements",
    "strategies for the determination of Information requirements",
    "Storage and retrieval of data",
    "transaction processing",
    "office automation and information processing",
    "Functional I nformation system",
    "Marketing",
    "HR",
    "Finance"
   ]
  ],
  [
   "System concepts – system concepts applied to management info…",
   10,
   [
    "System concepts",
    "system concepts applied to management information systems",
    "concepts of planning and control",
    "Organizational structure and management concepts",
    "input/output design",
    "concept of CASE tools",
    "Software project management system",
    "Basics",
    "software effort estimation",
    "quality control",
    "role of human involvement"
   ]
  ],
  [
   "Decision support systems – Concepts of decision making",
   10,
   [
    "Decision support systems",
    "Concepts of decision making",
    "Behavioral models of the decision maker/decision making",
    "Decision making process - phases in the decision making process",
    "intelligence and design phases",
    "support systems for planning",
    "control and dec ision making",
    "support systems for management of knowledge work",
    "Decision support tools"
   ]
  ],
  [
   "Techniques and methodologies for supporting MIS development …",
   12,
   [
    "Techniques and methodologies for supporting MIS development - Data base requirements",
    "data warehousing and business intelligence",
    "data mining",
    "user interface requirements",
    "developing and implementing application systems",
    "Quality assurance and evaluation of Information systems",
    "Organizational and social implications",
    "Implementation of MIS"
   ]
  ]
 ],
 "114a": [
  [
   "Difference between Analog and Digital Systems",
   1,
   []
  ],
  [
   "Number Systems",
   6,
   [
    "Binary number systems",
    "Conversion of binary numbers to decimal numbers and vice - versa",
    "Binary addition",
    "Representation of negative numbers",
    "Binary subtraction",
    "Binary multiplication and division",
    "Octal and hexadecimal numbers",
    "conversion from binary to octal or hexadecimal and vice- versa"
   ]
  ],
  [
   "Binary codes",
   6,
   [
    "Binary Coded Decimal (8421 BCD",
    "Excess -3 BCD)",
    "Addition of BCD numbers",
    "Gray code",
    "Error detecting code",
    "Seven -segment display code",
    "other Alphanumeric codes (ASCII",
    "EBCDIC",
    "ISCII",
    "UNICODE)"
   ]
  ],
  [
   "Boolean algebra and Logic Gates",
   4,
   [
    "Truth Table",
    "AND",
    "OR",
    "NOT and Exclusive -OR operations",
    "Venn Diagram",
    "De Morgan’s Theorem",
    "Universal logic operations",
    "Writing Boolean functions from truth table",
    "AND",
    "OR",
    "NOT",
    "NAND",
    "NOR",
    "Exclusive-OR",
    "Exclusive-NOR"
   ]
  ],
  [
   "Minimization of Boolean functions",
   4,
   [
    "Karnaugh-Veitch Map method",
    "Quine–McCluskey method"
   ]
  ],
  [
   "Combinational digital circuits",
   6,
   [
    "Encoder",
    "Decoder",
    "Multiplexer",
    "Demultiplexer",
    "Magnitude comparator",
    "Parity generator",
    "Parity checker",
    "Half -adder",
    "Full-adder",
    "Sequential adder",
    "Parallel adder",
    "Carry -Look- Ahead adder"
   ]
  ],
  [
   "Sequential digital circuits",
   8,
   [
    "Flip-flops",
    "Registers",
    "Up- down counters",
    "asynchronous and synchronous counters",
    "design methodology of sequential circuits"
   ]
  ],
  [
   "Logic Families",
   5,
   [
    "Bipolar Logic Families (RTL",
    "DTL",
    "HTL",
    "TTL",
    "ECL)",
    "MOS families (MOSFET",
    "CMOS",
    "BiCMOS)"
   ]
  ]
 ],
 "115a": [
  [
   "Introduction to Graph Theory",
   3,
   []
  ],
  [
   "Definitions and Examples",
   8,
   [
    "Definitions and Examples",
    "Subgraphs",
    "Complements",
    "Graph Isomorphism",
    "Degree",
    "Directed and undirected graphs",
    "weighted and unweighted graphs. Cycles",
    "Planarity and Coloring"
   ]
  ],
  [
   "Walk",
   4,
   [
    "Walk",
    "Trail",
    "Path",
    "Cycle",
    "Euler Trails and Circuits",
    "Planar Graphs",
    "Hamilton Paths and Cycles",
    "Vertex coloring",
    "Edge coloring",
    "Chromatic Polynomials. Trees"
   ]
  ],
  [
   "Definitions",
   7,
   [
    "Definitions",
    "Properties and Examples",
    "Rooted Trees",
    "Trees and Sorting",
    "Binary Trees",
    "Weighted Trees and Prefix Codes Optimization in Graphs"
   ]
  ],
  [
   "Shortest Path Algorithms",
   6,
   [
    "Shortest Path Algorithms",
    "Minimal Spanning Trees",
    "the algorithms of Kruskal and Prim",
    "Transport Networks",
    "Max-flow Min-cut Theorem",
    "Matching Theory. Principle of Inclusion and Exclusion"
   ]
  ],
  [
   "The Principle of Inclusion and Exclusion",
   6,
   [
    "The Principle of Inclusion and Exclusion",
    "Generalizations of the Principle",
    "Derangements",
    "Nothing is in its Right Place",
    "Rook Polynomials. Generating Functions"
   ]
  ],
  [
   "Definition and Examples – application of calculus",
   6,
   [
    "Definition and Examples",
    "application of calculus",
    "Partitions of I ntegers",
    "The Exponential Generating Function",
    "The Summation Operator. Recurrence Relations"
   ]
  ]
 ],
 "121a": [
  [
   "Introduction",
   1,
   [
    "Introduction",
    "elementary data structures and their applications"
   ]
  ],
  [
   "Lists",
   8,
   [
    "ordered lists",
    "representation of arrays",
    "linked lists: singly",
    "doubly and circular linked lists",
    "stacks",
    "queues",
    "dequeues",
    "multiples stacks and queues",
    "generalized lists",
    "Applications: polynomial arithmetic",
    "infix",
    "postfix and prefix arithmetic expression conversion and evaluations"
   ]
  ],
  [
   "Trees",
   6,
   [
    "General and binary trees",
    "traversals",
    "threaded binary tree",
    "Binary Search Trees",
    "AVL trees",
    "B- Tree: B+ tree"
   ]
  ],
  [
   "Searching & Sorting",
   4,
   [
    "Linear Search",
    "Hashing",
    "Internal and External sort",
    "Insertion sort",
    "Bubble sort",
    "Selection sort"
   ]
  ],
  [
   "Complexity Analysis",
   2,
   [
    "Complexity measures",
    "Worst",
    "Best and Average Case",
    "Upper and Lower bounds",
    "Order Notations"
   ]
  ],
  [
   "Divide and Conquer Technique",
   4,
   [
    "Definition",
    "Binary Search",
    "Merge Sort",
    "Quick Sort",
    "Multiplication of Large Integers"
   ]
  ],
  [
   "Greedy Algorithms",
   6,
   [
    "Definition",
    "Minimum spanning tree",
    "Dijkstra’s Algorithm for the shortest path",
    "Fractional Knapsack Problem",
    "Scheduling problems"
   ]
  ],
  [
   "Dynamic Programming",
   6,
   [
    "Definition",
    "Making change problem",
    "0-1 Knapsack Problem",
    "Floyd’salgorithm for shortest paths",
    "Chained Matrix Multiplication"
   ]
  ],
  [
   "Introduction to NP-completeness",
   3,
   []
  ]
 ],
 "122a": [
  [
   "Introduction to Java",
   1,
   [
    "Properties of Java",
    "JVM"
   ]
  ],
  [
   "Object-Oriented Programming Concepts",
   7,
   [
    "Classes, Objects, Methods, Constructors",
    "Inheritance",
    "Polymorphism",
    "Packages",
    "Interfaces",
    "Wrapper Classes"
   ]
  ],
  [
   "Exception handling",
   2,
   []
  ],
  [
   "Concurrency",
   3,
   [
    "Threads",
    "Synchronization"
   ]
  ],
  [
   "File Handling (Java)",
   2,
   []
  ],
  [
   "Graphical User Interfaces (GUIs)",
   4,
   [
    "Standard GUI components (buttons, text fields, radio button, check box, list)",
    "Event handling"
   ]
  ],
  [
   "Collection Classes",
   3,
   []
  ],
  [
   "Python: Variables, Operators & Conditionals",
   2,
   [
    "Python Interpreter and Interactive Mode",
    "Variables and Identifiers",
    "Arithmetic Operators",
    "Values and Types",
    "Statements",
    "Boolean Values",
    "Operator Precedence",
    "Expression",
    "If-Else Constructs"
   ]
  ],
  [
   "Python: Loops & Functions",
   2,
   [
    "While Loop",
    "For Loop",
    "Break Statement",
    "Function Call and Returning Values",
    "Parameter Passing",
    "Local and Global Scope",
    "Recursive Functions"
   ]
  ],
  [
   "Python: Introduction to Data Structures",
   4,
   [
    "List: adding, finding, updating items",
    "Nested Lists",
    "Cloning Lists",
    "Looping Through a List",
    "Sorting a List",
    "List Concatenation",
    "List Slices",
    "List Methods",
    "Mutability",
    "Aliasing",
    "Tuples: creation, accessing, updating, deleting",
    "Tuple Assignment & Tuple as Return Value",
    "Nested Tuples",
    "Basic Tuple Operations",
    "Sets",
    "Dictionary operations",
    "Built-in Dictionary Functions & Methods"
   ]
  ],
  [
   "Python: String Operations",
   3,
   [
    "Indexing",
    "Traversing",
    "Concatenating",
    "Appending",
    "Multiplying",
    "Formatting",
    "Slicing",
    "Comparing",
    "Iterating",
    "Built-in String Functions",
    "Dictionary: creating, accessing, adding, modifying, deleting, sorting, looping",
    "Nested Dictionaries",
    "Finding Key and Value in a Dictionary"
   ]
  ],
  [
   "Python: Modules",
   2,
   [
    "Module Loading and Execution",
    "Packages",
    "Making Your Own Module",
    "The Python Standard Libraries",
    "import and from...import Statements",
    "PYTHONPATH Variable",
    "Namespaces and Scoping",
    "dir() Function",
    "globals() and locals() Functions",
    "reload() Function"
   ]
  ],
  [
   "Python: File Handling, Exceptions & System Commands",
   2,
   [
    "File Path",
    "Opening and Closing Files",
    "Reading and Writing Files",
    "File Position",
    "Errors and Exceptions",
    "Exception Handling",
    "Multiple Exceptions",
    "OS internals: os, pid, psutil, shutil, glob, sys"
   ]
  ],
  [
   "Python: Object Oriented Programming",
   5,
   [
    "Creating a class",
    "Instantiating objects",
    "Accessing Attributes",
    "Adding attributes to a class",
    "Built-In Class Attributes",
    "Defining methods in a class",
    "Passing arguments to methods",
    "Destroying Objects (Garbage Collection)",
    "Class Inheritance",
    "Overriding Methods",
    "Overloading Methods",
    "Overloading Operators",
    "Data Hiding"
   ]
  ],
  [
   "Python: Regular Expressions",
   2,
   [
    "match Function",
    "search Function",
    "Search and Replace",
    "Regular Expression Modifiers",
    "Regular Expression Patterns"
   ]
  ],
  [
   "Python for Data Analysis",
   3,
   [
    "NumPy basic and advanced features",
    "Load, clean, transform, merge and reshape data",
    "pandas data analysis tools",
    "Visualizations with matplotlib"
   ]
  ]
 ],
 "123a": [
  [
   "Introduction to basic structures and operational concepts",
   7,
   [
    "Introduction to basic structures and operational concepts",
    "Instruction formats",
    "Instruction execution",
    "sequencing",
    "Addressing modes",
    "Stacks",
    "Queues",
    "Subroutines [Example instruction set may be used: INTEL/ARM/MOTOROLA/others]"
   ]
  ],
  [
   "Control unit – Concepts",
   8,
   [
    "Control unit",
    "Concepts",
    "Fetching and storing word from/in main memory",
    "Register transfers",
    "Operations",
    "execution of a complete instruction Hardwired control",
    "Microprogrammed control",
    "Concept of horizontal and vertical microprogramming",
    "Nanoprogramming",
    "Concepts of pipelining"
   ]
  ],
  [
   "Fixed point Arithmetic - Arithmetic and logical operations o…",
   5,
   [
    "Fixed point Arithmetic - Arithmetic and logical operations of signed numbers and their implementation",
    "Concepts of floating point numbers and operations",
    "Bit -slice processors and Emulation"
   ]
  ],
  [
   "Memory – Basic concepts",
   8,
   [
    "Memory",
    "Basic concepts",
    "RAM",
    "ROM",
    "different types",
    "Characteristics",
    "ache memories",
    "Performance (memory interleaving",
    "hit rate etc.)",
    "Memory hierarchy - virtual memory",
    "address translation",
    "Secondary memories"
   ]
  ],
  [
   "Input/output organization",
   8,
   [
    "memory mapped",
    "standard (isolated) and linear selection techniques of I/Oaddressing. Data transfer through programmed I/O",
    "interrupt and DMA I/Oprocessors. Data transfer over synchronous and asynchronous buses",
    "discussions on some standard interface buses"
   ]
  ],
  [
   "Brief introduction to RISC processors and parallel processin…",
   4,
   [
    "Brief introduction to RISC processors and parallel processing techniques"
   ]
  ]
 ],
 "124a": [
  [
   "Introduction to Operating Systems",
   1,
   []
  ],
  [
   "Concept of batch-processing",
   2,
   [
    "Concept of batch-processing",
    "multi-programming",
    "time sharing",
    "real time operations"
   ]
  ],
  [
   "Process Management",
   5,
   [
    "Concept of process",
    "state diagram",
    "process control block",
    "scheduling of processes",
    "criteria",
    "types of scheduling",
    "non- preemptive and preemptive scheduling algorithms like: FCFS",
    "Shortest Job First/Next (SJF/N)",
    "Shortest Remaining Time Next (SRTN)",
    "Round Robin (RR)",
    "Highest Response ratio Next (HRN )",
    "Priority based scheduling",
    "different Multilevel queue scheduling etc"
   ]
  ],
  [
   "Threads – concept",
   2,
   [
    "Threads",
    "concept",
    "process vs thread",
    "kernel and user threads",
    "multithreading models"
   ]
  ],
  [
   "Inter-process Communication (IPC) – Shared memory",
   2,
   [
    "Inter-process Communication (IPC)",
    "Shared memory",
    "message",
    "FIFO",
    "concept of semaphore",
    "critical region",
    "monitor"
   ]
  ],
  [
   "Process Synchronization",
   6,
   [
    "concepts",
    "race condition",
    "critical section problem and its solutions",
    "synchronization tools- semaphore",
    "monitor etc",
    "discussion of synchronization problems like pr oducer- consumer",
    "readers -writers",
    "dining philosophers",
    "sleeping- barber etc. Deadlock",
    "conditions",
    "resource allocation graph",
    "prevention techniques",
    "avoidance technique",
    "Banker’salgorithm and related algorithms"
   ]
  ],
  [
   "Memory management",
   6,
   [
    "Address space and address translation",
    "static partitioning",
    "dynamic partitioning",
    "different types of fragmentation",
    "paging",
    "segmentation",
    "swapping",
    "virtual memory",
    "demand paging",
    "page size",
    "page table",
    "page replacement algorithms",
    "FIFO",
    "LRU",
    "Optimal page replacement",
    "Variants of LRU",
    "etc",
    "thrashing",
    "working set strategy"
   ]
  ],
  [
   "File Management",
   4,
   [
    "File and operations on it",
    "file organization and access",
    "file allocation",
    "directory structures",
    "file sharing",
    "file protection"
   ]
  ],
  [
   "Device management",
   3,
   [
    "Magnetic disks",
    "disk scheduling- criteria",
    "algorithms",
    "FCFS",
    "SSTF",
    "SCAN",
    "C- SCAN",
    "LOOK",
    "etc",
    "disk management",
    "formatting",
    "boot block",
    "disk free space management techniques",
    "concept of RAID etc"
   ]
  ],
  [
   "Protection and Security",
   5,
   [
    "Concepts of domain",
    "Access matrix and its implementation",
    "access control",
    "Security of systems - concepts",
    "threats- Trojan horse",
    "virus",
    "worms etc",
    "introduction to cryptography as security tool",
    "user authentication"
   ]
  ],
  [
   "Case Studies",
   4,
   []
  ]
 ],
 "125a": [
  [
   "Introduction",
   2,
   [
    "Advantages of DBMS",
    "Various levels of Data Definition and abstraction",
    "Data Independence"
   ]
  ],
  [
   "Concepts of Different Database Models",
   2,
   [
    "Concepts of Different Database Models",
    "Functional Components of DBMS and Overall Structure of DBMS"
   ]
  ],
  [
   "Relational Model",
   2,
   [
    "Relation",
    "Attribute",
    "Key",
    "Foreign Key and other Relational Constraints"
   ]
  ],
  [
   "Database Design",
   4,
   [
    "ER Diagram",
    "Mapping and Participation Constraints",
    "Weak Entity Set",
    "Aggregation",
    "Extended ER diagram",
    "Design of Database Tables from ER/EER Diagram"
   ]
  ],
  [
   "Languages",
   3,
   [
    "Relation Algebra",
    "Relational Calculus"
   ]
  ],
  [
   "Structured Query Language",
   3,
   []
  ],
  [
   "Functional Dependency",
   5,
   [
    "Concepts of Functional Dependency",
    "Normalization",
    "Multivalued Dependency"
   ]
  ],
  [
   "Database Storage",
   1,
   [
    "Fixed/Variable Length Record",
    "Ordered/Unordered file and Operations on them"
   ]
  ],
  [
   "Indexing",
   3,
   [
    "Primary/Clustering/Secondary/Multilevel Index",
    "B/B+ Tree based Indexing",
    "Hashing"
   ]
  ],
  [
   "Query Optimization",
   2,
   [
    "Search Strategies",
    "Expression level Optimization",
    "Join strategies"
   ]
  ],
  [
   "Database Security",
   1,
   []
  ],
  [
   "Case Study",
   3,
   [
    "Introduction to Oracle Architecture",
    "PL/SQL",
    "Trigger"
   ]
  ],
  [
   "Transaction and Recovery",
   3,
   [
    "Concept of Transaction and its States",
    "Log based Recovery",
    "Checkpoint"
   ]
  ],
  [
   "Concurrency Control",
   3,
   [
    "Lock based Protocol",
    "Time Stamp based Protocol",
    "Recoverable Schedule etc"
   ]
  ],
  [
   "Advanced Concepts",
   3,
   [
    "Object-oriented database concepts and other query languages"
   ]
  ]
 ],
 "211a": [
  [
   "Introduction and Brief Overview – Basic methods and principl…",
   2,
   [
    "Introduction and Brief Overview",
    "Basic methods and principles used by engineering",
    "including fundamentals of technical communication",
    "measurement",
    "analysis and design. Some aspects of the engineering profession",
    "including standards",
    "safety and intellectual property are also covered"
   ]
  ],
  [
   "Software Model Driven Development Process - Analysis",
   5,
   [
    "Software Model Driven Development Process - Analysis",
    "Design",
    "Testing( traditional practice diagrams such as DFDs and ERDs etc and Object -Oriented Software Engineering",
    "Concept ) - Case study with complete examples"
   ]
  ],
  [
   "Requirements Engineering – Definition",
   3,
   [
    "Requirements Engineering",
    "Definition",
    "Analysis",
    "Development",
    "Management",
    "Standards/Guidelines (IEEE-Analysis",
    "Specification",
    "management) and CASE Tools - Case study with complete examples"
   ]
  ],
  [
   "Effort and Cost Estimation Techniques - using COCOMO",
   4,
   [
    "Effort and Cost Estimation Techniques - using COCOMO",
    "COCOMO-II (using Lines of code",
    "Object points",
    "Function points) - Case study with complete examples"
   ]
  ],
  [
   "Software Architecture - Architectural styles",
   3,
   [
    "Software Architecture - Architectural styles",
    "architectural patterns",
    "analysis of architectures",
    "formal descriptions of software architectures",
    "architectural description languages and tools",
    "scalability and interoperability issues",
    "Web Engineering Architectures - case studies with example"
   ]
  ],
  [
   "Software Quality metrics – Product Revi sion (Maintainability",
   10,
   [
    "Software Quality metrics",
    "Product Revi sion (Maintainability",
    "Flexibility",
    "Test ability)",
    "Product Transition(Reusability",
    "Interoperability",
    "Portability)",
    "Product Operations(Reliability",
    "Usability",
    "Correctness",
    "Integrity",
    "Efficiency) - Measure Reliability",
    "Availability",
    "Reusability",
    "Measure Softw are Complexity",
    "Case study with complete examples"
   ]
  ],
  [
   "Software Evaluation Metrics (Supervised and Unsupervised tec…",
   10,
   [
    "Software Evaluation Metrics (Supervised and Unsupervised techniques)",
    "Methods of evaluating clustering- Assessing Clustering tendency",
    "Determination number of clusters",
    "Measuring Cluste ring quality",
    "Methods for estimating a classifier’saccuracy: Holdout method",
    "Random subsampling",
    "Cross validation",
    "Bootstrap. Classifier Evaluation Metrics: Accuracy",
    "Error Rate",
    "Sensitivity and Specificity / Precision and Recall",
    "and F-measures - Case study with complete examples"
   ]
  ],
  [
   "Software Testing Technique and Strategies – Black Box",
   3,
   [
    "Software Testing Technique and Strategies",
    "Black Box",
    "White Box",
    "Integrity testing (top down",
    "bottom up",
    "mixed)",
    "test case design",
    "System testing (Recovery",
    "Security",
    "Stress",
    "Performance",
    "Regression",
    "Smoke",
    "Verification",
    "Validation",
    "Acceptance etc..) - case study with example"
   ]
  ]
 ],
 "212a": [
  [
   "Finite Automata and Regular Languages",
   6,
   []
  ],
  [
   "DFA",
   6,
   [
    "DFA",
    "NFA",
    "Recognition of a language by an automaton",
    "Equivalence of DFA and NFA",
    "Minimization of FA",
    "Equivalence of FAs",
    "Pumping Lemma for Regular Languages",
    "Closure Properties of Regular Sets. Context-free Languages and Push-Down Automata"
   ]
  ],
  [
   "Non-regular languages",
   3,
   [
    "Non-regular languages",
    "CFLs",
    "Closure properties of CFLs. Representative grammars",
    "Context-free grammars",
    "Parse trees",
    "derivations and sentential forms",
    "Ambiguity",
    "Push -Down Automata",
    "Pumping Lemma for CFL. Turing Machines"
   ]
  ],
  [
   "Turing Machines",
   3,
   [
    "Turing Machines",
    "Halting Problem",
    "Recursive and Recursively enumerable Language. System software: functions of an Assembler",
    "features",
    "design of one pass and two pass assemblers",
    "basic Concepts of Linkers and Loaders",
    "Boot Loaders",
    "Dynamic Linking"
   ]
  ],
  [
   "Concept of Editor and text editor",
   2,
   [
    "Concept of Editor and text editor",
    "Interpreters",
    "Simulator"
   ]
  ],
  [
   "Introduction to Compiler",
   1,
   [
    "Introduction to Compiler",
    "Different phases and passes of compiler"
   ]
  ],
  [
   "Lexical Analysis",
   4,
   [
    "Role of Lexical Analyzer",
    "Input Buffering",
    "Specification of Tokens",
    "State -machine driven lexical analysers and their implementations"
   ]
  ],
  [
   "Syntax Analysis",
   6,
   [
    "Role of the parser",
    "Top-down parsing",
    "LL(1)grammars",
    "Predictive Parsing",
    "Bottom- up parsing",
    "Shift-reduce Parsing",
    "LR(0) grammars",
    "LR parsing algorithms"
   ]
  ],
  [
   "Syntax Directed Translation",
   2,
   [
    "Syntax directed definitions",
    "Construction of syntax trees",
    "Bottom-up evaluation of S-attributed definitions",
    "L-attributed definitions"
   ]
  ],
  [
   "Runtime Environments",
   2,
   [
    "Source Language issues",
    "Storage Organization",
    "Storage Allocation strategies",
    "Access to non-local names",
    "Parameter passing mechanism"
   ]
  ],
  [
   "Intermediate Code Generation",
   2,
   [
    "Intermediate languages",
    "Graphical representation",
    "Three address code",
    "Implementation of three address statements (Quadruples",
    "Triples",
    "Indirect triples)"
   ]
  ],
  [
   "Code Optimization and generation",
   3,
   [
    "Introduction",
    "Basic blocks and flow graphs",
    "Transformation of basic blocks",
    "DAG repr esentation of basic blocks",
    "Principal sources of optimization",
    "Loops in the flow graph",
    "Peephole optimization. Issues in the design of code generator",
    "Register allocation and assignment"
   ]
  ]
 ],
 "213a": [
  [
   "Introduction",
   1,
   [
    "Uses of Computer Networks",
    "Types of Computer Networks",
    "OSI Reference Model",
    "TCP/IP model"
   ]
  ],
  [
   "Physical Layer",
   10,
   [
    "Data and signal fundamentals",
    "Transmission impairments",
    "Attenuation",
    "Distortion",
    "Noise",
    "Data rate limits for noisy and noiseless channels",
    "Digital Transmission",
    "line coding schemes",
    "Block coding schemes",
    "Scrambling techniques",
    "Analog to digital encoding",
    "Analog Transmission",
    "Transmission Media - Guided (wired) media",
    "Twisted pair cable",
    "Coaxial cable and Fibre optic cable",
    "Unguided (wireless) media",
    "Concept of multiplexing",
    "Frequency division mul tiplexing",
    "Time division multiplexing",
    "Concept of spreading spectrum",
    "Frequency hopping spread spectrum and Direct sequence spread spectrum"
   ]
  ],
  [
   "Data Link Layer",
   10,
   [
    "Link Layer Addressing",
    "ARP",
    "Error detection and Correction Techniques",
    "Flow and Error Control",
    "Data Link Layer Protocols",
    "MAC Protocols",
    "Point to Point Protocol",
    "Wired LANs",
    "Ethernet",
    "IEEE 802.3",
    "Hub",
    "Switches",
    "Introduction to Wireless LANs",
    "IEEE 802.11",
    "MAC sublayer",
    "Bluetooth"
   ]
  ],
  [
   "Network Layer",
   10,
   [
    "Introduction",
    "Performance metrics",
    "IP Addressing",
    "Subnetting",
    "Routing Algorithms (Link State",
    "Distance Vector",
    "Hierarchical)",
    "Routing protocols in the Internet (RIP",
    "OSPF",
    "BGP)",
    "Broadcast and Multicast Routing Algorithms",
    "Routers",
    "ICMP",
    "Introduction to IPv6"
   ]
  ],
  [
   "Transport Layer",
   5,
   [
    "Introduction to Transport Layer Services",
    "Transport Layer Protocols",
    "User Datagram Protocol (UDP)",
    "Transmission Control Protocol (TCP)",
    "Socket"
   ]
  ],
  [
   "Application Layer",
   4,
   [
    "SSH",
    "Domain Name Space (DNS)",
    "Electronic Mail (SMTP",
    "MIME",
    "IMAP",
    "POP3)",
    "File Transfer Protocol"
   ]
  ]
 ],
 "214a": [
  [
   "Introduction",
   2,
   []
  ],
  [
   "Intelligent Agents",
   2,
   []
  ],
  [
   "Solving problems by Searching – Uninformed (BFS",
   5,
   [
    "Solving problems by Searching",
    "Uninformed (BFS",
    "DFS",
    "DLS",
    "ID",
    "IB",
    "Bi-directional Search",
    "Island-Driven Search)",
    "Informed/Heuristic (Greedy",
    "A*",
    "IDA*)"
   ]
  ],
  [
   "Advanced intelligent search techniques – Uniform Cost Search",
   8,
   [
    "Advanced intelligent search techniques",
    "Uniform Cost Search",
    "Hill Climbing",
    "Simulated Annealing",
    "Genetic Algorithm",
    "Tabu Search"
   ]
  ],
  [
   "Adversarial search - Game Playing",
   2,
   []
  ],
  [
   "Knowledge and Reasoning - Predicate calculus in Artificial i…",
   6,
   [
    "Knowledge and Reasoning - Predicate calculus in Artificial intelligence",
    "Resolution Refutation Systems",
    "Structured Knowledge Representation Techniques"
   ]
  ],
  [
   "Reasoning under Uncertainty – Non Monotonic Reasoning Systems",
   4,
   [
    "Reasoning under Uncertainty",
    "Non Monotonic Reasoning Systems",
    "Assumption based Truth Maintenance System",
    "Probabilistic Reasoning",
    "Fuzzy Reasoning"
   ]
  ],
  [
   "Machine Learning - Decision Trees",
   5,
   [
    "Machine Learning - Decision Trees",
    "Artificial Neural Networks"
   ]
  ],
  [
   "Planning – Classical",
   2,
   [
    "Planning",
    "Classical",
    "Algorithm for Planning as State-space Search",
    "Planning Graph"
   ]
  ],
  [
   "Some Applications of Artificial Intelligence",
   4,
   []
  ]
 ],
 "214b": [
  [
   "Category Elective-1 Course title Machine Learning Scheme and…",
   1,
   [
    "Category Elective-1 Course title Machine Learning Scheme and Credits L–T–P: 3",
    "Credits: 3 Semester Pre-requisites (if any) Syllabus What is machine learning? Why machine learning? A pplications of machine Learning",
    "types o fmachine Learning"
   ]
  ],
  [
   "Machine leaning system design",
   4,
   [
    "Machine leaning system design",
    "Concept Learning",
    "learning hypothesis space",
    "learning as search",
    "inductive bias-restriction bias and preference bias"
   ]
  ],
  [
   "Data representation- Features/attributes",
   2,
   [
    "Data representation- Features/attributes",
    "Types of features",
    "Training and test data design",
    "output vector representation"
   ]
  ],
  [
   "Decision tree learning",
   4,
   [
    "Decision tree learning",
    "noise and overfitting",
    "Gini index"
   ]
  ],
  [
   "Instance based learning",
   2,
   [
    "Instance based learning",
    "Curse of dimensionality"
   ]
  ],
  [
   "Probabilistic learning model and Bayesian learning",
   4,
   []
  ],
  [
   "Linear regression",
   6,
   [
    "Linear regression",
    "Logistic Regression",
    "Regularized Logistic Regression",
    "Support Vector Machine (SVM)",
    "Learning multiple classes"
   ]
  ],
  [
   "Performance measures for Machine learning algorithms",
   2,
   [
    "Evaluation metrics",
    "Bootstrapping & Cross Validation"
   ]
  ],
  [
   "Artificial Neural networks",
   4,
   [
    "Perceptron Learning",
    "Delta Rule",
    "multilayer neural networks",
    "Backpropagation algorithm",
    "Momentum",
    "L1/L2 Regularization"
   ]
  ],
  [
   "Introduction to deep learning",
   3,
   []
  ],
  [
   "Unsupervised Learning",
   5,
   [
    "Partitional and hierarchical clustering",
    "Gaussian mixture model"
   ]
  ],
  [
   "Ensemble Learning",
   3,
   []
  ]
 ],
 "214c": [
  [
   "Basic concepts of Pattern Recognition",
   2,
   [
    "Basic concepts of Pattern Recognition",
    "Pattern Preprocessing"
   ]
  ],
  [
   "Feature Extraction",
   4,
   [
    "Feature Extraction",
    "Dimensionality Reduction Techniques",
    "Feature Selection"
   ]
  ],
  [
   "Decision Functions",
   2,
   []
  ],
  [
   "Bayesian decision theory, Parametric Estimation",
   6,
   [
    "Maximum likelihood estimation and Bayesian estimation"
   ]
  ],
  [
   "Non parametric Estimation",
   4,
   [
    "Parzen windows",
    "Nearest Neighbor estimation"
   ]
  ],
  [
   "Pattern Classification",
   6,
   [
    "Linear classifiers",
    "Perceptron",
    "Non-linear classifiers: MLP",
    "Non-linear SVM"
   ]
  ],
  [
   "Unsupervised learning and Clustering",
   12,
   [
    "Partitioning methods",
    "Density-based methods",
    "MST- based methods",
    "Soft Computing based methods",
    "Hierarchical Clustering",
    "Cluster Validity Indices"
   ]
  ],
  [
   "Syntactic Pattern Recognition",
   4,
   [
    "Concepts and applications"
   ]
  ]
 ],
 "214d": [
  [
   "Definition of Data",
   6,
   [
    "Definition of Data",
    "type of data",
    "data collection",
    "Date Cleaning",
    "data preprocessing",
    "ETL techniques",
    "data storage",
    "data warehousing",
    "data wrangling",
    "Knowledge discovery",
    "data mining",
    "data science project life cycle",
    "Data summaries and descriptive statistics : Measures of i) Frequency",
    "Count",
    "Percent",
    "ii) Central Tendency lik e Mean",
    "Median",
    "and Mode",
    "iii) Dispersion or Variation like Range",
    "Variance",
    "Standard Deviation",
    "iv) Position like Percentile Ranks and Quartile Ranks"
   ]
  ],
  [
   "Basic of Linear Algebra",
   2,
   [
    "Basic of Linear Algebra",
    "Basic probability- Joint Probability",
    "Conditional Probability",
    "Bayes Theorem"
   ]
  ],
  [
   "Probability distributions",
   3,
   [
    "Probability distributions",
    "Regression models"
   ]
  ],
  [
   "Hypothesis testing",
   3,
   [
    "Hypothesis testing",
    "ANOVA",
    "t -test",
    "Wilcoxon signed- rank test",
    "Spearman’srank -order correlation",
    "error",
    "sampling",
    "normalization"
   ]
  ],
  [
   "Feature extraction and Feature Selection",
   3,
   [
    "Feature extraction and Feature Selection",
    "dimensionality reduction - Principal Component Analysis"
   ]
  ],
  [
   "Fundamentals of Graphs and Charts",
   3,
   [
    "Fundamentals of Graphs and Charts",
    "Data visualization"
   ]
  ],
  [
   "Introduction to machine learning",
   5,
   [
    "Introduction to machine learning",
    "supervised",
    "unsupervised learning",
    "ROC",
    "AUC",
    "Classification: KNN",
    "Decision Tree",
    "Random Forest",
    "Bayes Classifier",
    "Support Vector Machine"
   ]
  ],
  [
   "Clustering",
   4,
   [
    "KMeans",
    "FCM",
    "DBSca n",
    "Expectation- Maximization",
    "Agglomerative Hierarchical Clustering"
   ]
  ],
  [
   "Database Management System",
   5,
   [
    "Database Management System",
    "SQL",
    "Intr oduction to Big Data and Its management",
    "Basics of Hadoop",
    "MapReduce",
    "NoSQL",
    "Spark"
   ]
  ],
  [
   "Basics of Deep Learning",
   2,
   [
    "Basics of Deep Learning",
    "Convolutional Neural Network",
    "Recurrent Neural Network"
   ]
  ],
  [
   "Case study on real -life applications of Data Science in any…",
   4,
   [
    "Case study on real -life applications of Data Science in any area like bioinformatics",
    "image processing and computer vision",
    "natural language processing",
    "social networking etc"
   ]
  ]
 ],
 "214e": [
  [
   "Introduction",
   2,
   []
  ],
  [
   "Historical development",
   8,
   [
    "Historical development",
    "Engineering application of optimization",
    "Formulation of design problems as mathematical programming problems",
    "classification of optimization problems. Linear Programming"
   ]
  ],
  [
   "Graphical method",
   6,
   [
    "Graphical method",
    "Simplex method",
    "Revised simplex method",
    "Duality in linear programming",
    "Sensitivity analysis",
    "other algorithms for solving LP problems. Application of Linear Programming II"
   ]
  ],
  [
   "Transportation Problem",
   14,
   [
    "Transportation Problem",
    "Assignment Problem and other applications",
    "Integer Programming. Non-Linear Programming"
   ]
  ],
  [
   "Unconstrained optimization techniques",
   3,
   [
    "Unconstrained optimization techniques",
    "Convex/Concave function and Global Optimality",
    "Gradient Descent methods",
    "Constrained optimization",
    "Convex Separable Quadratic Programming",
    "Direct and indirect methods",
    "Optimization with calculus",
    "Lagrangian Multiplier methods and Kharush- Khun- Tucker optimality conditions. Dynamic Programming"
   ]
  ],
  [
   "Introduction",
   4,
   [
    "Introduction",
    "Sequential optimization",
    "computational procedure",
    "curse of dimensionality. Advanced Optimization Technique"
   ]
  ],
  [
   "Genetic Algorithms",
   3,
   [
    "Genetic Algorithms",
    "Simulated Annealing etc. Game Theory"
   ]
  ]
 ],
 "214f": [
  [
   "Introduction to Soft Computing",
   2,
   [
    "Introduction to Soft Computing",
    "Components of Soft Computing",
    "Importance of Soft Computing",
    "Applications"
   ]
  ],
  [
   "Fuzzy Set Theory - Definition",
   8,
   [
    "Fuzzy Set Theory - Definition",
    "Different types of fuzzy set membership functions. Fuzzy set theoretic operations",
    "Fuzzy rules and fuzzy reasoning",
    "Fuzzy inference systems"
   ]
  ],
  [
   "Rough set theory",
   2,
   []
  ],
  [
   "Probabilistic Reasoning",
   4,
   []
  ],
  [
   "Genetic Algorithms",
   6,
   [
    "Genetic Algorithms",
    "Simulated Annealing",
    "applications"
   ]
  ],
  [
   "Neural Networks- Artificial neural networks models",
   10,
   [
    "Neural Networks- Artificial neural networks models",
    "Supervised Learning",
    "Unsupervised Learning",
    "Applications"
   ]
  ],
  [
   "Hybrid Systems and applications",
   8,
   []
  ]
 ],
 "215a": [
  [
   "Introduction to distributed environment",
   6,
   [
    "Goals",
    "hardware & software concepts",
    "Overview of high performance computing",
    "Parallel computing",
    "Collaborative computing",
    "architecture",
    "middleware",
    "Strengths and weaknesses of distributed computing"
   ]
  ],
  [
   "Communication",
   5,
   [
    "Message-oriented communication",
    "stream orie nted communication",
    "MPI",
    "Socket",
    "Web Socket",
    "Remote procedure call (RPC)",
    "Remote method Invocation (RMI)"
   ]
  ],
  [
   "Client Server model",
   4,
   [
    "Architecture",
    "multi-tier design",
    "applications (e.g",
    "email",
    "chat)"
   ]
  ],
  [
   "P2P",
   4,
   [
    "Architecture",
    "design",
    "applications (e.g",
    "Napster)"
   ]
  ],
  [
   "Cluster Computing",
   4,
   [
    "Hardware and software",
    "Architecture",
    "middleware",
    "cluster computing environments",
    "cluster resource management"
   ]
  ],
  [
   "Grid Computing",
   4,
   [
    "Architecture",
    "middleware",
    "resource management",
    "application",
    "case study (e.g",
    "Globus Toolkit)"
   ]
  ],
  [
   "Cloud Computing",
   6,
   [
    "Architecture",
    "types of cloud services (IaaS",
    "PaaS",
    "SaaS",
    "XaaS)",
    "Parallel processing in the cloud",
    "Distributed storage systems",
    "Virtualization"
   ]
  ],
  [
   "Overview of Big Data",
   1,
   [
    "Characteristics of Big Data and Dimensions of Scalability"
   ]
  ],
  [
   "Distributed File System",
   2,
   [
    "Design principles",
    "Overview of Replication and Fault Tolerance"
   ]
  ],
  [
   "Hadoop",
   2,
   [
    "core components",
    "architecture",
    "Hadoop Distributed File System (HDFS)"
   ]
  ],
  [
   "MapReduce",
   2,
   [
    "Programming model",
    "applications"
   ]
  ]
 ],
 "215b": [
  [
   "Introduction",
   4,
   [
    "Background of foundation technologies",
    "architectural principles"
   ]
  ],
  [
   "IoT Stack",
   2,
   [
    "Raw data- physical de vice level",
    "data transformation - sensor middleware level",
    "Data aggregation- virtual sensor level",
    "data management and control",
    "Semantic Level",
    "data representation- application level",
    "data visualization- business level"
   ]
  ],
  [
   "IoT Communication Protocols",
   6,
   [
    "Physical and MAC layers",
    "IEEE 802.15.4",
    "802.15.4g",
    "802.15.4e",
    "1901.2a",
    "802.11ah and LoRaWAN",
    "Network Layer",
    "IP versions",
    "Constrained Nodes and Constrained Networks",
    "Optimizing IP for IoT",
    "6LoWPAN",
    "Routing over Low Power and Lossy Networks"
   ]
  ],
  [
   "IoT Communication Technologies",
   4,
   [
    "RFID",
    "NFC",
    "ZigBee",
    "Bluetooth",
    "Challenges and requirements"
   ]
  ],
  [
   "Application Layer Protocols",
   4,
   [
    "COAP",
    "XMPP",
    "AMQP",
    "MQTT",
    "WebRTC",
    "WebSocket"
   ]
  ],
  [
   "Building IoT Applications",
   4,
   [
    "Arduino",
    "Raspberry Pi",
    "real-world application scenarios"
   ]
  ],
  [
   "Cloud Computing",
   4,
   [
    "Cloud storage",
    "computational infrastructure",
    "Distributed frameworks and programming paradigms",
    "e.g",
    "Hadoop ecosystem"
   ]
  ],
  [
   "Integrating IoT and Cloud",
   4,
   [
    "Sensor-Cloud Architectures and Approaches",
    "Issues related to the integration",
    "what to offload and what not to"
   ]
  ],
  [
   "Analyzing IoT data",
   4,
   [
    "Overview of data analytics and visualization for IoT applications",
    "Structured Vs Unstructured Data and Data in Motion Vs Data in Rest",
    "Role of Machine Learning"
   ]
  ],
  [
   "Privacy Issues",
   2,
   [
    "Issues regarding data sharing"
   ]
  ],
  [
   "Case Studies/ Industrial Applications – Smart and Connected Cities",
   2,
   [
    "Case Studies/ Industrial Applications",
    "Smart and Connected Cities",
    "Smart Traffic Control",
    "Smart Healthcare"
   ]
  ]
 ],
 "215c": [
  [
   "Introduction",
   2,
   [
    "Security Goals",
    "Threats",
    "Vulnerabilities and Attacks",
    "Types of Attacks",
    "Security Services and Mechanisms"
   ]
  ],
  [
   "Cryptographic Tools",
   4,
   [
    "Symmetric Key Cryptography",
    "Block Ciphers",
    "Stream Ciphers",
    "DES",
    "IDEA",
    "AES",
    "Asymmetric Key Cryptography",
    "RSA",
    "ElGamal Cryptosystems",
    "Elliptic Curve Cryptosystems",
    "Message Integrity and Message Authentication",
    "Cryptographic Hash Function s",
    "Digital Signatures",
    "Key Management",
    "Kerberos"
   ]
  ],
  [
   "Security at Network Layer",
   3,
   [
    "IP Security Overview",
    "IP Security Architecture",
    "Security Association",
    "Authentication Header",
    "Encapsulated Security Payload",
    "Internet Key Exchange",
    "ISAKMP"
   ]
  ],
  [
   "Security at Transport Layer",
   3,
   [
    "SSL Architecture",
    "Four SSL Protocols",
    "SSL Message Format",
    "Transport Layer Security",
    "HTTPS",
    "SSH"
   ]
  ],
  [
   "Security at Application Layer",
   3,
   [
    "Email Security",
    "PGP",
    "S/MIME"
   ]
  ],
  [
   "Firewalls and Intrusion Prevention Systems",
   3,
   [
    "Firewall Characteristics",
    "Types of Firewalls",
    "Firewall Basing",
    "Firewall Location and Configuration",
    "Intrusion Prevention Systems"
   ]
  ],
  [
   "Intrusion Detection Systems",
   3,
   [
    "Intruders",
    "Intrusion Detection",
    "Host Based Intrusion Detection",
    "Network Based Intrusion Detection",
    "Distributed Intrusion Detection",
    "Intrusi on Detection Exchange Format",
    "Honeypots"
   ]
  ],
  [
   "Denial of Service Attacks",
   4,
   [
    "Denial of Service Attacks",
    "Flooding Attacks",
    "Distributed Denial of Service Attacks",
    "Reflector and Amplifier Attacks",
    "Defences against Denial of Service Attacks",
    "Responding to a Denial of Service Attack"
   ]
  ],
  [
   "Malicious Software",
   4,
   [
    "Types of Malicious Software",
    "Viruses",
    "Virus Countermeasures",
    "Worms",
    "Bots",
    "Botnets",
    "Rootkits"
   ]
  ],
  [
   "Software Security",
   3,
   [
    "Buffer Overflow Attacks",
    "Defence against Buffer Overflows",
    "Handling Program Inputs",
    "Writing Safe Program Codes",
    "Interaction with Operating System and Other Software"
   ]
  ],
  [
   "Wireless Network Security",
   8,
   [
    "Authentication and Authorization in Wireless LANs",
    "Data Protection in Wireless LANs",
    "Security in MANET"
   ]
  ]
 ],
 "215d": [
  [
   "Introduction to web technology",
   2,
   []
  ],
  [
   "Scripting language (JavaScript) and HTML5",
   4,
   []
  ],
  [
   "XML Processing Technologies for Data Representation",
   2,
   [
    "XML Processing Technologies for Data Representation",
    "DOM",
    "SAX for XML"
   ]
  ],
  [
   "Server side programming (Servlet",
   10,
   [
    "Server side programming (Servlet",
    "Spring framework",
    "etc.)"
   ]
  ],
  [
   "Web Clients",
   2,
   [
    "Browsers",
    "cookies",
    "spiders",
    "search engines"
   ]
  ],
  [
   "Multimedia Streaming Protocols",
   8,
   []
  ],
  [
   "Web Servers Web Caching and Content Distribution",
   2,
   []
  ],
  [
   "HTTP",
   6,
   [
    "HTTP",
    "Websocket"
   ]
  ],
  [
   "Web Security",
   2,
   []
  ],
  [
   "Web Protocols",
   2,
   [
    "TCP",
    "IP",
    "SMTP",
    "POP3",
    "FTP"
   ]
  ]
 ],
 "215e": [
  [
   "Introduction to Project management",
   3,
   []
  ],
  [
   "a. Project Management Basics b. Role of a Project Manager c.…",
   5,
   [
    "a. Project Management Basics b. Role of a Project Manager c. Project Resources d. Phases of Software Project 2. Introduction to PERT/CPM"
   ]
  ],
  [
   "a. Work Breakdown Structure b. Network diagramming c. Critic…",
   4,
   [
    "a. Work Breakdown Structure b. Network diagramming c. Critical Path d. PERT Probability e. Crashing f. Resource Leveling 3. Software Effort Estimation"
   ]
  ],
  [
   "a. Estimations Basics b. LOC Method c. Function Points d. Ac…",
   5,
   [
    "a. Estimations Basics b. LOC Method c. Function Points d. Activity Based Estimation e. COCOMO f. Uncertainty in estimation 4. Project Planning"
   ]
  ],
  [
   "a. Management b. Risk c. Quality Assurance d. Schedule 5. Co…",
   4,
   [
    "a. Management b. Risk c. Quality Assurance d. Schedule 5. Configuration Management"
   ]
  ],
  [
   "a. Configuration Management Basics b. Environment for Config…",
   4,
   [
    "a. Configuration Management Basics b. Environment for Configuration Control c. Configuration Control vs. Version Control d. Code Management e. Change Management f. Information Management 6. Quality Assurance in Projects"
   ]
  ],
  [
   "a. Quality Basics b. Quality Assurance Activities in Project…",
   2,
   [
    "a. Quality Basics b. Quality Assurance Activities in Projects c. Quality Control Activities in d. Introduction to ISO 9000",
    "SEI",
    "CMM Maturity Levels",
    "Six Sigma 7. Productivity Aspects"
   ]
  ],
  [
   "a. Productivity Basics b. Productivity Measurement & Metrics…",
   4,
   [
    "a. Productivity Basics b. Productivity Measurement & Metrics 8. Human Factors and Leadership"
   ]
  ],
  [
   "a. Communication b. Leadership c. Team Dynamics 9. Progress …",
   3,
   [
    "a. Communication b. Leadership c. Team Dynamics 9. Progress Tracking & Control"
   ]
  ],
  [
   "a. Progress Assessment & Reporting b. Scope Management c. Ri…",
   3,
   [
    "a. Progress Assessment & Reporting b. Scope Management c. Risk Mitigation 10. Project Closeout"
   ]
  ],
  [
   "a. Project post-mortem b. Collection of re-usable Components…",
   3,
   [
    "a. Project post-mortem b. Collection of re-usable Components c. Practices adopted in the project d. Project-End Audit 11. Organizational Support for Effective Project Management"
   ]
  ]
 ],
 "215f": [
  [
   "Introduction to microprocessor",
   2,
   []
  ],
  [
   "Basic features of 8085 microprocessors and its addressing modes",
   4,
   [
    "Basic features of 8085 microprocessors and its addressing modes",
    "8085 microprocessor architecture. Memory and I/Ointerfacing"
   ]
  ],
  [
   "Address decoding",
   6,
   [
    "Address decoding",
    "Address aliasing",
    "Memory read and write operations",
    "Ti ming diagrams",
    "Memory mapped I/Oand I/Omapped I/O. Programming of 8085"
   ]
  ],
  [
   "Instruction Set",
   2,
   [
    "Instruction Set",
    "Assembly Language Programming and Illustrative examples. 8085 Interrupt Structure"
   ]
  ],
  [
   "Data Transfer Techniques",
   2,
   []
  ],
  [
   "Synchronous and Asynchronous modes of data transfer",
   6,
   [
    "Synchronous and Asynchronous modes of data transfer",
    "Interrupt driven I/O",
    "DMA. Peripheral Devices"
   ]
  ],
  [
   "8255 programmable peripheral interface",
   8,
   [
    "8255 programmable peripheral interface",
    "8254 programmable counter",
    "8251 UART programmable communication interface",
    "8257 DMA Controller. 8259 Interrupt controller",
    "8279 Keyboard & display interface. Introduction to micro-controllers"
   ]
  ],
  [
   "8051 as an example. Micro- controller architecture",
   2,
   [
    "8051 as an example. Micro- controller architecture",
    "bi -directional data ports",
    "internal ROM and RAM",
    "counters/timer s",
    "oscillator and clock",
    "serial communication.8051- register set",
    "memory organization - internal & external",
    "program memory & data memory",
    "bit addressable memory",
    "and special function registers",
    "Introduction to instruction set of 8051 and assembly language programming. Introduction to Embedded Systems"
   ]
  ],
  [
   "An overview to embedded systems",
   2,
   [
    "An overview to embedded systems",
    "Optimization of design metrics. Embedded Processor Technology"
   ]
  ],
  [
   "General purpose processors",
   2,
   [
    "General purpose processors",
    "Single purpose processors",
    "Application specific processors. IC Technology"
   ]
  ],
  [
   "VLSI",
   4,
   [
    "VLSI",
    "ASIC",
    "PLD Design Methodology"
   ]
  ]
 ],
 "216a": [
  [
   "Introduction",
   2,
   []
  ],
  [
   "Basics of computer graphics",
   8,
   [
    "Basics of computer graphics",
    "its applications",
    "overview of graphical input-output devices. Rasterization Algorithms"
   ]
  ],
  [
   "Scan conversion of Straight lines",
   4,
   [
    "DDA algorithm",
    "Bresenham’salgorithm",
    "Midpoint algorithm Scan conversion of Circles: Polynomial method",
    "DDA algorithm",
    "Bresenham’salgorithm",
    "Midpoint algorithm. Scan conversion of Ellipses: DDA algorithm",
    "Midpoint algorithm Generations of solid areas"
   ]
  ],
  [
   "Scan line algorithms",
   8,
   [
    "Scan line algorithms",
    "Seed-fill algorithms. Geometric Transformations"
   ]
  ],
  [
   "2-D Transformations",
   2,
   [
    "Scaling",
    "Rotation",
    "Translation",
    "Reflection",
    "Shear",
    "Homogenous co-ordinate system",
    "Rotation about an arbitrary point",
    "reflection in an arbitrary straight line. 3-D Transformations: Scaling",
    "Rotation",
    "Translation",
    "Reflection",
    "Rotation about an arbitrary straight line",
    "reflection in an arbitrary plane",
    "Parallel projections",
    "Perspective projections. Display files and Segments"
   ]
  ],
  [
   "2-Dviewing and Clipping",
   6,
   []
  ],
  [
   "Cohen- Sutherland Algorithm",
   4,
   [
    "Cohen- Sutherland Algorithm",
    "Mid-point subdivision algorithm",
    "Sutherland-Hodgman Polygon Clipping. Curves and Surfaces"
   ]
  ],
  [
   "Functional and parametric representations of curves and surfaces",
   2,
   [
    "Functional and parametric representations of curves and surfaces",
    "Effect of control points on the shape of a curve",
    "Bezier curves and surfaces",
    "B-Spline curves and surfaces. Hidden surface removal"
   ]
  ],
  [
   "Z-buffer algorithm",
   4,
   [
    "Z-buffer algorithm",
    "Warnock’salgorithm. Illumination model",
    "colour",
    "shading"
   ]
  ]
 ],
 "216b": [
  [
   "Introduction to Computer Vision",
   1,
   []
  ],
  [
   "Fundamentals of Digital Image Processing",
   4,
   []
  ],
  [
   "Image acquisition",
   8,
   [
    "Image acquisition",
    "Image representation",
    "Basic Image transforms",
    "image file formats (BMP",
    "TIFF",
    "GIF",
    "PNG",
    "etc.) Image Enhancement"
   ]
  ],
  [
   "Contrast stretching",
   2,
   [
    "Contrast stretching",
    "Histogram Equalization",
    "Binarization Filtering in Spatial domain: Mean filter",
    "Order Statistics filters. Filtering in Frequency domain: Butterworth filter",
    "Gaussian filter. Image Restoration"
   ]
  ],
  [
   "Image degradation models",
   4,
   [
    "Image degradation models",
    "Weiner filter. Image Segmentation"
   ]
  ],
  [
   "Edge detection",
   2,
   [
    "Gradient operators",
    "Compass operator",
    "Laplacian operators. LoG operator",
    "Canny edge detector. Region Segmentation"
   ]
  ],
  [
   "Region growing",
   3,
   [
    "Region growing",
    "region splitting and merging. Shape detection"
   ]
  ],
  [
   "Least Mean Square error line fitting",
   2,
   [
    "Least Mean Square error line fitting",
    "Eigenvector line fitting",
    "Straight line Hough Transform",
    "Generalized Hough Transform",
    "describing boundary by chain encoding. Image textures"
   ]
  ],
  [
   "Run Length Coding",
   4,
   [
    "Run Length Coding",
    "Gray-level co-occurrence matrix",
    "Local Binary Patterns. Morphological Operators"
   ]
  ],
  [
   "Dilation",
   4,
   [
    "Dilation",
    "Erosion",
    "Opening",
    "Closing",
    "Hit-and-Miss transforms",
    "Applications. Image Compression"
   ]
  ],
  [
   "Spatial Domain methods",
   6,
   [
    "Run Length encoding",
    "Block based encoding",
    "Contour encoding. Frequency Domain methods: DCT",
    "FFT",
    "K-Ltransform",
    "JPEG. Image Understanding"
   ]
  ]
 ],
 "216c": [
  [
   "Introduction to Bioinformatics",
   2,
   [
    "Introduction to Bioinformatics",
    "Central dogma of Molecular Biology"
   ]
  ],
  [
   "Biological Databases- Concepts and Understanding",
   2,
   []
  ],
  [
   "Sequence alignment",
   6,
   [
    "Pairwise sequence alignment",
    "Global and local alignment",
    "scoring",
    "dynamic programming",
    "multiple sequence alignment",
    "tree alignment",
    "Hidden Markov Models"
   ]
  ],
  [
   "Gene finding algorithms",
   2,
   []
  ],
  [
   "Protein Sequences and Substitution matrices",
   2,
   [
    "Suffix tree construction and applications"
   ]
  ],
  [
   "Introduction to Gene Expression",
   2,
   [
    "Microarrays",
    "their uses",
    "idea about normalization",
    "clustering"
   ]
  ],
  [
   "Functional enrichment analysis - Metabolic Pathway (KEGG)",
   1,
   [
    "Functional enrichment analysis - Metabolic Pathway (KEGG)",
    "GO annotations"
   ]
  ],
  [
   "Phylogenetic Tree and Analysis",
   2,
   []
  ],
  [
   "Introduction to Gene Regulation",
   6,
   [
    "Gene regulation",
    "binding sites",
    "transcriptional networks",
    "gene’scircuitry"
   ]
  ],
  [
   "Network of Interactions",
   2,
   [
    "Regulatory networks",
    "Biomolecular Networks"
   ]
  ],
  [
   "Signals in Sequences",
   2,
   [
    "Weight matrices",
    "dependencies",
    "transcriptionfactor binding sites"
   ]
  ],
  [
   "Introduction to Proteomics",
   2,
   [
    "Protein structure",
    "protein interactions"
   ]
  ],
  [
   "Protein Structure Prediction",
   4,
   [
    "Attempts to predict secondary and tertiary structure of amino acid sequences"
   ]
  ],
  [
   "Post Translational Modifications in Proteins",
   2,
   []
  ],
  [
   "Drug docking and designing",
   3,
   []
  ]
 ],
 "216d": [
  [
   "Introduction",
   2,
   [
    "Introduction",
    "Taxonomy of information retrieval models",
    "Document retrieval and ranking",
    "A formal characterization of IR models",
    "Boolean Retrieval Model"
   ]
  ],
  [
   "Basic Tokenization",
   2,
   [
    "Basic Tokenization",
    "Indexing and Normalization Word tokenization",
    "Text Normalization",
    "Stop-word removal",
    "Word Stemming(Porter Algorithm)",
    "Case folding",
    "Lemmatization",
    "Inverted indices"
   ]
  ],
  [
   "Skip pointers",
   2,
   [
    "Skip pointers",
    "Phrase queries"
   ]
  ],
  [
   "Tolerant Retrieval Wild card queries",
   4,
   [
    "Tolerant Retrieval Wild card queries",
    "Permuterm index",
    "Bigram index",
    "Spelling correction",
    "Edit distance",
    "Jaccard coefficient",
    "Soundex"
   ]
  ],
  [
   "Scoring",
   4,
   [
    "Scoring",
    "Term Weighting and the Vector Space Model"
   ]
  ],
  [
   "Evaluation of IR Models Precision",
   2,
   [
    "Evaluation of IR Models Precision",
    "Recall",
    "F-measure",
    "E-measure",
    "Normalized recall",
    "Evaluation problems"
   ]
  ],
  [
   "Latent Semantic Indexing Eigen vectors",
   4,
   [
    "Latent Semantic Indexing Eigen vectors",
    "Singular value decomposition",
    "Low rank approximation",
    "Problems with Lexical Semantics"
   ]
  ],
  [
   "Index Construction and Index Compression",
   2,
   []
  ],
  [
   "Query Expansion and Relevance feedback Rocchio algorithm",
   4,
   [
    "Query Expansion and Relevance feedback Rocchio algorithm",
    "Probabilistic relevance feedback",
    "Query Expansion and its types",
    "Query drift Clustering-Based Relevance Feedback"
   ]
  ],
  [
   "Query Augmentation Graph based augmentation",
   2,
   [
    "Query Augmentation Graph based augmentation",
    "Query similarity based",
    "Semantic query similarity based",
    "Dealing with Zero-recall queries"
   ]
  ],
  [
   "Statistical Language Models for IR Basics of Statistical Lan…",
   6,
   [
    "Statistical Language Models for IR Basics of Statistical Language Models",
    "Query-Likelihood Approaches",
    "Smoothing Methods",
    "Divergence Approaches",
    "Topic Models"
   ]
  ],
  [
   "Search Engines Search engines (working principle)",
   6,
   [
    "Search Engines Search engines (working principle)",
    "Spidering (Structure of a spider",
    "Simple spidering algorithm",
    "multithreaded spidering",
    "Bot)",
    "Directed spidering(Topic directed",
    "Link directed)",
    "Crawlers (Basic crawler architecture)",
    "Link analysis (e.g. hubs and authorities",
    "Page ranking",
    "Google Page Rank)",
    "shopping agents"
   ]
  ],
  [
   "Content Based Image Retrieval Introduction to conten t Based…",
   6,
   [
    "Content Based Image Retrieval Introduction to conten t Based Image retrieval",
    "Challenges in Image retrieval",
    "Image representation",
    "Indexing and retrieving images",
    "Relevance feedback"
   ]
  ],
  [
   "Semantic Matching using Neural Networks",
   2,
   []
  ]
 ],
 "216e": [
  [
   "Regular Expressions and Automata",
   2,
   []
  ],
  [
   "Introduction to NLP",
   6,
   [
    "Introduction to NLP",
    "Regular Expression",
    "Finite State Automata Tokenization"
   ]
  ],
  [
   "Word Tokenization",
   2,
   [
    "Word Tokenization",
    "Normalization",
    "Sentence Segmentation",
    "Named Entity Recognition",
    "Multi Word Expressions",
    "Minimum Edit Distance",
    "Spell Checking Morphology"
   ]
  ],
  [
   "Morphology – Inflectional and Derivational Morphology",
   4,
   [
    "Morphology",
    "Inflectional and Derivational Morphology",
    "Morphological Parsing with Finite State Transducers",
    "Porter Stemmer Language Modeling"
   ]
  ],
  [
   "Introduction to N -grams",
   4,
   [
    "Introduction to N -grams",
    "Chain Rule",
    "Smoothing",
    "Interpolation",
    "Backoff",
    "Web- Scale LMs",
    "Add -One Smoothing",
    "Good",
    "Kneser-Ney Smoothing",
    "Evaluation and Perplexity. Hidden Markov Models and POS Tagging"
   ]
  ],
  [
   "Markov Chain",
   4,
   [
    "Markov Chain",
    "Hidden Markov Models",
    "Forward Algorithm",
    "Viterbi Algorithm",
    "Part ofSpeech Tagging Text Classification"
   ]
  ],
  [
   "Text Classification",
   4,
   [
    "Text Classification",
    "Naïve Bayes’ Text Classification",
    "Sentiment Analysis - Opinion Mining and Emotion Analysis",
    "Resources and Techniques",
    "Evaluation Computational Lexical Semantics"
   ]
  ],
  [
   "Introduction to Lexical Semantics",
   6,
   [
    "Introduction to Lexical Semantics",
    "Thesaurus and WordNet",
    "Word Sense Disambiguation",
    "Word Similarity",
    "Path based",
    "Information Content based",
    "Resnik Similarity",
    "Lin Similarity",
    "Distributional Similarity",
    "Pointwise Mutual Information",
    "Word Sense Induction Information Retrieval"
   ]
  ],
  [
   "Boolean Retrieval",
   4,
   [
    "Boolean Retrieval",
    "Term -document incidence matrix",
    "Inverted Index",
    "Query processing with inverted index",
    "Phrase Queries",
    "Positional Index",
    "Ranked Retrieval",
    "Term Frequency",
    "Inverse Document Frequency",
    "tf-idf weighting",
    "Vector Space Model",
    "Relevance Feedback",
    "Page Ranking",
    "Evaluation Question Answering and Summarization"
   ]
  ],
  [
   "Question Processing",
   4,
   [
    "Question Processing",
    "Passage Retrieval",
    "Answer Processing",
    "Single and Multi Document Summarization",
    "Evaluation Machine Translation"
   ]
  ]
 ],
 "216f": [
  [
   "Introduction Multimedia and its Application",
   2,
   [
    "Introduction Multimedia and its Application",
    "Different Media",
    "Hypertext and Hypermedia",
    "Issues in Multimedia System",
    "Component of a Multimedia System"
   ]
  ],
  [
   "Overview of Text and Graphics",
   2,
   [
    "Types of Text Data (Plain/Formatted/Hypertext)",
    "Unicode Scheme",
    "Concept of Font",
    "File Formats (txt",
    "doc",
    "rtf",
    "ps",
    "pdf",
    "etc.)",
    "Vector and Raster Graphics"
   ]
  ],
  [
   "Image",
   5,
   [
    "Image Digitization",
    "Digital Image",
    "Binary/Gray Scale/ Colour Image",
    "Colour Models",
    "File Formats",
    "Overview of Contrast Intensification",
    "noise removal",
    "edge detection and segmentation"
   ]
  ],
  [
   "Image Descriptors (Shape",
   3,
   [
    "Image Descriptors (Shape",
    "Texture and Colour Features)"
   ]
  ],
  [
   "Lossless and Lossy Image Compression including JPEG",
   3,
   []
  ],
  [
   "An overview of Content-Based Image Retrieval System",
   3,
   []
  ],
  [
   "Audio",
   2,
   [
    "Audio Digitization (Sampling and Quantization",
    "Representation based on PCM/DPCM/DM/ADM)",
    "File Formats"
   ]
  ],
  [
   "Time Domain Descriptors (ZCR",
   3,
   [
    "Time Domain Descriptors (ZCR",
    "STE",
    "etc.)",
    "Frequency Domain Descriptors (Spectral Centroid",
    "Spectral Flux",
    "Spectral Roll Off",
    "etc.)",
    "and Perception-based Descriptors (Mel Scale",
    "MFCC)"
   ]
  ],
  [
   "Psycho Acoustics and Audio Compression",
   2,
   []
  ],
  [
   "An Overview of Audio Classification/Retrieval System",
   2,
   []
  ],
  [
   "Video",
   1,
   [
    "Structure of Video Data",
    "File Formats"
   ]
  ],
  [
   "Video Compression",
   2,
   []
  ],
  [
   "Motion Estimation",
   1,
   []
  ],
  [
   "Structural Segmentation of Video Data",
   3,
   []
  ],
  [
   "Overview of Video Summarization",
   2,
   [
    "Overview of Video Summarization",
    "Browsing and Retrieval System"
   ]
  ],
  [
   "Animation",
   4,
   [
    "Keyframes & tweening",
    "cel & path animation",
    "principles and techniques of animation",
    "Web animation",
    "3D animation principles",
    "camera",
    "special effects",
    "transformations and editing",
    "rendering algorithms",
    "features of animation software",
    "file formats"
   ]
  ]
 ],
 "216g": [
  [
   "Introduction to Biometric Systems",
   2,
   [
    "History",
    "Definition",
    "Characteristics",
    "Systems model",
    "Identification",
    "Verification/Authentication",
    "Applications"
   ]
  ],
  [
   "Image processing and Pattern recognition Fundamentals",
   4,
   [
    "Introduction to biometric samples",
    "Representation",
    "Biometrics as pattern recognition systems",
    "Preprocessing",
    "Segmentation",
    "Noise removal techniques",
    "etc"
   ]
  ],
  [
   "Biometric Traits",
   2,
   [
    "Fundamentals of acquisition sensors and techniques",
    "Characteristics of Biometric traits: Face",
    "Gait",
    "Iris",
    "Fingerprint",
    "Signature",
    "etc"
   ]
  ],
  [
   "Biometric Systems Performance Terminology",
   2,
   [
    "Performance assessment terminology",
    "Estimation of errors",
    "FAR",
    "FRR",
    "ROC",
    "Ranking",
    "Testing methods used in biometrics",
    "Graphical analysis of system performance"
   ]
  ],
  [
   "Biometric Feature Extraction",
   10,
   [
    "Subspace -based approaches: Principal Component Analysis (P CA)",
    "Fisher’s Linear Discriminant Analysis (FLDA)",
    "Independent Component Analysis (ICA)",
    "Variants of PCA",
    "FLDA and ICA",
    "Kernel version of subspace-based appr oaches",
    "Geometric- feature-based approaches",
    "Hybrid approaches. Invariant features",
    "etc"
   ]
  ],
  [
   "Biometric Classification & Recognition",
   5,
   [
    "Design of classifiers: Neural networks -based classifiers",
    "Probabilistic classifiers",
    "Neuro-Fuzzy classifiers",
    "Template matching",
    "etc"
   ]
  ],
  [
   "Multi-biometric Systems",
   5,
   [
    "Introduction to multi -biometric systems",
    "Types of multibiometric systems",
    "levels of fusion in multi- biometric systems: Image fusion",
    "Feature level fusion",
    "Dimension reduction",
    "Decision level fusion",
    "Demster Shafer (DS) Theory",
    "Multi-level fusion"
   ]
  ],
  [
   "Video-based Person Identification",
   4,
   [
    "Acquisition",
    "Generic systems model",
    "Face detection and recognition from video",
    "Tracking"
   ]
  ],
  [
   "3D face recognition systems",
   4,
   [
    "3D face model",
    "Reconstruction",
    "feature extraction and recognition",
    "Expression and Action recognition",
    "Multi-view 3D reconstruction"
   ]
  ],
  [
   "Biometric Standards & Privacy",
   2,
   [
    "Introduction to biometric standards",
    "importance of biometric standards",
    "privacy",
    "Biometric attacks",
    "interoperability of data",
    "systems and applications"
   ]
  ]
 ]
};
