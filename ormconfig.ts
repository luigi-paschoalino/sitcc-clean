import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import Models from './src/core/infra/models'
import { DataSource } from 'typeorm'

const DataSourceConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'lina',
    entities: Models,
    dropSchema: false,
    synchronize: false,
    logging: true,
    migrations: ['dist/src/shared/infra/migrations/**/*.{ts,js}'],
    autoLoadEntities: true,
}

export const DatabaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                ...DataSourceConfig,
                type: 'postgres',
            })
            return dataSource.initialize()
        },
    },
]

export const AppDataSource = new DataSource({
    ...DataSourceConfig,
    type: 'postgres',
})
