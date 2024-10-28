const initialState = {
  settings: false
};

const SettingsReducer = (state = initialState, action) => {
  // console.log("reducerEdition", state);
  // console.log("ActionEdition", action);
  switch (action.type) {
    case "SHOWSETTINGS":
      return {
        settings: action.settings
      };

    default:
      return state;
  }
};

export default SettingsReducer;
