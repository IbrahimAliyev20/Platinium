import Baking from "@/components/icons/Baking";
import Fruit from "@/components/icons/Fruit";
import MilkIcon from "@/components/icons/MilkIcon";

export const categories  = [
    {
        id: 1,
        name: "Milks & Dairies",
        slug: "milks-dairies",
        icon:  <MilkIcon />,
    },
    {
        id: 2,
        name: "Clothing",
        slug: "clothing",
    },
    {
        id: 3,
        name: "Pet Foods",
        slug: "pet-foods",
    },
    {
        id: 4,
        name: "Baking material",
        slug: "baking-material",
        count: 3,
        icon:<Baking />,
    },
    {
        id: 5,
        name: "Fresh Fruit",
        slug: "fresh-fruit",
        count: 25,
        icon: <Fruit />,
    },
]