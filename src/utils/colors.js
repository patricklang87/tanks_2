export const arrayToRgba = (array) => {
    let rgbaString = "rgba(";
    array.forEach((item, index) => {
      rgbaString += item;
      if (index !== array.length - 1) rgbaString += ", ";
    });
    return rgbaString;
  };