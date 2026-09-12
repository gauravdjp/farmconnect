import { NextRequest, NextResponse } from "next/server";
import { computeMPEDetails, evaluateReading, AccuracyClass } from "@/lib/calc-engine/mpe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accuracyClass, verificationInterval, load, indicatedValue, service } = body;

    if (!accuracyClass || verificationInterval === undefined || load === undefined) {
      return NextResponse.json(
        { error: "Missing required parameters: accuracyClass, verificationInterval, load" },
        { status: 400 }
      );
    }

    const mpeDetails = computeMPEDetails(
      accuracyClass as AccuracyClass,
      verificationInterval,
      load,
      { service }
    );

    let evaluation = null;
    if (indicatedValue !== undefined) {
      evaluation = evaluateReading(
        indicatedValue,
        load,
        accuracyClass as AccuracyClass,
        verificationInterval,
        { service }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        load: mpeDetails.load.toString(),
        verificationInterval: mpeDetails.e.toString(),
        loadInVerificationIntervals: mpeDetails.loadInE.toString(),
        tierFactor: mpeDetails.tierFactor.toString(),
        mpe: mpeDetails.mpe.toString(),
        service: mpeDetails.service,
        evaluation: evaluation
          ? {
              indicatedValue: evaluation.indicatedValue.toString(),
              error: evaluation.error.toString(),
              isCompliant: evaluation.isCompliant,
              isNearLimit: evaluation.isNearLimit,
              verdict: evaluation.verdict,
              status: evaluation.status,
            }
          : null,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Calculation failed" }, { status: 500 });
  }
}
