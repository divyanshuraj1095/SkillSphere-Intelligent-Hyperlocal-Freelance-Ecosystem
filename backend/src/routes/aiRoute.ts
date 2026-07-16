import express, { Request, Response } from "express";
import Project from "../models/Project";
import Gig from "../models/Gig";
import {
    getEmbedding,
    cosineSimilarity
} from "../services/ai.service";

const aiRouter = express.Router();

aiRouter.get("/recommend/:projectId", async (req: Request, res: Response) => {
    try {

        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const gigs = await Gig.find();

        const projectEmbedding = await getEmbedding(project.description);

        const recommendations: any[] = [];

        for (const gig of gigs) {

            const gigEmbedding = await getEmbedding(gig.description);

            const score = cosineSimilarity(
                projectEmbedding,
                gigEmbedding
            );

            recommendations.push({
                gig,
                score
            });

        }

        recommendations.sort((a, b) => b.score - a.score);

        res.status(200).json({
            message: "Recommended Gigs",
            data: recommendations
        });

    } catch (err) {

        res.status(500).json({
            message: "Error: " + err
        });

    }
});

export default aiRouter;