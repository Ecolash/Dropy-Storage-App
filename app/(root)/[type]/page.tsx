import React from "react";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { convertFileSize, getFileTypesParams, getUsageSummary } from "@/lib/utils";
import { SortAsc, SortDesc } from "lucide-react";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });
  const totalSpace = await getTotalSpaceUsed();
  const usageSummary = getUsageSummary(totalSpace);
  const typeSpace = usageSummary.find((item) => item.title.toLowerCase() === type)?.size || 0;
  const sizeInfo = convertFileSize(typeSpace);

   return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{sizeInfo}</span>
          </p>

          <div className="sort-container">
            <SortAsc className="sort-logo mr-1" />
            <p className="hidden text-subbrand font-normal font-sans sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
