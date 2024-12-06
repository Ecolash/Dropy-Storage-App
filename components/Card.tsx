import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropDown";
import { UserRoundCheck } from "lucide-react";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between h-[120px]">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!h-full mb-0.5"
          imageClassName="size-[100px]"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-[14px] font-semibold pb-4 pr-2 text-brand">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="text-[15px] font-semibold mb-0.5">{file.name}</p>
        <div className="flex justify-between overflow-hidden">
          <FormattedDateTime
            date={file.$createdAt}
            className="text-[13.5px] text-light-100 w-2/5 text-left"
          />
            <div className="flex items-right justify-end h-auto w-3/5 text-[13.5px] pr-3 font-sans text-indigo-900 overflow-hidden text-right">
            <UserRoundCheck className="w-[16px] h-[18px] mr-0.5" />
            {file.owner.fullName.length > 16 ? `${file.owner.fullName.substring(0, 15)}...` : file.owner.fullName}
            </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
