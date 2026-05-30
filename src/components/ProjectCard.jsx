// src/components/ProjectCard.jsx

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>

      <p>{project.description}</p>

      <p>
        <strong>Category:</strong> {project.category}
      </p>

      <p>
        <strong>Technology:</strong> {project.technology}
      </p>
    </div>
  );
}

export default ProjectCard;