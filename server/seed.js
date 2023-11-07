const bcrypt = require("bcrypt");
// const config = require("./config");

const { db } = require("./app"); // Import your Sequelize database connection
const { User, Sound, SaveSound, Score } = require("./models"); // Import your Sequelize models

(async () => {
  console.log("Starting seed...");

  // await db.sync({ force: true }); // Use force: true to recreate the tables

  const users = [
    {
      email: "johnsmith@gmail.com",
      password: "1234",
      hash: bcrypt.hashSync("1234", bcrypt.genSaltSync(12)),
    },
    {
      email: "alicejohnson@gmail.com",
      password: "1234",
      hash: bcrypt.hashSync("1234", bcrypt.genSaltSync(12)),
    },
    {
      email: "bobhenry@gmail.com",
      password: "1234",
      hash: bcrypt.hashSync("1234", bcrypt.genSaltSync(12)),
    },
    {
      email: "tinapaul@gmail.com",
      password: "1234",
      hash: bcrypt.hashSync("1234", bcrypt.genSaltSync(12)),
    },
  ];

  // Add users to the database
  await User.bulkCreate(users);

  const sounds = [
    { sound: "apple", image: "images/1.png" },
    { sound: "ball", image: "images/2.png" },
    { sound: "cake", image: "images/3.png" },
    { sound: "duck", image: "images/4.png" },
    { sound: "egg", image: "images/5.png" },
    { sound: "fire", image: "images/6.png" },
    { sound: "guitar", image: "images/7.png" },
    { sound: "hat", image: "images/8.png" },
    { sound: "igloo", image: "images/9.png" },
    { sound: "jacket", image: "images/10.png" },
    { sound: "kite", image: "images/11.png" },
    { sound: "lettuce", image: "images/12.png" },
    { sound: "mango", image: "images/13.png" },
    { sound: "nurse", image: "images/14.png" },
    { sound: "octopus", image: "images/15.png" },
    { sound: "pizza", image: "images/16.png" },
    { sound: "queen", image: "images/17.png" },
    { sound: "rat", image: "images/18.png" },
    { sound: "spoon", image: "images/19.png" },
    { sound: "tree", image: "images/20.png" },
    { sound: "umbrella", image: "images/21.png" },
    { sound: "vest", image: "images/22.png" },
    { sound: "watch", image: "images/23.png" },
    { sound: "xylophone", image: "images/24.png" },
    { sound: "yo-yo", image: "images/25.png" },
    { sound: "zipper", image: "images/26.png" },
    { sound: "seal", image: "images/27.png" },
    { sound: "fish", image: "images/28.png" },
    { sound: "bear", image: "images/29.png" },
    { sound: "dog", image: "images/30.png" },
    { sound: "cat", image: "images/31.png" },
    { sound: "red", image: "images/32.png" },
    { sound: "blue", image: "images/33.png" },
    { sound: "yellow", image: "images/34.png" },
    { sound: "purple", image: "images/35.png" },
    { sound: "green", image: "images/36.png" },
    { sound: "orange", image: "images/37.png" },
    { sound: "zero", image: "images/38.png" },
    { sound: "one", image: "images/39.png" },
    { sound: "two", image: "images/40.png" },
    { sound: "three", image: "images/41.png" },
    { sound: "four", image: "images/42.png" },
    { sound: "five", image: "images/43.png" },
    { sound: "six", image: "images/44.png" },
    { sound: "seven", image: "images/45.png" },
    { sound: "eight", image: "images/46.png" },
    { sound: "nine", image: "images/47.png" },
    { sound: "10", image: "images/48.png" },
  ];

  // Add sounds to the database
  await Sound.bulkCreate(sounds);

  const userScores = [
    { user_id: 1, sound_id: 1, score: 0 },
    { user_id: 2, sound_id: 2, score: 0 },
    { user_id: 3, sound_id: 3, score: 0 },
    { user_id: 4, sound_id: 4, score: 0 },
    { users_id: 5, sound_id: 5, score: 0 },
  ];

  // Add userScores to the database
  await Score.bulkCreate(userScores);

  console.log("Seed completed!");
  process.exit(0);
})();
