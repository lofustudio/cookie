import { ApiRoute } from "../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/api/commands",
    method: "GET",
    handler: async (client, req, res) => {
        const commands = client.commands;
        res.json(commands);
    }
}