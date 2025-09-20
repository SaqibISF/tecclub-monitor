import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const fetcher = (...args: [RequestInfo | URL, RequestInit?]) =>
  fetch(...args).then((res) => res.json());
