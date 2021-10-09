'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('USER','ADMIN')",
    );
    await queryInterface.sequelize.query(`
              CREATE TABLE "users"
              (
                  "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                  "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                  "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                  "dob"           DATE              NOT NULL,
                  "name"          character varying,
                  "role"          "users_role_enum" NOT NULL DEFAULT 'USER',
                  "email"         character varying,
                  "password"      character varying,
                  "uid"           character varying,
                  CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                  CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
              )`);
    await queryInterface.sequelize.query(`
              CREATE TABLE "blogs"
              (
                  "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                  "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                  "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                  "title"         character varying,
                  "content"       character varying,
                  CONSTRAINT "PK_aqm0u7uy6rjs198cnzks177nkk4" PRIMARY KEY ("id")
              )`);
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP TABLE "users"');
    await queryInterface.sequelize.query('DROP TYPE "users_role_enum"');
  },
};
