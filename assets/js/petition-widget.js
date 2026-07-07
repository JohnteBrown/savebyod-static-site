async function updatePetitionWidget() {
  const countEl = document.getElementById("signature-count");
  const goalEl = document.getElementById("signature-goal");
  const barEl = document.getElementById("progress-bar");
  const statusEl = document.getElementById("petition-status");

  if (!countEl || !goalEl || !barEl) {
    return;
  }

  try {
    const response = await fetch("/.netlify/functions/petition");
    const data = await response.json();

    if (typeof data.goal === "number") {
      goalEl.textContent = data.goal.toLocaleString();
    }

    if (typeof data.signatures === "number") {
      countEl.textContent = data.signatures.toLocaleString();

      const percent = Math.min(
        (data.signatures / data.goal) * 100,
        100
      );

      barEl.style.width = `${Math.max(percent, 1)}%`;

      if (statusEl) {
        statusEl.textContent = `${percent.toFixed(1)}% funded by signatures`;
      }
    } else {
      countEl.textContent = "—";

      if (statusEl) {
        statusEl.textContent =
          "Signature count unavailable right now";
      }
    }
  } catch (err) {
    console.error("Petition widget error:", err);

    countEl.textContent = "—";

    if (statusEl) {
      statusEl.textContent =
        "Widget temporarily unavailable";
    }
  }
}

updatePetitionWidget();