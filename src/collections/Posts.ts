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
      type: "tabs",
      tabs: [
        {
          label: "Contenu",
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
        },
        {
          label: "SEO",
          fields: [
            {
              name: "metaTitle",
              label: "Meta title (SEO)",
              type: "text",
              admin: {
                description:
                  "Si vide, le titre est utilisé. Viser environ 60 caractères.",
              },
            },
            {
              name: "metaDescription",
              label: "Meta description (SEO)",
              type: "textarea",
              admin: {
                description:
                  "Si vide, l’extrait est utilisé. Viser environ 155 caractères.",
              },
            },
            {
              name: "ogImage",
              label: "Image Open Graph",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Unsplash uniquement, jamais d’image générée par IA. Si vide, l’image de l’article est utilisée.",
              },
            },
            {
              name: "faq",
              label: "FAQ",
              type: "array",
              admin: {
                description:
                  "Questions et réponses optionnelles, pour un schéma FAQPage plus tard.",
              },
              fields: [
                {
                  name: "question",
                  label: "Question",
                  type: "text",
                  required: true,
                },
                {
                  name: "answer",
                  label: "Réponse",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
