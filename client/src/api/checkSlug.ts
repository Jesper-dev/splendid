import { useParams } from "react-router-dom";

interface SlugObj {
  slug: string;
}
//Function för att se :slug i pathen
export const CheckSlug = () => {
  let { slug }: SlugObj = useParams();
  return slug;
};
