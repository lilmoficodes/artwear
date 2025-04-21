import { CollectionConfig } from "payload";
export const Products: CollectionConfig = {
    slug: "products",
    access: {
        read: () => true,
        create: ({ req }) => !!req.user
    },
    fields: [
        {
            name: "product name",
            type: "text",
            required: true
        },
        {
            name : "Product Price",
            type :"number",
            required : true
        },
        {
            name : "Product description",
            type : "text",
            required :true,
        },
        {
            name: "products image",
            type: "array",
            label : "Product Image",
            fields : [
                {
                    name : "image", 
                    type : "upload",
                    relationTo : "media",
                    required : true,
                }
            ]
        }
    ]
}