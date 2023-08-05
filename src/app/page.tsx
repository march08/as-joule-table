import { Metadata } from "next";
import { FpsJouleTable } from "./FpsTable";

export const metadata: Metadata = {
  title: "Airsoft FPS Joule chart by Roman Nguyen",
};

export default async function FpsTablePage() {
  return <FpsJouleTable />;
}
