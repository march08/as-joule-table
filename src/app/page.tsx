import { Metadata } from "next";
import { FpsJouleTable } from "./FpsTable";

export const metadata: Metadata = {
  title: "Airsoft Joule chart",
};

export default async function FpsTablePage() {
  return <FpsJouleTable />;
}
