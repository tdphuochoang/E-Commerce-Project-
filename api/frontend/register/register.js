const form = document.getElementById("form");
form.addEventListener("submit", register);

async function register(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(username);

  const result = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  }).then((res) => res.json());

  if (result.status === 201) {
    window.location.href = "http://localhost:3000/login/login.html";
    alert("Successfully register");
  } else {
    alert(result);
  }
}
