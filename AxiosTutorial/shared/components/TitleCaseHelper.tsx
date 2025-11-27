const toTitleCase = (str = "") => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => {
      if (word.length === 0) return "";
      if (word.length === 1) return word.toUpperCase();     
      if (word.length === 2)                                 
        return word.charAt(0).toUpperCase() + word.charAt(1).toLowerCase();

      return word.charAt(0).toUpperCase() + word.slice(1);   
    })
    .join(" ");
};



export default toTitleCase;