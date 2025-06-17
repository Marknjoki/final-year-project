
import pool from '../Config/database.js';


const getRoutes = async (req, res) => {
    const { to } = req.query;

    try {
        const query =
            `
            SELECT 
                ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geom,
                from_stop,
                to_stop,
                route_name,
                reverse_cost,
                CASE WHEN reverse_cost = -1 THEN true ELSE false END AS is_oneway
            FROM final_routes
            ${to ? "WHERE LOWER(route_name) LIKE LOWER($1)" : ""}
        `;

        const values = to ? [`%${to}%`] : [];

        const result = await pool.query(query, values);


        const routeMap = {};
        result.rows.forEach(row => {
            const feature = {
                type: 'Feature',
                geometry: JSON.parse(row.geom),
                properties: {
                    from_stop: row.from_stop,
                    to_stop: row.to_stop,
                    route_name: row.route_name,
                    reverse_cost: row.reverse_cost,
                    is_oneway: row.is_oneway
                }
            };

            if (!routeMap[row.route_name]) {
                routeMap[row.route_name] = {
                    type: 'FeatureCollection',
                    route_name: row.route_name,
                    features: []
                };
            }

            routeMap[row.route_name].features.push(feature);
        });

        res.json(Object.values(routeMap));
    } catch (err) {
        console.error(err);
        res.status(500).send('DB error');
    }
};
export default getRoutes;