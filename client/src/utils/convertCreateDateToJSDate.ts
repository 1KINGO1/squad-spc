// Function to convert create_date fields to Date objects
function convertCreateDateToJSDate(obj: any) {
  if (Array.isArray(obj)) {
    obj.forEach(item => convertCreateDateToJSDate(item));
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === "create_date" && typeof obj[key] === "string") {
          obj[key] = new Date(obj[key]);
        } else if (typeof obj[key] === "object") {
          convertCreateDateToJSDate(obj[key]);
        }
      }
    }
  }
}

export default convertCreateDateToJSDate;