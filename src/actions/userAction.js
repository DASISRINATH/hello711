import axios from "axios";

export const getProjects = () => {
  return (dispatch) => {
    axios
      .get(
        "https://api.test.takengo.risee.in/index.php/rest/items/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/limit/10/"
      )
      .then((response) => {
        // console.log(response);
        dispatch({
          type: "LIST_PROJECTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const setCurrentProject = (projectId) => {
  return {
    type: "SET_USER",
    payload: projectId,
  };
};
