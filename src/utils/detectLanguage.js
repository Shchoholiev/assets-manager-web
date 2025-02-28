const languageMap = {
  ".js": "Javascript",
  ".ts": "Typescript",
  ".py": "Python",
  ".java": "Java",
  ".cpp": "C++",
  ".c": "C",
  ".cs": "Csharp",
  ".rb": "Ruby",
  ".go": "Go",
  ".php": "PHP",
  ".html": "HTML",
  ".css": "CSS",
  ".swift": "Swift",
  ".rust": "Rust",
  ".kotlin": "Kotlin",
  ".r": "R",
  ".pl": "Perl",
  ".lua": "Lua",
  ".json": "JSON",
  ".xml": "XML",
  ".sql": "SQL",
  ".yaml": "YAML",
  ".md": "Markdown",
  ".bash": "Bash",
  ".dart": "Dart",
  ".sh": "Shell",
  ".v": "Verilog",
  ".scala": "Scala",
  ".groovy": "Groovy",
  ".elixir": "Elixir",
  ".haskell": "Haskell",
  ".clojure": "Clojure",
  ".julia": "Julia",
  ".fsharp": "F#",
  ".vhdl": "VHDL",
};

const detectLanguage = (extension) => {
  const language = languageMap[extension.toLowerCase()];
  return language || "Unknown";
};

export default detectLanguage;
