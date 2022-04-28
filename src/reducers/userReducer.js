const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIST_PROJECTS":
      return { ...state, projects: action.payload };
    case "SET_USER":
      return { ...state, projectId: action.payload };
    case "ADD_USER":
      const users = state.users.concat(action.payload);
      return { ...state, users };
    default:
      return state;
  }
};

export default userReducer;
