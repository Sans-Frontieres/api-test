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
                url: 'http://localhost:4000/api/v1',
                description: 'Development'
            }
        ]
    },
    apis: ['./src/docs/task/*.yaml']
}