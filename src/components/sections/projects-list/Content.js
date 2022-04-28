import React, { Component, useEffect } from "react";
import { getProjects, setCurrentProject } from "../../../actions/userAction";
import { connect } from "react-redux";
import CurrentProject from "./CurrentProject";

const ProjectList = (props, state) => {
  useEffect(() => {
    props.getProjects();
  }, [state]);

  const handleOnClick = (projectId) => {
    props.setCurrentProject(projectId);
  };

  const Projects = () => {
    const projects = props.projects;
    let renderList = "No Projects";
    if (projects) {
      renderList = projects.map((project) => {
        // console.log("i m id", project.id);
        return (
          <a
            onClick={() => {
              handleOnClick(project.id);
            }}
            key={project.id}
            className="list-group-item"
          >
            {project.description}
          </a>
        );
      });
    }
    return renderList;
  };

  return (
    <div className="userlist-container">
      <div className="list-group"></div>
      <Projects></Projects>
      <div className="panel panel-default">
        <div className="panel-body">
          <CurrentProject></CurrentProject>
        </div>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, { getProjects, setCurrentProject })(
  ProjectList
);
