import { connect } from "react-redux";

const CurrentProject = (props) => {
  const currentProject = props.currentProject;
  let userDetails = "No Projects Selected";
  if (currentProject) {
    userDetails = `Hi, project title is ${currentProject.title}, I'm name ${currentProject.name}, and I'm id is : ${currentProject.id} and updated_teime: ${currentProject.updated_date}`;
  }
  return userDetails;
};

const mapStateToProps = (state) => {
  return {
    currentProject: state.user.projectId
      ? state.user.projects.filter(
          (project) => project.id === state.user.projectId
        )[0]
      : null,
  };
};

export default connect(mapStateToProps)(CurrentProject);
