import { z } from "zod";

export const summarizedTitleDef = z.object({
  summarizedTitle: z.string(),
});

export const topicsSchema = z.object({
  topics: z.array(z.string()),
});

export const trackedHistorySchema = z.record(
  z.string(),
  z.array(
    z.object({
      text: z.string(),
      ids: z.array(z.number()),
    })
  )
);
