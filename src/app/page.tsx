import { Metadata } from "next";
import { FpsJouleTable } from "./FpsTable";

export const metadata: Metadata = {
  title: "Airsoft FPS Joule chart by Roman Nguyen",
  description: "Find your optimal bb weight and velocity for your replica.",
};

export default async function FpsTablePage() {
  return <FpsJouleTable />;
}
