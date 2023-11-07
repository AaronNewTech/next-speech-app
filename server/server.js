//
const reload = require('reload')
const express = require("express");
const bcrypt = require("bcrypt");
const { User, Sound, SaveSound, Score } = require("./models");
const config = require("config");
const session = require("express-session");
// const open = require("open");
const app = express();

app.use(express.json());

// app.use(
//   session({
//     secret: 'your_secret_key_here',
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Your routes go here

app.get("/", (req, res) => {
  res.send("<h1>Speech Trainer Server</h1>");
});

app.post("/create_account", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send("Missing email");
    }

    if (!password) {
      return res.status(400).send("Missing password");
    }

    const hashed = await bcrypt.hash(password, 12); // Hash the password

    const user = new User({
      email,
      hash: hashed,
      password,
    });

    await user.save(); // Save the user to the database

    return res.status(201).send(`Welcome ${email}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: "User is not found" });
  }

  await user.destroy();

  return res.status(201).end();
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Missing Email!" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Password!" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ success: false, message: "User Not Found!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.hash);

  if (isPasswordCorrect) {
    // Store user.id in the session
    req.session.logged_in_user_id = user.id;

    return res
      .status(201)
      .json({ success: true, message: `Welcome back ${email}` });
  } else {
    return res.status(200).json({ success: false, message: "Wrong Password!" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  if (req.session.logged_in_user_id) {
    // Use user_id to query the user's data from the database
    const logged_in_user_id = req.session.logged_in_user_id;

    // Remove user_id from the session
    req.session.destroy();

    // Redirect to the login page or another page after logout
    return res.redirect("/login"); // Adjust the URL as needed
  }

  // Handle the case where the user is not logged in

  // Redirect to the login page or another page after logout
  return res.redirect("/login"); // Adjust the URL as needed
});

// Get all sounds
app.get("/sounds", async (req, res) => {
  const sounds = await Sound.findAll();
  const soundData = sounds.map((sound) => sound.toJSON());
  return res.status(200).json(soundData);
});

// Get the ID of the last sound
app.get("/get_last_sound_id", async (req, res) => {
  const lastSound = await Sound.findOne({
    order: [["id", "DESC"]],
  });

  if (lastSound) {
    const lastId = lastSound.id;
    return res.status(200).json(lastId);
  } else {
    return res.status(404).json({ message: "No entries found" });
  }
});

// Get sounds created with an ID greater than or equal to a specified value
app.get("/created_sounds", async (req, res) => {
  const minId = req.query.id_gte || 49; // Adjust the default value as needed
  const filteredSounds = await Sound.findAll({
    where: {
      id: { [Op.gte]: minId },
    },
  });

  const filteredSoundData = filteredSounds.map((sound) => sound.toJSON());
  return res.status(202).json(filteredSoundData);
});

// Create a new sound
app.post("/create_sound", async (req, res) => {
  const data = req.body;
  try {
    const sound = await Sound.create(data);
    return res.status(201).json(sound.toJSON());
  } catch (error) {
    return res.status(400).json({ errors: ["Validation errors"] });
  }
});

// Get a sound by ID, delete a sound, or update a sound
app.get("/sounds/:id", async (req, res) => {
  const { id } = req.params;
  const sound = await Sound.findByPk(id);

  if (!sound) {
    return res.status(404).json({ error: "Sound not found" });
  }

  return res.status(200).json(sound.toJSON());
});

app.delete("/sounds/:id", async (req, res) => {
  const { id } = req.params;
  const sound = await Sound.findByPk(id);

  if (!sound) {
    return res.status(404).json({ error: "Sound not found" });
  }

  await sound.destroy();
  return res.status(204).end();
});

app.patch("/sounds/:id", async (req, res) => {
  const { id } = req.params;
  const sound = await Sound.findByPk(id);

  if (!sound) {
    return res.status(404).json({ error: "Sound not found" });
  }

  const data = req.body;

  try {
    await sound.update(data);
    return res.status(202).json(sound.toJSON());
  } catch (error) {
    return res.status(400).json({ errors: ["Validation errors"] });
  }
});

// Save a sound
app.post("/saved_sounds", async (req, res) => {
  const data = req.body;
  const soundId = data.soundId;

  if (req.session.logged_in_user_id) {
    const logged_in_user_id = req.session.logged_in_user_id;

    const userSound = SaveSound.build({
      user_id: logged_in_user_id,
      sound_id: soundId,
    });

    try {
      await userSound.save();
      return res.status(201).json(userSound.toJSON());
    } catch (error) {
      return res.status(400).json({ errors: ["Validation errors"] });
    }
  } else {
    // Handle the case where the user is not logged in
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Get the user's ID by email
app.get("/getUserId", async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ where: { email } });

  if (user) {
    const userId = user.id;
    return res.status(200).json({ id: userId });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Get user saved sounds
app.get("/user_saved_sounds_button", async (req, res) => {
  if (req.session.logged_in_user_id) {
    const logged_in_user_id = req.session.logged_in_user_id;

    const userSounds = await SaveSound.findAll({
      where: { user_id: logged_in_user_id },
    });

    const userSoundData = userSounds.map((sound) => sound.toJSON());
    return res.status(202).json(userSoundData);
  } else {
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Get user saved sounds with sound details
app.get("/user_saved_sounds", async (req, res) => {
  if (req.session.logged_in_user_id) {
    const logged_in_user_id = req.session.logged_in_user_id;

    const savedSounds = await SaveSound.findAll({
      where: { user_id: logged_in_user_id },
      include: Sound, // Include the associated Sound model
    });

    const userSavedSounds = savedSounds.map((result) => {
      const savedSound = result.get();
      const sound = savedSound.Sound.get();

      return {
        id: sound.id,
        sound: sound.sound,
        image: sound.image,
        // Add other sound details you want to include
      };
    });

    return res.status(202).json(userSavedSounds);
  } else {
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Unsave a sound by ID
app.delete("/user_saved_sounds/:id", async (req, res) => {
  if (req.session.logged_in_user_id) {
    const logged_in_user_id = req.session.logged_in_user_id;
    const soundId = req.params.id;

    const savedSound = await SaveSound.findOne({
      where: { user_id: logged_in_user_id, sound_id: soundId },
    });

    if (!savedSound) {
      return res.status(404).json({ error: "Sound is not found" });
    }

    await savedSound.destroy();
    return res.status(204).end();
  } else {
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Update user scores
app.patch("/scores", async (req, res) => {
  if (req.session.logged_in_user_id) {
    const logged_in_user_id = req.session.logged_in_user_id;
    const data = req.body;
    const newScore = data.score_value;

    if (newScore === undefined) {
      return res
        .status(400)
        .json({ message: "score_value is required in the request data" });
    }

    try {
      const userScore = await Score.findOne({
        where: { user_id: logged_in_user_id },
      });

      if (!userScore) {
        return res.status(404).json({ message: "User not found" });
      }

      userScore.score = newScore;
      await userScore.save();

      const response_data = {
        user_id: userScore.user_id,
        score: userScore.score,
      };

      return res.status(202).json(response_data);
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Failed to update score on the server" });
    }
  } else {
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Get user score
app.get("/user_score", async (req, res) => {
  if (req.session.logged_in_user_id) {
    const logged_in_user_id = req.session.logged_in_user_id;

    const userScore = await Score.findOne({
      where: { user_id: logged_in_user_id },
    });

    if (userScore) {
      const response_data = {
        user_id: userScore.user_id,
        score: userScore.score,
      };

      return res.status(202).json(response_data);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } else {
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Your other routes and resources go here
const port = config.get("express.port") || 3001;
// const port = config.express.port || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const server = app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// Create a clickable link
// open(`http://localhost:${port}`);
// reload(app)
