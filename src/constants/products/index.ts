import { ProductImage, SpecificationItem } from "@/types";

export const productImages: ProductImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Coffee grinder front view",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Coffee grinder side view",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Coffee grinder angle view",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Coffee grinder back view",
  },
]




export const specifications: SpecificationItem[] = [
  { label: "Stand Up", value: "35″L x 24″W x 37-45″H(front to back wheel)" },
  { label: "Folded (w/o wheels)", value: "32.5″L x 18.5″W x 16.5″H" },
  { label: "Folded (w/ wheels)", value: "32.5″L x 24″W x 18.5″H" },
  { label: "Door Pass Through", value: "24" },
  { label: "Frame", value: "Aluminum" },
  { label: "Weight (w/o wheels)", value: "20 LBS" },
  { label: "Weight Capacity", value: "60 LBS" },
  { label: "Width", value: "24″" },
  { label: "Handle height (ground to handle)", value: "37-45″" },
  { label: "Wheels", value: "12″ air / wide track slick tread" },
  { label: "Seat back height", value: "21.5″" },
  { label: "Head room (inside canopy)", value: "25″" },
  { label: "Color", value: "Black, Blue, Red, White" },
  { label: "Size", value: "M, S" },
]