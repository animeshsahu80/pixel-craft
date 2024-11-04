// import React from "react";
// import Header from "../../../../../../components/shared/Header";
// import { transformationTypes } from "../../../../../../constants";
// // import TranformationForm from "../../../../../../components/shared/TranformationForm";
// import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
// import { redirect } from "next/navigation";



// type TransformationType = keyof typeof transformationTypes;
// const AddTransformationsPage = async ({ params }: { params: { type: TransformationType } }) => {
// // eslint-disable-next-line @typescript-eslint/no-misused-promises
// const { type } = await params; 
//   const {userId}= await auth();
//   if(!userId) redirect("/sign-in");
//   console.log(userId);
//   // const user = await getUserById(String(userId));
//   const transformation = transformationTypes[type];

//   return (
//     <>
//       <Header
//         title={transformation.title}
//         subtitle={transformation.subTitle}
//       />
//       {/* <TranformationForm 
//         action="Add"
//         userId={await user._id}
//         type={transformation.type as TransformationTypeKey}
//         creditBalance={2}

//       ></TranformationForm> */}

//     </>
//   );
// };
// export default AddTransformationsPage;

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const AddTransformationsPage = async () => {
  const {userId}= await auth();
  if(!userId) redirect("/sign-in");
  console.log(userId);
  const user = await getUserById(String(userId));
  console.log('user=>>',user);
  return (
    <div>AddTransformationsPage</div>
  )
}

export default AddTransformationsPage