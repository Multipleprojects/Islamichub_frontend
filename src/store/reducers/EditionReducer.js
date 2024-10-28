const initialState = {
  edition: "quran-uthmani"
};

const EditionReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "EDITION":
      return {
        edition: action.edition
      };

    default:
      return state;
  }
};

export default EditionReducer;
