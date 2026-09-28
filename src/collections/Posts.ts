import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "publishedAt", "_status"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    {
      name: "h1",
      label: "H1 (si différent du titre)",
      type: "text",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL : /blog/ce-slug/",
      },
    },
    {
      name: "publishedAt",
      label: "Date de publication",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "excerpt",
      label: "Extrait",
      type: "textarea",
      required: true,
    },
    {
      name: "category",
      label: "Catégorie",
      type: "select",
      required: true,
      options: ["Web", "Hardware", "Gestion", "Sécurité"],
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      label: "Contenu (Markdown)",
      type: "textarea",
      required: true,
    },
  ],
};
