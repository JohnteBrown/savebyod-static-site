const PETITION_URL =
  process.env.CHANGE_ORG_URL ||
  "https://www.change.org/p/bring-back-personal-devices-to-youngstown-ohio-mcctc";

const PETITION_GOAL = Number(process.env.PETITION_GOAL || 200);

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

      if (Number.isFinite(value) && value >= 0) {
        return value;
      }
    }
  }

  return null;
}

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=60, s-maxage=300",
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async function () {
  const updatedAt = new Date().toISOString();

  try {
    const response = await fetch(PETITION_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
        "accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Change.org request failed with status ${response.status}`
      );
    }

    const html = await response.text();
    const signatures = parseSignatureCount(html);

    if (signatures === null) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          signatures: null,
          goal: PETITION_GOAL,
          percent: 0,
          updatedAt,
          error: "Could not extract signature count from Change.org page.",
        }),
      };
    }

    const percent = Math.min(
      (signatures / PETITION_GOAL) * 100,
      100
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        signatures,
        goal: PETITION_GOAL,
        percent,
        updatedAt,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        signatures: null,
        goal: PETITION_GOAL,
        percent: 0,
        updatedAt,
        error:
          error.message || "Unable to retrieve petition data.",
      }),
    };
  }
};