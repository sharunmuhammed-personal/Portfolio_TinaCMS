import { defineConfig } from "tinacms";

// Your hosting provider likely exposes these as environment variables
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io after connecting your repo
  clientId: process.env.TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  // Get this from tina.io after connecting your repo
  token: process.env.TINA_TOKEN || "",

  build: {
    // Where the Tina admin UI gets built to.
    // "src" so Eleventy's passthrough copy of src/admin picks it up automatically.
    outputFolder: "admin",
    publicFolder: "src",
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "src",
    },
  },

  schema: {
    collections: [
      {
        name: "project",
        label: "Work / Projects",
        path: "src/content/projects",
        format: "md",
        ui: {
          router: () => "/work/",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            options: ["Corporate & Brand", "Cinematography", "Color Grading"],
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "site",
        label: "Site Settings",
        path: "src/_data",
        format: "json",
        ui: {
          // Only one entry (site.json) — treat as a single global document
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "phone", label: "Phone" },
          { type: "string", name: "location", label: "Location" },
          { type: "string", name: "reel_url", label: "Reel URL (share link)" },
          { type: "string", name: "reel_embed", label: "Reel Embed URL" },
          {
            type: "object",
            name: "social",
            label: "Social Links",
            fields: [
              { type: "string", name: "linkedin", label: "LinkedIn" },
              { type: "string", name: "vimeo", label: "Vimeo" },
              { type: "string", name: "instagram", label: "Instagram" },
            ],
          },
          {
            type: "string",
            name: "categories",
            label: "Work Categories",
            list: true,
          },
        ],
      },
    ],
  },
});
