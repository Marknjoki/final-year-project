import pool from "../Config/database.js";
import { getStagesQuery } from "../Queries/getStagesQuery.js";
const getStages = async (req, res) => {

    const { to } = req.query;

    if (!to) {
        return res.status(400).json({ error: "Missing route parameter" });
    }

    try {
        const result = await pool.query(
            getStagesQuery, [to]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default getStages;
