import mongoose from 'mongoose';
import { LevelSchema } from '../models/levelModel.js';
import { WritingAreaSchema } from '../models/writingAreaModel.js';
import { AssignmentSchema } from '../models/assignmentModel.js';
import { UserSchema } from '../models/userModel.js';


const levelSchema = mongoose.model('levels', LevelSchema);
const writingAreaSchema = mongoose.model('writing-areas', WritingAreaSchema);
const assignmentSchema = mongoose.model('assignments', AssignmentSchema);
const userSchema = mongoose.model('users', UserSchema);

export const getLevels = async (req, res) => {
    try {
        const levels = await levelSchema.find();
        res.status(200).json(levels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getWritingAreas = async (req, res) => {
    try {
        const levels = await writingAreaSchema.find();
        res.status(200).json(levels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAssignment = async (req, res) => {
    const { level, writingArea } = req.query;
    try {
        const assignments = await assignmentSchema.findOne({level, writingArea});
        res.status(200).json(assignments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveWriting = async (req, res) => {
    const { writing, email, assignmentId, feedback  } = req.body;
    console.log("body");
    console.log(req.body);
    try {
        const user = await userSchema.findOne({email});
        // if writings property does not exist, create it
        if (!user.writings) {
            user.writings = [];
        }
        user.writings.push({
                assingmentId: assignmentId,
                writing: writing,
                feedback: feedback
            });

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


