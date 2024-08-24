interface Sortable {
  create_date: Date
}

const sortByCreateDate = <T extends Sortable>(data: T[], sortType: "ASC" | "DESC" = "ASC"): T[]  => {
  return data.sort((elem1, elem2) => {
    if (sortType === "DESC") {
      return elem2.create_date.getTime() - elem1.create_date.getTime();
    } else {
      return elem1.create_date.getTime() - elem2.create_date.getTime();
    }
  })
}

export default sortByCreateDate;