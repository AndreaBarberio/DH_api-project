import express from "express";
import "express-async-errors";
import { nextTick } from "process";
import prisma from "./lib/prisma/client";

import {
    validate,
    validationErrorMiddleware,
    planetSchema,
    PlanetData,
} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/planets", async (request, response, next) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);
});
app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planet = await prisma.planet.findUnique({
        where: {id: planetId}
    });

    if(!planet){
        response.status(404); 
        return next(`Cannot GET /planets/${planetId}`)
    }


    response.json(planet);
});

app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planetData: PlanetData = request.body;
        const planet = await prisma.planet.create({
            data: planetData
        })
        response.status(201).json(planet);
    }
);

app.use(validationErrorMiddleware);
// Request examples

// !GET /planets  - retrieve all the planets
// app.get("/planets", (request, response) => {});

// !GET /planets/:id   -retrieve a specific planet
// app.get("/planet/:id", (request, response) => {});

// !POST /planets   -Create a new planet
// app.post("/planets", (request, response) => {});

// !PUT /planets/:id   -Replace an existing planet
// app.put("/planets/:id", (request, response) => {});

// !DELETE /planets/:id    - Delete an existing planet
// app.delete("/planets/:id", (request, response) =>{});

// !POST /planets/:id/photo - Add a photo for a planet
// app.post("/planets/:id/photo", (request, response)=>{})

export default app;

