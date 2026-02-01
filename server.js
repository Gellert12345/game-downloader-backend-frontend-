import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}));

app.use("/game", express.static("game"));

app.use(session({
  secret: "valami_titok",
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: "lax" }
}));

const passwordHash = await bcrypt.hash("1234", 10);

const user = {
  username: "user",
  passwordHash
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.status(401).json({ ok: false });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ ok: false });
  }

  req.session.loggedIn = true;
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Backend fut: http://localhost:3000");
});
