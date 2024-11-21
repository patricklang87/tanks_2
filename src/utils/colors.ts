export const arrayToRgba = (array: number[]) : string => {
    let rgbaString = "rgba(";
    array.forEach((item, index) => {
      rgbaString += item;
      if (index !== array.length - 1) rgbaString += ", ";
    });
    rgbaString += ")";
    return rgbaString;
  };