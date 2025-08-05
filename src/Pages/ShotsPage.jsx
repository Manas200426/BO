import React from "react";
import { useLocation } from "react-router-dom";
import StandardRow from "../components/ShotComponents/StandardRow";
import ShotZeroRow from "../components/ShotComponents/ShotZeroRow";
import ShotRow from "../components/ShotComponents/ShotRow";
import { shot_measurements } from "../Data/shots/shot_measurements";
import { shots } from "../Data/shots/Shots";
import { shot_tinters } from "../Data/shots/shot_tinters";

const ShotPageTable = () => {
  const location = useLocation();
  const batch = location.state?.batch;
  const plantId = location.state?.plantId;
  const skuVersionId = batch?.sku_version_id;
  const batchId = batch?.batch_id;

  // Find zeroth shot for this batch
  const zerothShot = shots.find(
    (s) => s.batch_id === batchId && s.shot_number === 0
  );

  // Get measurements for zeroth shot
  const zerothShotMeasurements = shot_measurements.filter(
    (m) => m.shot_id === zerothShot?.shot_id
  );

  // Find all shots for this batch except shot 0
  const otherShots = shots.filter(
    (s) => s.batch_id === batchId && s.shot_number !== 0
  );

  // Helper to get measurements for a shot
  const getShotMeasurements = (shotId) =>
    shot_measurements.filter((m) => m.shot_id === shotId);

  // Helper to get tinter batch ids for a shot
  const getShotTinterBatchIds = (shotId) =>
    shot_tinters
      .filter((st) => st.shot_id === shotId)
      .map((st) => st.tinter_batch_id);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Shots Table for Batch #{batch?.batch_code || "Unknown"}
      </h2>
      <p className="text-sm text-gray-600 mb-2">Plant ID: {plantId || "N/A"}</p>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sample</th>
            <th className="border p-2">Tinter Added</th>
            <th className="border p-2">Liquid Color (L, a, b)</th>
            <th className="border p-2">Panel Color (L, a, b)</th>
            <th className="border p-2">Colorimeter Color (L, a, b)</th>
            <th className="border p-2">Liquid dE</th>
            <th className="border p-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          <StandardRow skuVersionId={skuVersionId} />
          <ShotZeroRow
            skuVersionId={skuVersionId}
            measurements={zerothShotMeasurements}
            comments={zerothShot?.comments || ""}
          />
          {otherShots.map((shot) => (
            <ShotRow
              key={shot.shot_id}
              shotNumber={shot.shot_number}
              skuVersionId={skuVersionId}
              measurements={getShotMeasurements(shot.shot_id)}
              comments={shot.comments}
              tinterBatchIds={getShotTinterBatchIds(shot.shot_id)}
            />
          ))}
        </tbody>
      </table>
      {batch.status !== "completed" && (
        <div className="mt-4 text-right">
          <button
            onClick={handleAddShot}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Add Shot
          </button>
        </div>
      )}
    </div>
  );
};

export default ShotPageTable;
