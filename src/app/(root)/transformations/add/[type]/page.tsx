import React from "react";
import Header from "../../../../../../components/shared/Header";
import { transformationTypes } from "../../../../../../constants";
import TranformationForm from "../../../../../../components/shared/TranformationForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

type TransformationType = keyof typeof transformationTypes;
const AddTransformationsPage = async ({
  params,
}: {
  params: { type: TransformationType };
}) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { type } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  console.log(userId);
  const user = await getUserById(String(userId));
  const transformation = transformationTypes[type];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TranformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        ></TranformationForm>
      </section>
    </>
  );
};
export default AddTransformationsPage; 
