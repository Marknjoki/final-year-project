// import dotenv from 'dotenv';
// dotenv.config({ path: '/config.env' });
// import { Client } from "pg";
// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'CBD_Matatu_Stops',
//     password: 'postgres',
//     port: 5432,
// })
// client.connect()
//     .then(() => console.log('Database connected successfully'))
//     .catch(err => console.error('Database connection error:', err));

// // server.js or routes/data.js
// import express from 'express';

// const router = express.Router();


// router.get('/routes', async (req, res) => {
//     try {
//         const result = await pool.query(`
//       SELECT *, ST_AsGeoJSON(geom)::json as geometry FROM routes;
//     `);
//         res.json({
//             type: 'FeatureCollection',
//             features: result.rows.map(row => ({
//                 type: 'Feature',
//                 geometry: row.geometry,
//                 properties: { ...row, geometry: undefined },
//             })),
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('DB error');
//     }
// });

// module.exports = router;


import dotenv from 'dotenv';
dotenv.config({ path: './config.env' }); // make sure the path is correct

import express from 'express';
import { Pool } from 'pg';

const app = express();
const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CBD_Matatu_Stops',
    password: 'postgres',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Route
router.get('/routes', async (req, res) => {
    try {
        const result = await pool.query(`
        WITH stops AS (
          SELECT id, geom
          FROM route_stops_projected
          WHERE route_name = 'Kitengela'
          ORDER BY id
        ),
        snapped AS (
          SELECT
            s.id,
            s.geom,
            r.id AS edge_id,
            r.source,
            r.target,
            CASE
              WHEN ST_Distance(s.geom, v_source.the_geom) < ST_Distance(s.geom, v_target.the_geom)
              THEN r.source
              ELSE r.target
            END AS nearest_node
          FROM stops s
          JOIN LATERAL (
            SELECT *
            FROM route_split_spatial_join
            ORDER BY s.geom <-> geom
            LIMIT 1
          ) r ON TRUE
          JOIN route_split_spatial_join_vertices_pgr v_source ON v_source.id = r.source
          JOIN route_split_spatial_join_vertices_pgr v_target ON v_target.id = r.target
        ),
        snapped_with_lag AS (
          SELECT
            id,
            nearest_node,
            LAG(nearest_node) OVER (ORDER BY id) AS prev_node
          FROM snapped
        ),
        route_pairs AS (
          SELECT
            prev_node AS source,
            nearest_node AS target
          FROM snapped_with_lag
          WHERE prev_node IS NOT NULL
        ),
        routes AS (
          SELECT * FROM pgr_dijkstra(
            'SELECT id, source, target, cost, reverse_cost FROM route_split_spatial_join',
            (SELECT array_agg(source) FROM route_pairs),
            (SELECT array_agg(target) FROM route_pairs),
            directed := false
          )
        ),
        geom_route AS (
          SELECT ST_LineMerge(ST_Collect(w.geom)) AS geom
          FROM routes r
          JOIN route_split_spatial_join w ON r.edge = w.id
          WHERE r.edge <> -1
        )
        SELECT ST_AsGeoJSON(geom_route.geom)::json AS geometry
        FROM geom_route;
      `);

        res.json({
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: result.rows[0].geometry,
                properties: {}
            }]
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('DB error');
    }
});


router.get('/stops', async (req, res) => {
    try {


        const result = await pool.query(`
        SELECT 
  id,
  stop_id,
  stop_name,
  
  route_name,
   ST_AsGeoJSON(ST_Transform(geom, 4326))::json AS geometry
            FROM route_stops_projected;

        `)


        res.json({
            type: 'FeatureCollection',
            features: result.rows.map(row => ({
                type: 'Feature',
                geometry: row.geometry,
                properties: {
                    id: row.id,
                    stop_id: row.stop_id,
                    stop_name: row.stop_name,

                    route_name: row.route_name
                }
            })),
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('DB error');
    }
});
export default router;

