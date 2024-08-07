import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: 'http://localhost:3000/api-json', // '../schemas/be-schema.json',
    apiFile: '../../src/services/beApi.ts',
    apiImport: 'beApi',
    outputFile: '../../src/services/beGeneratedApi.ts',

    exportName: 'beGeneratedApi',
    hooks: { queries: true, lazyQueries: true, mutations: true },
    // filterEndpoints: [
    //     'usersControllerGetPortfolioList',
    //     'usersControllerRemoveFromPortfolio',
    //     'usersControllerAddToPortfolio',
    //     'usersControllerLogin',
    //     'usersControllerRegister',
    // ],
}

export default config
