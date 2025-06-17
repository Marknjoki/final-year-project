import pool from "../Config/database.js";

const getStops = async (req, res) => {
    const { route } = req.query;

    try {
        let query = `
            SELECT 
                id,
                stop_name,
                route_name,
                ST_AsGeoJSON(ST_Transform(geom, 4326))::json AS geometry
            FROM stopppps
        `;
        let params = [];


        if (route) {
            query += ` WHERE route_name ILIKE $1`;
            params.push(`%${route}%`);
        }

        const result = await pool.query(query, params);

        res.json({
            type: 'FeatureCollection',
            features: result.rows.map(row => ({
                type: 'Feature',
                geometry: row.geometry,
                properties: {
                    id: row.id,
                    stop_name: row.stop_name,
                    route_name: row.route_name
                }
            })),
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('DB error');
    }
};

export default getStops;
