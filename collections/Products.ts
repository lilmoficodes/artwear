import { CollectionConfig } from "payload";
export const Products: CollectionConfig = {
    slug: "products",
    access: {
        read: () => true,
        create: ({ req }) => !!req.user
    },
    fields: [
        {
            name: "productName",
            type: "text",
            required: true
        },
        {
            name : "productPrice",
            type :"number",
            required : true
        },
        {   name : "productDescription",
            type : "text",
            required :true,
        },
        {
            name : "productImage",
            type : "upload",
            required : true,
            relationTo : "media"
        }
    ],
}