// Supabase Edge Function: calc-engine
// OIML R-76-1:2006 Maximum Permissible Error (MPE) Authoritative Engine

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface RequestPayload {
  accuracyClass: "I" | "II" | "III" | "IIII";
  verificationInterval: number;
  load: number;
  indicatedValue?: number;
  service?: "INITIAL" | "IN_SERVICE";
}

const MPE_TIERS: Record<string, Array<{ upToE: number; factor: number }>> = {
  I: [{ upToE: 50000, factor: 0.5 }, { upToE: 200000, factor: 1.0 }, { upToE: Infinity, factor: 1.5 }],
  II: [{ upToE: 5000, factor: 0.5 }, { upToE: 20000, factor: 1.0 }, { upToE: Infinity, factor: 1.5 }],
  III: [{ upToE: 500, factor: 0.5 }, { upToE: 2000, factor: 1.0 }, { upToE: Infinity, factor: 1.5 }],
  IIII: [{ upToE: 50, factor: 0.5 }, { upToE: 200, factor: 1.0 }, { upToE: Infinity, factor: 1.5 }],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const payload: RequestPayload = await req.json();
    const { accuracyClass, verificationInterval, load, indicatedValue, service = "INITIAL" } = payload;

    if (!accuracyClass || !verificationInterval || load === undefined) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tiers = MPE_TIERS[accuracyClass];
    if (!tiers) {
      return new Response(JSON.stringify({ error: `Invalid class: ${accuracyClass}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const loadInE = Math.abs(load) / verificationInterval;
    const tier = tiers.find((t) => loadInE <= t.upToE) || tiers[tiers.length - 1];
    let factor = tier.factor;
    if (service === "IN_SERVICE") {
      factor *= 2;
    }

    const mpe = verificationInterval * factor;

    let evaluation = null;
    if (indicatedValue !== undefined) {
      const error = indicatedValue - load;
      const absError = Math.abs(error);
      const isCompliant = absError <= (mpe + 1e-9);
      const isNearLimit = isCompliant && absError >= (mpe * 0.85);

      evaluation = {
        error,
        isCompliant,
        isNearLimit,
        verdict: isCompliant ? "PASS" : "FAIL",
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          load,
          verificationInterval,
          loadInE,
          mpe,
          service,
          evaluation,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
