import { DataSource, DataSourceOptions } from "typeorm";
import entities from "src/typeorm";


export const dataSourceOptions: DataSourceOptions = {
			type: 'postgres', //type of database
            url: 'postgresql://mchalard:mchalard@db:5432/postgres',
            host: process.env.POSGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: 'postgres',
            //entities: entities, //entities are used to create table in you database
			entities: ['dist/src/typeorm/*.entity.js'],
            synchronize: false,  // update table in realtime
            migrations: ['dist/db/migrations/*.js'],
}

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;