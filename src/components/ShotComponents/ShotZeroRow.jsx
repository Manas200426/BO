import React from "react";
import { skuVersionMeasurements } from "../../Data/SkuMeasurementData";

const ShotZeroRow = ({ skuVersionId, measurements, comments }) => {
  // Helper to get measured value
  const getMeasured = (type) =>
    measurements.find((m) => m.measurement_type === type)?.measurement_value ??
    "-";

  // Helper to get standard value
  const getStandard = (type) =>
    skuVersionMeasurements.find(
      (m) => m.sku_version_id === skuVersionId && m.measurement_type === type
    )?.measurement_value ?? "-";

  // Calculate deltas for liquid and panel (measured - standard)
  const delta = (measured, standard) =>
    measured !== "-" && standard !== "-"
      ? (measured - standard).toFixed(2)
      : "-";

  // Calculate deltas for colorimeter (measured + standard)
  const deltaColor = (measured, standard) =>
    measured !== "-" && standard !== "-"
      ? (measured + standard).toFixed(2)
      : "-";

  // Liquid
  const liquidL = delta(getMeasured("liquid_l"), getStandard("liquid_l"));
  const liquidA = delta(getMeasured("liquid_a"), getStandard("liquid_a"));
  const liquidB = delta(getMeasured("liquid_b"), getStandard("liquid_b"));

  // Panel
  const panelL = delta(getMeasured("panel_l"), getStandard("panel_l"));
  const panelA = delta(getMeasured("panel_a"), getStandard("panel_a"));
  const panelB = delta(getMeasured("panel_b"), getStandard("panel_b"));

  // Colorimeter (note: your measurements use "delta_colorimeter_*" as type)
  const colorL = deltaColor(
    getMeasured("delta_colorimeter_l"),
    getStandard("colorimeter_l")
  );
  const colorA = deltaColor(
    getMeasured("delta_colorimeter_a"),
    getStandard("colorimeter_a")
  );
  const colorB = deltaColor(
    getMeasured("delta_colorimeter_b"),
    getStandard("colorimeter_b")
  );

  // dE (just show measured value)
  const deltaE = getMeasured("target_delta_e");

  return (
    <tr className="bg-blue-50">
      <td className="border p-2 font-semibold">Shot 0</td>
      <td className="border p-2 text-center">-</td>
      <td className="border p-2 text-center">
        {liquidL}, {liquidA}, {liquidB}
      </td>
      <td className="border p-2 text-center">
        {panelL}, {panelA}, {panelB}
      </td>
      <td className="border p-2 text-center">
        {colorL}, {colorA}, {colorB}
      </td>
      <td className="border p-2 text-center">{deltaE}</td>
      <td className="border p-2 text-center">{comments}</td>
    </tr>
  );
};

export default ShotZeroRow;
