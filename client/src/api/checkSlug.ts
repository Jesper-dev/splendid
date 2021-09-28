import { useParams } from "react-router-dom";

interface SlugObj {
  slug: string;
}

export const CheckSlug = () => {
  let { slug }: SlugObj = useParams();
  return slug;
};
