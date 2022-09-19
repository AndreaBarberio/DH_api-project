import supertest from "supertest";

import app from "./app";

import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Mercury",
                description: "Solar System First planet",
                diameter: 1234,
                moons: 1545,
                createdAt: "2022-09-16T09:50:38.442Z",
                updateAt: "2022-09-16T09:48:27.234Z",
            },
            {
                id: 2,
                name: "",
                description: null,
                diameter: 0,
                moons: 0,
                createdAt: "2022-09-16T09:52:40.809Z",
                updateAt: "2022-09-16T09:50:41.239Z",
            },
        ];

        //@ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });
});

describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Mercury",
            description: "Solar System First planet",
            diameter: 1234,
            moons: 1545,
            createdAt: "2022-09-16T09:50:38.442Z",
            updateAt: "2022-09-16T09:48:27.234Z",
        };

        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Planet does not exist", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const response = await request
            .get(`/planets/23`)
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/23");
    });

    test("Invalid Planet ID", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const response = await request
            .get(`/planets/asdf`)
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/asdf");
    });



});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 3,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 1545,
            createdAt: "2022-09-19T09:48:39.609Z",
            updateAt: "2022-09-19T09:48:39.616Z",
        };

        //@ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send({
                name: "Mercury",
                diameter: 1234,
                moons: 1545,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 1545,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

