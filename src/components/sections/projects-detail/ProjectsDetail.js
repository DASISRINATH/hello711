import { connect } from "react-redux";

const ProjectsDetail = (props) => {
  const projects = props.projects;
  let renderList = "No Projects";
  if (projects) {
    renderList = projects.map((project) => {
      // console.log("i m id", project.id);
      return (
        <a key={project.id} className="list-group-item">
          {project.id} : Description : {project.description}
        </a>
      );
    });
  }
  return renderList;
};

const mapStateToProps = (state) => {
  return {
    projects: state.user.projects,
    currentProject: state.user.projectId
      ? state.user.projects.filter(
          (project) => project.id === state.user.projectId
        )[0]
      : null,
  };
};

export default connect(mapStateToProps)(ProjectsDetail);
