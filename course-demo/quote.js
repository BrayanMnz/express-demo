const quotes = [
    "De vez en cuando, una nueva tecnología, un antiguo problema y una gran idea se convierten en una innovación. - Dean Kamen.",
    "La conectividad es un derecho humano. - Mark Zuckerberg,",
    "La ciencia de hoy es la tecnología del mañana. -  Edward Teller",
    "La tecnología es una palabra que describe algo que no funciona todavía. - Douglas Adams",
  ];
  
  exports.getQuote = () => {
    const idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx];
  };
  
  