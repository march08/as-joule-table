"use client";
import { Button } from "@/components/Button";
import { ItemsContainer } from "@/components/ItemsContainer";
import { useSearchParamState } from "@/router/useSearchParamState";
import { newArrayLength } from "@/utils/createArray";
import React from "react";
import { styled } from "styled-components";
import { FpsTable, FpsTableContainer, Td, Th } from "./FpsTable.components";

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: #222;
  font-size: 0.75rem;
`;

const HeaderContent = styled.div`
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const bbs = [
  0.2, 0.23, 0.25, 0.28, 0.3, 0.32, 0.36, 0.4, 0.43, 0.45, 0.48, 0.5,
];

const getJoule = (weightInGrams: number, speedInMs: number) => {
  // 1/2 * weight in kg * speed ^ 2 in ms
  return (((1 / 2) * weightInGrams) / 1000) * speedInMs * speedInMs;
};

const fpsToMs = (fps: number) => fps / 3.2808398950131;

export const FpsJouleTable = () => {
  const [velocityUnitState, setVelocityUnitState] = useSearchParamState(
    "velocityUnit",
    "ms",
  );

  const [maxJouleLimitState, setMaxJouleLimitState] = useSearchParamState(
    "maxJouleLimit",
    "1.7",
  );

  const rows = React.useMemo(() => {
    // ms
    if (velocityUnitState === "fps") {
      return newArrayLength(75, 230, 5).map((item) => ({
        label: item,
        value: fpsToMs(item),
      }));
    }
    return newArrayLength(111, 70).map((item) => ({
      label: item,
      value: item,
    }));
  }, [velocityUnitState]);

  const [activeCol, setActiveCol] = React.useState<number | null>(null);
  const [activeVelocity, setActiveVelocity] = React.useState<number | null>(
    null,
  );

  const maxJouleLimit = Number(maxJouleLimitState);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <div>
            <strong>FPS Joule chart (Airsoft BBs)</strong>
          </div>
          <span style={{ textAlign: "right" }}>
            <ItemsContainer $align="center">
              Target energy (Joule):{" "}
              <input
                type="number"
                min={0.5}
                max={15}
                step={0.1}
                value={maxJouleLimit}
                style={{
                  lineHeight: "1.25rem",
                  borderRadius: 4,
                  outline: "none",
                  border: "1px solid #555",
                  padding: "0 0 0 .5rem",
                  height: "1.25rem",
                }}
                onChange={(e) =>
                  setMaxJouleLimitState(Number(e.target.value).toFixed(2))
                }
              />
              {velocityUnitState !== "fps" ? (
                <Button
                  title="Switch to fps"
                  $primary
                  onClick={() => setVelocityUnitState("fps")}
                >
                  Switch to fps
                </Button>
              ) : (
                <Button
                  title="Switch to m/s"
                  $primary
                  onClick={() => {
                    setVelocityUnitState("ms");
                  }}
                >
                  Switch to m/s
                </Button>
              )}
            </ItemsContainer>
          </span>
        </HeaderContent>
      </Header>
      <FpsTableContainer style={{ flexGrow: 1 }}>
        <FpsTable>
          <thead>
            <tr>
              <Th>Velocity</Th>
              {bbs.map((bb) => (
                <Th key={bb} $active={activeCol === bb}>
                  {Intl.NumberFormat(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }).format(bb)}
                  g
                </Th>
              ))}
            </tr>
          </thead>
          <tbody
            onMouseLeave={() => {
              setActiveCol(null);
              setActiveVelocity(null);
            }}
          >
            {rows.map((row) => (
              <tr key={row.value}>
                <Td $active={row.value === activeVelocity}>
                  {row.label}{" "}
                  <span style={{ opacity: 0.4 }}>
                    {velocityUnitState === "fps" ? "fps" : "m/s"}
                  </span>
                </Td>

                {bbs.map((bb) => {
                  const energy = Number(getJoule(bb, row.value).toFixed(2));
                  return (
                    <Td
                      key={bb}
                      onMouseOver={() => {
                        setActiveCol(bb);
                        setActiveVelocity(row.value);
                      }}
                      $semiActive={
                        activeVelocity && activeCol
                          ? (row.value === activeVelocity && bb < activeCol) ||
                            (bb === activeCol && row.value < activeVelocity)
                          : undefined
                      }
                      $active={bb === activeCol && row.value === activeVelocity}
                      $isOverLimit={energy > maxJouleLimit}
                    >
                      {Intl.NumberFormat(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }).format(energy)}
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </FpsTable>
      </FpsTableContainer>
    </Container>
  );
};
