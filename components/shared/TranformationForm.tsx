"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from "../../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomField } from "./CustomField";
import { Input } from "@/components/ui/input";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import MediaUploader from "./MediaUploader";
import TransformedImage from "./TransformedImage";
import { updateCredits } from "@/lib/actions/user.actions";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.action";
import { useRouter } from "next/navigation";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";
export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});
// eslint-disable-next-line
const TranformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const router= useRouter();
  const [
    newTransformation,
    setNewTransformation,
  ] = useState<Transformations | null>(null);

  const [isSubmitting, setisSubmitting] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isTransforming, setIsTransforming] = useState(false);
   // eslint-disable-next-line 
  const [isPending, startTransition] = useTransition();
  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageData = aspectRatioOptions[value as AspectRatioKey];
 // eslint-disable-next-line 
    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageData?.aspectRatio,
      width: imageData?.width,
      height: imageData?.height,
    }));
    // console.log
    setNewTransformation(transformationType.config);
    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
       // eslint-disable-next-line 
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setIsTransforming(true);
    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);
    startTransition(async () => {
      await updateCredits(userId, -1);
      // start transformation
    });
  };
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit  (values: z.infer<typeof formSchema>) {
    console.log(values);
    setisSubmitting(true);
    console.log('action',action);
    console.log('data',data);
    console.log('image',image);

    if(data|| image){
      const transformationURL=getCldImageUrl({
        width:image?.width,
        height: image?.height,
        src:image?.publicId,
        ...transformationConfig
      })
      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationURL,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }
      if(action === 'Add') {
        try {
          console.log('hiiii')
          const newImage = await addImage({
            image: imageData,
            userId,
            path: '/'
          })
          console.log(newImage)
          if(newImage) {
            form.reset()
            setImage(image)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
      if(action === 'Update') {
        try {
          const updatedImage = await updateImage({
            image: {...imageData, _id:data._id},
            userId,
            path: '/'
          })

          if(updatedImage) {
            form.reset()
            setImage(data)
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
      
      setisSubmitting(false);
      

    }

  }

  useEffect(()=>{

    if(type==='restore' || type==='removeBackground'){
      setNewTransformation(transformationType.config);
    }

  },[image, transformationType.config, type])
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {creditBalance< Math.abs(creditFee) && <InsufficientCreditsModal /> }
          <CustomField
            control={form.control}
            name="title"
            formLabel="Image title"
            className="w-full"
            render={({ field }) => {
              return <Input {...field} className="input-field"></Input>;
            }}
          ></CustomField>

          {transformationType.type === "fill" && (
            <CustomField
              control={form.control}
              name="aspectRatio"
              formLabel="Aspect ratio"
              className="w-full"
              render={({ field }) => {
                return (
                  <Select
                    onValueChange={(value) =>
                      onSelectFieldHandler(value, field.onChange)
                    }
                    value={field.value}
                  >
                    <SelectTrigger className="select-field">
                      <SelectValue placeholder="Aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(aspectRatioOptions).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="flex justify-between"
                        >
                          {aspectRatioOptions[key as AspectRatioKey].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            ></CustomField>
          )}

          {(transformationType.type === "remove" ||
            transformationType.type === "recolor") && (
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                transformationType.type === "recolor"
                  ? "Object to recolor"
                  : "Object to remove"
              }
              className="w-full"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) =>
                      onInputChangeHandler(
                        "prompt",
                        e.target.value,
                        transformationType.type,
                        field.onChange
                      )
                    }
                    className="input-field"
                  ></Input>
                );
              }}
            ></CustomField>
          )}

          {transformationType.type === "recolor" && (
            <CustomField
              control={form.control}
              name="color"
              formLabel="Replacement color"
              className="w-full"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) =>
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                    className="input-field"
                  ></Input>
                );
              }}
            ></CustomField>
          )}
          <div className="media-uploader-field">
            <CustomField
              control={form.control}
              name="publicId"
              formLabel=""
              className="w-full"
              render={({ field }) => {
                return (
                  <MediaUploader
                    onValueChange={field.onChange}
                    setImage={setImage}
                    publicId={field.value}
                    image={image}
                    type={transformationType.type}
                  ></MediaUploader>
                );
              }}
            ></CustomField>

            <TransformedImage
              image={image}
              type={type}
              title={form.getValues().title}
              isTransforming={isTransforming}
              setIsTransforming={setIsTransforming}
              transformationConfig={transformationConfig}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button
              type="button"
              disabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}
              className="submit-button"
            >
              {isTransforming ? "Tranforming..." : "Apply Transformation"}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Saving..." : "Save Image"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TranformationForm;
