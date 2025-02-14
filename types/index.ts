/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from "react";

export interface FeatureInfo {
  title: string;
  description: string;
  icon: ComponentType<any>; // Store the component type
}
