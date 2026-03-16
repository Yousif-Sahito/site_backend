import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword
      });

      console.log("Default admin created");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Seed admin error:", error.message);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};