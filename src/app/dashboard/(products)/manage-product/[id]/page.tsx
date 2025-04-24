import { FC } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const page: FC<PageProps> = async ({ params }) => {
  // const {params} = await params
  console.log(await params);
  
  return <div>page</div>;
};

export default page;
