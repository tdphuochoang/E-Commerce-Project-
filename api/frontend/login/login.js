const form = document.getElementById("form");
form.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(username);

  const result = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => res.json());

  if (result.status === 200) {
    console.log("Got the token: ", result.access_token);
    window.location.href = "http://localhost:3000/home/home.html";
    alert("Successfully login");
  } else {
    alert(result);
  }
}
