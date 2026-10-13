import path from "path";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médias" },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: true,
    },
    {
      name: "creditName",
      label: "Nom du photographe",
      type: "text",
    },
    {
      name: "creditUrl",
      label: "URL profil photographe",
      type: "text",
    },
    {
      name: "sourceUrl",
      label: "URL page photo",
      type: "text",
    },
  ],
};
