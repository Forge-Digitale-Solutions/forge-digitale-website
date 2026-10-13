import type { CollectionConfig } from "payload";

export const NewsletterIssues: CollectionConfig = {
  slug: "newsletter-issues",
  labels: {
    singular: "Numéro de newsletter",
    plural: "Numéros de newsletter",
  },
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["date", "subject"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "date",
      label: "Date d'envoi",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "subject",
      label: "Objet",
      type: "text",
      required: true,
    },
    {
      name: "webUrl",
      label: "Lien version en ligne (Brevo)",
      type: "text",
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value || !value.startsWith("https://")) {
          return "Le lien doit commencer par https://";
        }
        return true;
      },
    },
  ],
};
