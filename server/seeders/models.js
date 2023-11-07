"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the 'Sounds' table
    await queryInterface.createTable("Sounds", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sound: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isUrl: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
      // Define other columns for the 'Sounds' table
    });

    // Create the 'Users' table
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: [4, 255],
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
      // Define other columns for the 'Users' table
    });

    // Create the 'Scores' table
    await queryInterface.createTable("Scores", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      score: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
      // Define other columns for the 'Scores' table
    });

    // Create the 'SaveSounds' table
    await queryInterface.createTable("SaveSounds", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
      // Define other columns for the 'SaveSounds' table
    });

    // Add foreign keys for associations
    await queryInterface.addColumn("Scores", "sound_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sounds",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("Scores", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("SaveSounds", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("SaveSounds", "sound_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sounds",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the tables in reverse order
    await queryInterface.dropTable("SaveSounds");
    await queryInterface.dropTable("Scores");
    await queryInterface.dropTable("Users");
    await queryInterface.dropTable("Sounds");
  },
};
