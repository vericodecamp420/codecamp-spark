export type LessonType = "reading" | "code" | "quiz" | "project";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  description: string;
  content: string;
  starterCode?: string;
  expectedOutput?: string;
  hints?: string[];
  questions?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  color: string;
  icon: string;
  totalLessons: number;
  estimatedHours: number;
  tags: string[];
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "html-css-fundamentals",
    title: "HTML & CSS Fundamentals",
    slug: "html-css-fundamentals",
    description: "Build beautiful, accessible web pages from scratch with modern HTML and CSS.",
    longDescription:
      "Start your web development journey by learning the building blocks of the web. You'll master semantic HTML, CSS layout techniques like Flexbox and Grid, responsive design, and accessibility best practices. By the end, you'll build and deploy your first portfolio website.",
    level: "Beginner",
    category: "Web Development",
    color: "oklch(0.65 0.18 25)",
    icon: "Layout",
    totalLessons: 8,
    estimatedHours: 12,
    tags: ["HTML", "CSS", "Responsive Design", "Accessibility"],
    lessons: [
      {
        id: "html-intro",
        title: "Introduction to HTML",
        type: "reading",
        duration: "15 min",
        description: "Learn what HTML is and how it structures web content.",
        content:
          "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure of a web page using elements represented by tags.\n\nCommon tags include `<h1>` for headings, `<p>` for paragraphs, `<a>` for links, and `<img>` for images. Semantic HTML uses tags like `<header>`, `<main>`, `<article>`, and `<footer>` to give meaning to the structure, which helps both accessibility and SEO.",
      },
      {
        id: "html-elements",
        title: "HTML Elements Practice",
        type: "code",
        duration: "25 min",
        description: "Write your first HTML page with headings, paragraphs, and links.",
        content:
          "Create a simple 'About Me' page. Use an `<h1>` for your name, a `<p>` for a short bio, and an `<a>` tag linking to your favorite website.",
        starterCode: "<!-- Write your HTML below -->\n\n",
        expectedOutput: "About Me",
        hints: ["Use <h1> for the main heading.", "Use <p> for the bio paragraph.", "Use <a href='...'> for the link."],
      },
      {
        id: "css-basics",
        title: "CSS Basics",
        type: "reading",
        duration: "20 min",
        description: "Learn how to style HTML with selectors, properties, and values.",
        content:
          "CSS (Cascading Style Sheets) describes how HTML elements should be displayed. You can select elements by tag name, class (`.class`), or ID (`#id`). Properties like `color`, `font-size`, `margin`, and `padding` control the visual presentation.",
      },
      {
        id: "css-colors-quiz",
        title: "CSS Colors & Fonts Quiz",
        type: "quiz",
        duration: "10 min",
        description: "Test your knowledge of CSS colors, fonts, and the box model.",
        content: "Answer the following questions to check your understanding.",
        questions: [
          {
            id: "q1",
            question: "Which CSS property changes the text color?",
            options: ["text-color", "font-color", "color", "foreground"],
            correctIndex: 2,
            explanation: "The `color` property sets the foreground text color of an element.",
          },
          {
            id: "q2",
            question: "What does padding control?",
            options: ["Space outside the border", "Space inside the border", "Border thickness", "Font size"],
            correctIndex: 1,
            explanation: "Padding is the space between an element's content and its border.",
          },
        ],
      },
      {
        id: "flexbox",
        title: "Flexbox Layout",
        type: "code",
        duration: "30 min",
        description: "Use Flexbox to align and distribute items in a row.",
        content:
          "Create a navigation bar with three items aligned horizontally and centered. Use a `<nav>` with `<a>` items and apply `display: flex` to the parent.",
        starterCode: "<style>\n  nav {\n    /* your code here */\n  }\n</style>\n\n<nav>\n  <a href='#'>Home</a>\n  <a href='#'>Courses</a>\n  <a href='#'>About</a>\n</nav>\n",
        expectedOutput: "Home",
        hints: ["Set display: flex on the nav element.", "Use justify-content to align items."],
      },
      {
        id: "grid",
        title: "CSS Grid",
        type: "reading",
        duration: "20 min",
        description: "Build two-dimensional layouts with CSS Grid.",
        content:
          "CSS Grid Layout is the most powerful layout system available in CSS. It is a two-dimensional system, meaning it can handle both columns and rows. Use `grid-template-columns` and `grid-template-rows` to define the layout.",
      },
      {
        id: "responsive",
        title: "Responsive Design",
        type: "code",
        duration: "25 min",
        description: "Make a card layout adapt to mobile and desktop screens.",
        content:
          "Create a card component that stacks vertically on small screens and sits side-by-side on larger screens. Use media queries and Flexbox or Grid.",
        starterCode: "<style>\n  .card {\n    /* your code here */\n  }\n</style>\n\n<div class='card'>Card 1</div>\n<div class='card'>Card 2</div>\n",
        expectedOutput: "Card 1",
        hints: ["Use @media (min-width: 768px) for desktop styles.", "Use flex-wrap: wrap to allow wrapping."],
      },
      {
        id: "portfolio-project",
        title: "Build Your Portfolio",
        type: "project",
        duration: "90 min",
        description: "Combine everything to build and deploy a personal portfolio page.",
        content:
          "Create a complete portfolio page with a header, hero section, about section, projects grid, and footer. Use semantic HTML, Flexbox/Grid, and responsive design. Submit a link or screenshot when done.",
      },
    ],
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    description: "Learn the language of the web: variables, functions, DOM manipulation, and events.",
    longDescription:
      "JavaScript brings websites to life. This course covers the fundamentals—variables, data types, control flow, functions, arrays, objects, and DOM events. You'll build interactive mini-projects and gain the confidence to read and write real JavaScript code.",
    level: "Beginner",
    category: "Web Development",
    color: "oklch(0.75 0.18 85)",
    icon: "Code2",
    totalLessons: 8,
    estimatedHours: 15,
    tags: ["JavaScript", "DOM", "Events", "ES6+"],
    lessons: [
      {
        id: "js-intro",
        title: "What is JavaScript?",
        type: "reading",
        duration: "15 min",
        description: "Understand how JavaScript runs in the browser and on servers.",
        content:
          "JavaScript is a versatile programming language originally created to add interactivity to web pages. Today it runs in browsers, on servers (via Node.js), and even on embedded devices. It is dynamically typed and supports multiple programming styles.",
      },
      {
        id: "variables",
        title: "Variables & Data Types",
        type: "code",
        duration: "20 min",
        description: "Practice declaring variables and working with strings, numbers, and booleans.",
        content:
          "Declare a variable `greeting` with the value 'Hello, CodeCamp!' and a variable `year` with the value 2026. Then log them to the console using `console.log()`.",
        starterCode: "// Declare your variables below\n\n",
        expectedOutput: "Hello",
        hints: ["Use let or const to declare variables.", "Use console.log() to print values."],
      },
      {
        id: "functions",
        title: "Functions",
        type: "reading",
        duration: "20 min",
        description: "Learn to write reusable blocks of code with functions.",
        content:
          "Functions are reusable blocks of code that perform a specific task. You can define them with the `function` keyword or as arrow functions (`=>`). They can accept parameters and return values.",
      },
      {
        id: "functions-quiz",
        title: "Functions Quiz",
        type: "quiz",
        duration: "10 min",
        description: "Check your understanding of function syntax and scope.",
        content: "Answer the questions below.",
        questions: [
          {
            id: "q1",
            question: "Which keyword declares a constant variable?",
            options: ["var", "let", "const", "static"],
            correctIndex: 2,
            explanation: "`const` declares a variable that cannot be reassigned.",
          },
          {
            id: "q2",
            question: "What does a function's `return` statement do?",
            options: [
              "Stops the program",
              "Outputs a value back to the caller",
              "Declares a new variable",
              "Imports a module",
            ],
            correctIndex: 1,
            explanation: "`return` passes a value back to where the function was called.",
          },
        ],
      },
      {
        id: "arrays",
        title: "Arrays & Loops",
        type: "code",
        duration: "25 min",
        description: "Work with arrays and loop over data.",
        content:
          "Create an array of three programming languages. Use a `for...of` loop to log each one to the console.",
        starterCode: "const languages = [];\n\n// Add your loop below\n",
        expectedOutput: "JavaScript",
        hints: ["Use square brackets to create an array.", "Use for (const lang of languages) to loop."],
      },
      {
        id: "dom",
        title: "DOM Manipulation",
        type: "code",
        duration: "30 min",
        description: "Select and modify HTML elements with JavaScript.",
        content:
          "Select the element with id 'title' and change its text content to 'Hello, JavaScript!'. Use `document.getElementById` and the `textContent` property.",
        starterCode: "<h1 id='title'>Original Title</h1>\n<script>\n  // your code here\n</script>\n",
        expectedOutput: "Hello",
        hints: ["Use document.getElementById('title')", "Set element.textContent to the new text."],
      },
      {
        id: "events",
        title: "Events & Interactivity",
        type: "reading",
        duration: "20 min",
        description: "Respond to user actions like clicks and keystrokes.",
        content:
          "Events are signals that something has happened in the browser, such as a click, keypress, or page load. You can listen for events with `addEventListener` and run code in response.",
      },
      {
        id: "counter-project",
        title: "Build a Counter App",
        type: "project",
        duration: "60 min",
        description: "Build an interactive counter with increment, decrement, and reset buttons.",
        content:
          "Create a counter app with a displayed number and three buttons. Use `addEventListener` to update the count and display it in real time.",
      },
    ],
  },
  {
    id: "python-basics",
    title: "Python Basics",
    slug: "python-basics",
    description: "A friendly introduction to Python: syntax, data structures, and small scripts.",
    longDescription:
      "Python is one of the most readable and versatile programming languages. This course teaches you the fundamentals—syntax, variables, conditionals, loops, functions, lists, and dictionaries—through short, practical exercises.",
    level: "Beginner",
    category: "Programming",
    color: "oklch(0.55 0.16 145)",
    icon: "Terminal",
    totalLessons: 6,
    estimatedHours: 10,
    tags: ["Python", "Scripting", "Data Structures"],
    lessons: [
      {
        id: "python-intro",
        title: "Why Python?",
        type: "reading",
        duration: "15 min",
        description: "Discover why Python is popular for beginners and professionals.",
        content:
          "Python is known for its clean, readable syntax and a huge ecosystem of libraries. It's used in web development, data science, automation, machine learning, and more.",
      },
      {
        id: "python-variables",
        title: "Variables & Print",
        type: "code",
        duration: "20 min",
        description: "Write your first Python script with variables and output.",
        content: "Create a variable `name` with your name and print 'Hello, {name}!' using an f-string.",
        starterCode: "# Write your code below\n\n",
        expectedOutput: "Hello",
        hints: ["Use name = 'Your Name'", "Use print(f'Hello, {name}!')"],
      },
      {
        id: "python-conditionals",
        title: "Conditionals",
        type: "reading",
        duration: "20 min",
        description: "Make decisions in your code with if/else statements.",
        content:
          "Conditional statements let your program make decisions. Use `if`, `elif`, and `else` to run different blocks of code based on conditions.",
      },
      {
        id: "python-loops",
        title: "Loops & Lists",
        type: "code",
        duration: "25 min",
        description: "Iterate over lists with for loops.",
        content: "Create a list of numbers from 1 to 5 and print each number squared.",
        starterCode: "numbers = [1, 2, 3, 4, 5]\n\n# your loop here\n",
        expectedOutput: "1",
        hints: ["Use for n in numbers:", "Print n * n inside the loop."],
      },
      {
        id: "python-functions",
        title: "Functions in Python",
        type: "code",
        duration: "25 min",
        description: "Define reusable functions with parameters and return values.",
        content: "Write a function `greet(name)` that returns 'Hello, {name}!'. Then call it with your name and print the result.",
        starterCode: "# Define greet below\n\n",
        expectedOutput: "Hello",
        hints: ["Use def greet(name):", "Use return to send back the string."],
      },
      {
        id: "python-quiz",
        title: "Python Fundamentals Quiz",
        type: "quiz",
        duration: "10 min",
        description: "Review Python syntax and data types.",
        content: "Answer the questions below.",
        questions: [
          {
            id: "q1",
            question: "Which symbol starts a Python comment?",
            options: ["//", "#", "--", "/*"],
            correctIndex: 1,
            explanation: "Python comments start with `#`.",
          },
          {
            id: "q2",
            question: "What function prints output to the console?",
            options: ["console.log", "print()", "echo", "puts"],
            correctIndex: 1,
            explanation: "Python uses `print()` to output text.",
          },
        ],
      },
    ],
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    slug: "react-fundamentals",
    description: "Build modern user interfaces with components, props, state, and hooks.",
    longDescription:
      "React is the library behind many of today's web apps. This course introduces components, JSX, props, state, and hooks. You'll build small, composable UIs and understand the unidirectional data flow that makes React predictable.",
    level: "Intermediate",
    category: "Web Development",
    color: "oklch(0.65 0.18 220)",
    icon: "Component",
    totalLessons: 6,
    estimatedHours: 14,
    tags: ["React", "JSX", "Hooks", "Components"],
    lessons: [
      {
        id: "react-intro",
        title: "What is React?",
        type: "reading",
        duration: "15 min",
        description: "Understand components, the virtual DOM, and declarative UI.",
        content:
          "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components. React uses a virtual DOM to efficiently update the page.",
      },
      {
        id: "jsx",
        title: "JSX Syntax",
        type: "code",
        duration: "20 min",
        description: "Write markup inside JavaScript with JSX.",
        content: "Create a component that returns an `<h1>` with the text 'Hello, React!'.",
        starterCode: "function App() {\n  return (\n    // your JSX here\n  );\n}\n",
        expectedOutput: "React",
        hints: ["Return a single element.", "Use className instead of class."],
      },
      {
        id: "props",
        title: "Props & Composition",
        type: "reading",
        duration: "20 min",
        description: "Pass data between components and compose them together.",
        content:
          "Props are how you pass data from a parent component to a child component. They make components reusable and configurable. Composition lets you build complex UIs by nesting simple components.",
      },
      {
        id: "state",
        title: "State with useState",
        type: "code",
        duration: "25 min",
        description: "Make components interactive with state.",
        content:
          "Create a counter component with a button that increments a count using the `useState` hook.",
        starterCode: "import { useState } from 'react';\n\nfunction Counter() {\n  // your code here\n}\n",
        expectedOutput: "Count",
        hints: ["Use const [count, setCount] = useState(0)", "Call setCount in the button onClick."],
      },
      {
        id: "effects",
        title: "Side Effects with useEffect",
        type: "reading",
        duration: "20 min",
        description: "Fetch data and respond to lifecycle events.",
        content:
          "The `useEffect` hook lets you perform side effects in function components, such as fetching data, subscribing to events, or manually changing the DOM.",
      },
      {
        id: "react-quiz",
        title: "React Concepts Quiz",
        type: "quiz",
        duration: "10 min",
        description: "Review components, props, and hooks.",
        content: "Answer the questions below.",
        questions: [
          {
            id: "q1",
            question: "What does JSX stand for?",
            options: [
              "JavaScript XML",
              "Java Syntax Extension",
              "JSON XML",
              "JavaScript Xtra",
            ],
            correctIndex: 0,
            explanation: "JSX is JavaScript XML, a syntax extension for JavaScript.",
          },
          {
            id: "q2",
            question: "Which hook manages local component state?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correctIndex: 1,
            explanation: "`useState` is the hook for adding state to function components.",
          },
        ],
      },
    ],
  },
  {
    id: "c-programming",
    title: "C Programming",
    slug: "c-programming",
    description: "Learn the fundamentals of C — variables, control flow, functions, and pointers.",
    longDescription:
      "C is the foundation of modern programming languages. This course walks you through variables, data types, control flow, functions, arrays, and an introduction to pointers. You'll build small command-line programs to solidify each concept.",
    level: "Beginner",
    category: "Programming",
    color: "oklch(0.6 0.15 260)",
    icon: "Binary",
    totalLessons: 6,
    estimatedHours: 12,
    tags: ["C", "Pointers", "Systems"],
    lessons: [
      {
        id: "c-intro",
        title: "Why Learn C?",
        type: "reading",
        duration: "15 min",
        description: "Understand why C is still one of the most influential languages.",
        content:
          "C is a general-purpose, compiled programming language created in the early 1970s. It powers operating systems, embedded devices, and performance-critical software. Learning C gives you a deep understanding of how memory, pointers, and low-level operations work.",
      },
      {
        id: "c-hello",
        title: "Hello, World in C",
        type: "code",
        duration: "20 min",
        description: "Write your first C program that prints a greeting.",
        content:
          "Write a C program that prints `Hello, C!` to the terminal using `printf`. Remember to include `<stdio.h>` and a `main` function that returns 0.",
        starterCode:
          "#include <stdio.h>\n\nint main(void) {\n    // print Hello, C! below\n    return 0;\n}\n",
        expectedOutput: "Hello, C!",
        hints: [
          "Use printf(\"...\\n\"); to print text.",
          "Don't forget the semicolon at the end of each statement.",
        ],
      },
      {
        id: "c-variables",
        title: "Variables & Data Types",
        type: "reading",
        duration: "20 min",
        description: "Learn about int, float, char, and how memory is used in C.",
        content:
          "C is a statically typed language: every variable must have a declared type. Common types are `int` (whole numbers), `float`/`double` (decimals), and `char` (single characters). The compiler reserves memory based on the type.",
      },
      {
        id: "c-loops",
        title: "Loops & Conditions",
        type: "code",
        duration: "25 min",
        description: "Use a for-loop to sum the numbers 1 to 5.",
        content:
          "Write a C program that uses a `for` loop to compute the sum of numbers from 1 to 5, then prints `Sum = 15`.",
        starterCode:
          "#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    // add a for loop here\n\n    printf(\"Sum = %d\\n\", sum);\n    return 0;\n}\n",
        expectedOutput: "Sum = 15",
        hints: [
          "Use for (int i = 1; i <= 5; i++) { sum += i; }",
          "Use %d in printf to print an integer.",
        ],
      },
      {
        id: "c-functions",
        title: "Functions in C",
        type: "code",
        duration: "25 min",
        description: "Define a function that squares a number.",
        content:
          "Define a function `int square(int n)` that returns `n * n`. Call it with 4 and print `Square = 16`.",
        starterCode:
          "#include <stdio.h>\n\n// define square below\n\nint main(void) {\n    // call square and print the result\n    return 0;\n}\n",
        expectedOutput: "Square = 16",
        hints: [
          "A function has a return type, name, and parameter list.",
          "Use printf(\"Square = %d\\n\", square(4));",
        ],
      },
      {
        id: "c-quiz",
        title: "C Fundamentals Quiz",
        type: "quiz",
        duration: "10 min",
        description: "Review C syntax, types, and pointers basics.",
        content: "Answer the questions below.",
        questions: [
          {
            id: "q1",
            question: "Which header do you include for printf and scanf?",
            options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"],
            correctIndex: 1,
            explanation: "`<stdio.h>` provides standard input/output functions like printf and scanf.",
          },
          {
            id: "q2",
            question: "What does the `&` operator do when used with a variable?",
            options: [
              "Multiplies two values",
              "Returns the address of the variable",
              "Compares two values",
              "Dereferences a pointer",
            ],
            correctIndex: 1,
            explanation: "`&x` returns the memory address of `x`, commonly used with scanf and pointers.",
          },
          {
            id: "q3",
            question: "Which format specifier prints an integer in printf?",
            options: ["%s", "%f", "%d", "%c"],
            correctIndex: 2,
            explanation: "`%d` prints a signed integer; `%f` is for floats, `%s` for strings, `%c` for chars.",
          },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getLessonById(course: Course, lessonId: string): Lesson | undefined {
  return course.lessons.find((l) => l.id === lessonId);
}

export function getNextLesson(course: Course, lessonId: string): Lesson | undefined {
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  return course.lessons[index + 1];
}

export function getPrevLesson(course: Course, lessonId: string): Lesson | undefined {
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  return course.lessons[index - 1];
}
