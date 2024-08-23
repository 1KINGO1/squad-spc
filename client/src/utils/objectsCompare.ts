const objectsCompare = (obj1: any, obj2: any): boolean => {

  for (const key of Object.keys(obj1)) {

    console.log(key);

    try {
      const obj1Value = obj1[key] === "" ? null : obj1[key];
      const obj2Value = obj2[key] === "" ? null : obj2[key];

      console.log(1, obj1Value);
      console.log(2, obj2Value);

      if ((typeof obj1Value === "object" || Array.isArray(obj1Value)) && obj1Value !== null) {
        if (JSON.stringify(obj1Value) !== JSON.stringify(obj2Value)) {
          console.log("JSON", false);
          return false;
        }
      }

      else if (obj1Value !== obj2Value) {
        console.log("compare", false);
        return false;
      }
    }
    catch (e) {
      console.log(false);
      return false
    }
  }

  return true;
}

export default objectsCompare;