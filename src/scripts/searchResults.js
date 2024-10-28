export const fetchSearchResults = async searchText => {
  //   this.setState({
  //     searchResult: true
  //   });

  let response = await fetch(
    "https://api.alquran.cloud/v1/search/" + searchText + "/all/en"
  );
  let parsedJSON = await response.json();

  return parsedJSON.data;
};
