import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default("Datafore Team"),
    draft: z.boolean().default(false),
  }),
});

// Research reports: prose and figures in MDX, data from reports/<id>/queries/*.sql.
const reports = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/reports" }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences: the finding, for the index, meta description and social cards. */
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Datafore"),
    /** Folder under reports/ holding this report's SQL and sources. Defaults to the file name. */
    data: z.string().optional(),
    source: z.object({
      /** Short attribution shown under every figure, e.g. "CIHI, Physiotherapists in Canada, 2025". */
      short: z.string(),
      /** Full citation, as the publisher asks to be cited. */
      citation: z.string(),
      url: z.url().optional(),
    }),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, reports };
