import React from "react";
import { View, StyleSheet } from "react-native";

export type TableProps = {
  children: React.ReactNode;
};

export type RowProps = {
  children: React.ReactNode;
};

export type CellProps = {
  children: React.ReactNode;
};

export default function Table({ children }: TableProps) {
  return <View style={styles.table}>{children}</View>;
}

export function Row({ children }: RowProps) {
  return <View style={styles.row}>{children}</View>;
}

export function Cell({ children }: CellProps) {
  return <View style={styles.cell}>{children}</View>;
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
