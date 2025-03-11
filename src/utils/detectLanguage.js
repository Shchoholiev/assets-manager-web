const languageMap = {
  ".js": "Javascript",
  ".py": "Python",
  ".cs": "Csharp",
};

const detectLanguage = (extension) => {
  const language = languageMap[extension.toLowerCase()];
  return language || "Unknown";
};
const detectExtension = (language) => {
  const extension = Object.keys(languageMap).find(
    (key) => languageMap[key].toLowerCase() === language.toLowerCase()
  );
  return extension || "Unknown";
};

export { detectLanguage, detectExtension };
