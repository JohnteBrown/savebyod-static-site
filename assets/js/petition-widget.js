async function updatePetitionWidget() {
  const response = await fetch("/.netlify/functions/petition");
  const data = await response.json();

  document.querySelector("#signature-count").textContent =
    data.signatures.toLocaleString();

  document.querySelector("#signature-goal").textContent =
    data.goal.toLocaleString();

  const percentage = Math.min(
    (data.signatures / data.goal) * 100,
    100
  );

  document.querySelector("#progress-bar").style.width =
    `${percentage}%`;
}

updatePetitionWidget();