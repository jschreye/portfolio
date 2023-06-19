import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import entities from "src/typeorm";

export default class TypeOrmConfig {
    
    static getOrmConfig(configService: ConfigService) : TypeOrmModuleOptions {
        return {
        type: 'postgres', //type of database
          host: configService.get('POSGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: entities, //entities are used to create table in you database
          synchronize: true,  // update table in realtime
          migrations: [/*...*/],
          migrationsTableName: "custom_migration_table"
        }
    }

}

export const typeOrmConfigAsync:  TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) : Promise<TypeOrmModuleOptions> => 
    TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService]
}