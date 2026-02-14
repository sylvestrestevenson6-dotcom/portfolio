// STEP 7 – FRONTEND JAVASCRIPT

// 1) Replace with your Netlify site name
const NETLIFY_FUNCTION_URL =
  "https://stevypro.netlify.app/.netlify/functions/send-email";

// 2) IDs from your existing HTML
const FORM_ID = "contactForm";
const NAME_ID = "name";
const EMAIL_ID = "email";
const MESSAGE_ID = "message";

// Optional but recommended (spam protection)
const HONEYPOT_ID = "website";

// Optional element to show messages on the page
const STATUS_ID = "formStatus";

// -------------------------------------------------

const form = document.getElementById(FORM_ID);
const statusEl = document.getElementById(STATUS_ID);

function showMessage(text) {
  if (statusEl) {
    statusEl.textContent = text;
  } else {
    alert(text);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop page reload
  const name = document.getElementById(NAME_ID)?.value.trim();
  const email = document.getElementById(EMAIL_ID)?.value.trim();
  const message = document.getElementById(MESSAGE_ID)?.value.trim();
  const website = document.getElementById(HONEYPOT_ID)?.value.trim() || "";
  
  // Simple validation
  if (!name || !email || !message) {
    showMessage("Please complete all fields.");
    return;
  }
alert("se valido");
  showMessage("Sending...");

  try {
    const response = await fetch(NETLIFY_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        website: website
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      showMessage(result.error || "Error sending message.");
      return;
    }

    showMessage("Message sent successfully!");
    form.reset();

  } catch (error) {
    showMessage("Network error. Please try again.");
  }
});








