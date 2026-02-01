const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");

document.getElementById("login").addEventListener("submit", async e => {
  e.preventDefault();

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      username: userInput.value,
      password: passInput.value
    })
  });

  if (res.ok) {
    location.href = "index.html";
  } else {
    alert("Hibás belépés");
  }
});
