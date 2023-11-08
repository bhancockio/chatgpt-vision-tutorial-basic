import { uploadThingFileRouter } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton } = generateComponents<uploadThingFileRouter>();
