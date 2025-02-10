'use client'
import { PrivyProvider as LibPrivyProvider } from "@privy-io/react-auth";

export function PrivyProvider(props: { children: React.ReactNode }) {
  return <LibPrivyProvider appId="clw6bvgaq0dd912g4ggphjlxf" {...props} />
}
