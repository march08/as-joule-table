"use client";
import { Button } from "@/components/Button";
import { ItemsContainer } from "@/components/ItemsContainer";
import { useSearchParamState } from "@/router/useSearchParamState";
import { newArrayLength } from "@/utils/createArray";
import React from "react";
import {
  FpsTable,
  FpsTableContainer,
  Td,
  Th,
  ThLower,
} from "./FpsTable.components";

const bbs = [0.2, 0.23, 0.25, 0.28, 0.3, 0.32, 0.36, 0.4, 0.43, 0.45, 0.49];

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
    <FpsTableContainer>
      <FpsTable>
        <thead>
          <tr>
            <Th>Velocity</Th>
            <Th colSpan={bbs.length} style={{ textAlign: "right" }}>
              Joules | Your target:{" "}
              <input
                type="number"
                min={0.5}
                max={15}
                step={0.1}
                value={maxJouleLimit}
                onChange={(e) =>
                  setMaxJouleLimitState(Number(e.target.value).toFixed(2))
                }
              />
            </Th>
          </tr>
          <tr>
            <ThLower>
              <ItemsContainer $noWrap style={{ justifyContent: "flex-end" }}>
                <Button
                  $primary={velocityUnitState !== "fps"}
                  onClick={() => {
                    setVelocityUnitState("ms");
                  }}
                >
                  m/s
                </Button>
                <Button
                  $primary={velocityUnitState === "fps"}
                  onClick={() => setVelocityUnitState("fps")}
                >
                  fps
                </Button>
              </ItemsContainer>
            </ThLower>
            {bbs.map((bb) => (
              <ThLower key={bb} $active={activeCol === bb}>
                {Intl.NumberFormat(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(bb)}
                g
              </ThLower>
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
              <Td $active={row.value === activeVelocity}>{row.label}</Td>

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
  );
};
