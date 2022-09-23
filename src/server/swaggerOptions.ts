import { Paths } from "../routes";

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasks API-REST',
            version: 'v2.0.0-rc',
            description: 'Api Rest of tasks for example.',
            contact: {
                name: 'Api Support',
                url: 'https://github.com/Sans-Frontieres/api-test',
                email: 'nikolas090189@gmail.com'
            },
            license: {
                name: 'MIT',
                url: 'https://es.wikipedia.org/wiki/Licencia_MIT'
            },
        },
        servers: [
            {
                url: `http://${process.env.HOST}:${process.env.PORT}${Paths.ROOT}`,
                description: 'Development'
            }
        ]
    },
    apis: ['./src/docs/*.yaml', './src/docs/EP-tasks/*.yaml', './src/docs/EP-auth/*.yaml']
}