//Adskiller tusinder med et punktum og fjerner decimaler
//Anvendes kun til tal der vises, ikke til beregninger!
export const separateThousands = (number: number): string => {
  const rounded = Math.round(number);
  return new Intl.NumberFormat("de-DE").format(rounded);
};

//Samme funktionalitet, men tilføjer "kr." til starten af tallet
export const formatAsDKK = (number: number): string => {
  return `kr. ${separateThousands(number)}`;
};
