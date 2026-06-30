import { ConfigService } from "src/config/config.service";
import { DataSource } from "typeorm";

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.get('HOST') || 'localhost',
        port: +config.get('PORT_DB'),
        username: config.get('USERNAME') || 'postgres',
        password: config.get('PASSWORD') || '1701',
        database: config.get('DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Carga automática de entidades
        synchronize: true, // Sincroniza las tablas automáticamente en desarrollo
      });

      return await dataSource.initialize(); // Conexión asíncrona corregida
    },
  },
];