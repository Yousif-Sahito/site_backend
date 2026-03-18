import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { name, title, details, description, liveDemoUrl } = req.body;

    const thumbnail = req.files?.thumbnail?.[0]
      ? req.files.thumbnail[0].path
      : "";

    const pictures = req.files?.pictures
      ? req.files.pictures.map((file) => file.path)
      : [];

    if (!name || !title || !details || !description || !liveDemoUrl || !thumbnail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({
      name,
      title,
      details,
      description,
      liveDemoUrl,
      thumbnail,
      pictures
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};