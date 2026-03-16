import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { name, title, details, description, liveDemoUrl } = req.body;

    const thumbnail = req.files?.thumbnail?.[0]
      ? `/uploads/thumbnails/${req.files.thumbnail[0].filename}`
      : "";

    const pictures = req.files?.pictures
      ? req.files.pictures.map((file) => `/uploads/pictures/${file.filename}`)
      : [];

    if (!name || !title || !details || !description || !liveDemoUrl || !thumbnail) {
      return res.status(400).json({ message: "All required fields must be filled" });
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

export const updateProject = async (req, res) => {
  try {
    const { name, title, details, description, liveDemoUrl } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let updatedThumbnail = project.thumbnail;
    let updatedPictures = project.pictures;

    if (req.files?.thumbnail?.[0]) {
      updatedThumbnail = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
    }

    if (req.files?.pictures && req.files.pictures.length > 0) {
      updatedPictures = req.files.pictures.map(
        (file) => `/uploads/pictures/${file.filename}`
      );
    }

    project.name = name || project.name;
    project.title = title || project.title;
    project.details = details || project.details;
    project.description = description || project.description;
    project.liveDemoUrl = liveDemoUrl || project.liveDemoUrl;
    project.thumbnail = updatedThumbnail;
    project.pictures = updatedPictures;

    const updatedProject = await project.save();

    res.status(200).json(updatedProject);
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