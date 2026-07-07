const PETITION_URL =
  process.env.CHANGE_ORG_URL ||
  "https://www.change.org/p/bring-back-personal-devices-to-youngstown-ohio-mcctc";

const PETITION_GOAL = Number(process.env.PETITION_GOAL || 15000);

function parseSignatureCount(html) {
  const patterns = [
    /"signatureCount"\s*:\s*(\d+)/i,
    /"signatures"\s*:\s*(\d+)/i,
    /"count"\s*:\s*(\d+)[^]*?signature/i,
    /([\d,]+)\s+signatures?/i,
    /([\d,]+)\s+people\s+have\s+signed/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const raw = match[1].replace(/,/g, "");
      const value = Number(raw);
      if (Number.isFinite(value) && value > 0) return value;
    }
  }

  return null;
}

exports.handler = async function () {
  try {
    const response = await fetch(PETITION_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Change.org request failed: ${response.status}`);
    }

    const html = await response.text();
    const signatures = parseSignatureCount(html);

    if (!signatures) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
        body: JSON.stringify({
          signatures: null,
          goal: PETITION_GOAL,
          error: "Could not extract signature count from page HTML.",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
      body: JSON.stringify({
        signatures,
        goal: PETITION_GOAL,
        percent: Math.min((signatures / PETITION_GOAL) * 100, 100),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signatures: null,
        goal: PETITION_GOAL,
        error: error.message || "Unable to fetch petition data.",
      }),
    };
  }
};