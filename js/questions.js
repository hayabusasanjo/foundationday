const questionDatabase = {
    "ICS": {
        1: [ // Level 1 (1st Year)
            {
                id: 1,
                questionType: "multiple-choice",
                question: "What does CPU stand for?",
                choices: [
                    "Central Processing Unit",
                    "Computer Personal Unit",
                    "Central Program Utility",
                    "Computer Processing User"
                ],
                answer: "Central Processing Unit",
                explanation: "CPU stands for Central Processing Unit. It acts as the brain of the computer.",
                xpReward: 20
            },
            {
                id: 2,
                questionType: "multiple-choice",
                question: "Which of these is a programming language?",
                choices: ["HTML", "Python", "HTTP", "FTP"],
                answer: "Python",
                explanation: "Python is a popular programming language. HTML is a markup language, while HTTP and FTP are protocols.",
                xpReward: 20
            },
            {
                id: 3,
                questionType: "true-false",
                question: "True or False: RAM is permanent storage.",
                choices: ["True", "False"],
                answer: "False",
                explanation: "False. RAM (Random Access Memory) is volatile, meaning its contents are lost when the computer is turned off.",
                xpReward: 20
            },
            {
                id: 4,
                questionType: "multiple-choice",
                question: "What does HTML stand for?",
                choices: [
                    "Hyper Text Markup Language",
                    "High Tech Machine Learning",
                    "Hyper Transfer Module Language",
                    "Home Tool Markup Language"
                ],
                answer: "Hyper Text Markup Language",
                explanation: "HTML stands for Hyper Text Markup Language. It is the standard language for creating web pages.",
                xpReward: 20
            },
            {
                id: 5,
                questionType: "multiple-choice",
                question: "Which component is used to connect a computer to a network?",
                choices: ["GPU", "Motherboard", "NIC", "Power Supply"],
                answer: "NIC",
                explanation: "NIC stands for Network Interface Card, which connects a computer to a computer network.",
                xpReward: 20
            },
            {
                id: 6,
                questionType: "true-false",
                question: "True or False: An SSD is generally faster than an HDD.",
                choices: ["True", "False"],
                answer: "True",
                explanation: "True. Solid State Drives (SSDs) have no moving parts and are much faster than traditional Hard Disk Drives (HDDs).",
                xpReward: 20
            },
            {
                id: 7,
                questionType: "multiple-choice",
                question: "What does HTTP stand for?",
                choices: [
                    "Hyper Text Transfer Protocol",
                    "High Transfer Technology Protocol",
                    "Hyper Tool Transfer Program",
                    "Hyper Text Terminal Protocol"
                ],
                answer: "Hyper Text Transfer Protocol",
                explanation: "HTTP stands for Hyper Text Transfer Protocol. It's the foundation of data communication for the World Wide Web.",
                xpReward: 20
            },
            {
                id: 8,
                questionType: "multiple-choice",
                question: "Which of the following is an output device?",
                choices: ["Mouse", "Keyboard", "Microphone", "Monitor"],
                answer: "Monitor",
                explanation: "A monitor displays information from the computer, making it an output device. The others are input devices.",
                xpReward: 20
            },
            {
                id: 9,
                questionType: "multiple-choice",
                question: "What is a 'bug' in programming?",
                choices: [
                    "An insect inside the computer",
                    "A feature requested by users",
                    "An error, flaw, or fault in the code",
                    "A type of computer virus"
                ],
                answer: "An error, flaw, or fault in the code",
                explanation: "A bug is an error in software that produces an incorrect or unexpected result.",
                xpReward: 20
            },
            {
                id: 10,
                questionType: "true-false",
                question: "True or False: CSS is used to style web pages.",
                choices: ["True", "False"],
                answer: "True",
                explanation: "True. CSS (Cascading Style Sheets) is used to describe the presentation and styling of a document written in HTML.",
                xpReward: 20
            }
        ]
    },
    "ITE": {
        1: [
            {
                id: 1,
                questionType: "multiple-choice",
                question: "What does pedagogy refer to?",
                choices: ["The study of soil", "The method and practice of teaching", "The study of ancient artifacts", "A type of learning disorder"],
                answer: "The method and practice of teaching",
                explanation: "Pedagogy is the discipline that deals with the theory and practice of education and teaching.",
                xpReward: 20
            },
            {
                id: 2,
                questionType: "true-false",
                question: "True or False: Formative assessment occurs at the very end of a course.",
                choices: ["True", "False"],
                answer: "False",
                explanation: "False. Formative assessments happen *during* the learning process to monitor student understanding. Summative is at the end.",
                xpReward: 20
            },
            {
                id: 3,
                questionType: "multiple-choice",
                question: "Which of these is a learning style in the VARK model?",
                choices: ["Kinesthetic", "Telepathic", "Osmotic", "Dynamic"],
                answer: "Kinesthetic",
                explanation: "The VARK model stands for Visual, Aural, Read/write, and Kinesthetic learning styles.",
                xpReward: 20
            },
            {
                id: 4,
                questionType: "multiple-choice",
                question: "Who developed the theory of Multiple Intelligences?",
                choices: ["Jean Piaget", "Howard Gardner", "B.F. Skinner", "Lev Vygotsky"],
                answer: "Howard Gardner",
                explanation: "Howard Gardner proposed the theory of multiple intelligences in his 1983 book 'Frames of Mind'.",
                xpReward: 20
            },
            {
                id: 5,
                questionType: "true-false",
                question: "True or False: Scaffolding involves giving students temporary support to achieve a goal.",
                choices: ["True", "False"],
                answer: "True",
                explanation: "True. Instructional scaffolding provides support to promote learning, which is gradually removed as the student becomes independent.",
                xpReward: 20
            },
            {
                id: 6,
                questionType: "multiple-choice",
                question: "What is the highest level of Bloom's Taxonomy (Revised)?",
                choices: ["Remembering", "Analyzing", "Creating", "Evaluating"],
                answer: "Creating",
                explanation: "In the revised Bloom's Taxonomy, 'Creating' is the highest level of cognitive learning.",
                xpReward: 20
            },
            {
                id: 7,
                questionType: "multiple-choice",
                question: "Which term refers to adjusting instruction to meet individual student needs?",
                choices: ["Standardization", "Differentiated Instruction", "Rote Learning", "Conditioning"],
                answer: "Differentiated Instruction",
                explanation: "Differentiated instruction involves tailoring teaching environments and practices to create appropriate learning experiences for different students.",
                xpReward: 20
            },
            {
                id: 8,
                questionType: "true-false",
                question: "True or False: An IEP stands for 'Individualized Education Program'.",
                choices: ["True", "False"],
                answer: "True",
                explanation: "True. An IEP is a written document for a child with a disability that details the specialized instruction and services they will receive.",
                xpReward: 20
            },
            {
                id: 9,
                questionType: "multiple-choice",
                question: "What describes learning that occurs through observing others?",
                choices: ["Operant Conditioning", "Social Learning Theory", "Classical Conditioning", "Constructivism"],
                answer: "Social Learning Theory",
                explanation: "Albert Bandura's Social Learning Theory posits that people learn from one another, via observation, imitation, and modeling.",
                xpReward: 20
            },
            {
                id: 10,
                questionType: "true-false",
                question: "True or False: Classroom management is only about disciplining students.",
                choices: ["True", "False"],
                answer: "False",
                explanation: "False. Classroom management includes establishing routines, building relationships, organizing space, and fostering a positive learning environment.",
                xpReward: 20
            }
        ]
    },
    "IBE": {
        1: [
            {
                id: 1,
                questionType: "multiple-choice",
                question: "What does ROI stand for?",
                choices: ["Return on Investment", "Rate of Interest", "Return on Income", "Revenue on Investment"],
                answer: "Return on Investment",
                explanation: "ROI stands for Return on Investment, a metric used to evaluate the efficiency or profitability of an investment.",
                xpReward: 20
            },
            {
                id: 2,
                questionType: "true-false",
                question: "True or False: In accounting, Assets = Liabilities + Equity.",
                choices: ["True", "False"],
                answer: "True",
                explanation: "True. This is the fundamental accounting equation.",
                xpReward: 20
            },
            {
                id: 3,
                questionType: "multiple-choice",
                question: "Which of the following is considered a 'liquid' asset?",
                choices: ["Real Estate", "Machinery", "Cash", "Brand Reputation"],
                answer: "Cash",
                explanation: "Cash is the most liquid asset because it can immediately be used to purchase goods, services, or pay off debt.",
                xpReward: 20
            },
            {
                id: 4,
                questionType: "multiple-choice",
                question: "What is a 'target market'?",
                choices: ["A market where arrows are sold", "The specific group of consumers a product is aimed at", "A competitor's store", "The stock market index"],
                answer: "The specific group of consumers a product is aimed at",
                explanation: "A target market is a specific group of people with shared characteristics that a company has identified as potential customers.",
                xpReward: 20
            },
            {
                id: 5,
                questionType: "true-false",
                question: "True or False: A monopoly occurs when many companies sell the same product.",
                choices: ["True", "False"],
                answer: "False",
                explanation: "False. A monopoly exists when a single company is the sole provider of a good or service.",
                xpReward: 20
            },
            {
                id: 6,
                questionType: "multiple-choice",
                question: "What is 'inflation'?",
                choices: ["A decrease in prices", "An increase in product quality", "The general increase in prices and fall in the purchasing value of money", "A type of tax"],
                answer: "The general increase in prices and fall in the purchasing value of money",
                explanation: "Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling.",
                xpReward: 20
            },
            {
                id: 7,
                questionType: "multiple-choice",
                question: "What are the 4 P's of Marketing?",
                choices: ["People, Place, Price, Profit", "Product, Price, Place, Promotion", "Plan, Prepare, Produce, Profit", "Package, Price, Place, People"],
                answer: "Product, Price, Place, Promotion",
                explanation: "The 4 P's, also known as the marketing mix, are Product, Price, Place, and Promotion.",
                xpReward: 20
            },
            {
                id: 8,
                questionType: "true-false",
                question: "True or False: B2B stands for 'Business-to-Business'.",
                choices: ["True", "False"],
                answer: "True",
                explanation: "True. B2B refers to a situation where one business makes a commercial transaction with another.",
                xpReward: 20
            },
            {
                id: 9,
                questionType: "multiple-choice",
                question: "What is an entrepreneur?",
                choices: ["An employee of a large corporation", "Someone who starts and runs their own business", "A government worker", "A corporate shareholder"],
                answer: "Someone who starts and runs their own business",
                explanation: "An entrepreneur is an individual who creates a new business, bearing most of the risks and enjoying most of the rewards.",
                xpReward: 20
            },
            {
                id: 10,
                questionType: "true-false",
                question: "True or False: Gross profit is the same as net profit.",
                choices: ["True", "False"],
                answer: "False",
                explanation: "False. Gross profit is revenue minus the cost of goods sold. Net profit is what remains after all other operating expenses, taxes, and interest are deducted.",
                xpReward: 20
            }
        ]
    }
};
