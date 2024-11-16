import { getImageById } from "@/lib/actions/image.action";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { transformationTypes } from "../../../../../../constants";
import Header from "../../../../../../components/shared/Header";
import { auth } from "@clerk/nextjs/server";
import TranformationForm from "../../../../../../components/shared/TranformationForm";

const Page = async ({ params }: SearchParamProps) => {
  const { userId } = await auth();
  const { id } = await params
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TranformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;