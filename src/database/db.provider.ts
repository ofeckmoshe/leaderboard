import { Sequelize } from 'sequelize-typescript';
import DBConfig from './db.config';


export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(DBConfig.DBConnectionObject);
      sequelize.addModels(DBConfig.DBModelsArray);
      // show / hide SQL log
      if (process.env['SHOW_SQL_LOG'] && process.env['SHOW_SQL_LOG'] === 'yes') {
        sequelize.options.logging = true;
      } else {
        sequelize.options.logging = false;
      }
      await sequelize.sync();
      return sequelize;
    },
  },
];