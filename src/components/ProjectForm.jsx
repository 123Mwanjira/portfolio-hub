// src/components/ProjectForm.jsx

import { useState } from "react";

function ProjectForm({ addProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [technology, setTechnology] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title,
      description,
      category,
      technology,
    };

    addProject(newProject);

    setTitle("");
    setDescription("");
    setCategory("");
    setTechnology("");
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>Add New Project</h2>

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Technology"
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
        required
      />

      <button type="submit">
        Add Project
      </button>
    </form>
  );
}

export default ProjectForm;