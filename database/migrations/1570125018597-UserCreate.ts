import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserCreate1570125018597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'is_deleted',
            type: 'boolean',
          },
        ],
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('user');
    }

}
