"use client";
import { getScreenshotData } from "@/server-actions";
import { SiteData } from "@/types";
import {
  Camera,
  ChevronRight,
  Earth,
  Facebook,
  Info,
  Instagram,
  Linkedin,
  MailSearch,
  MapPin,
  PhoneCall,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DetailsPage() {
  const [data, setData] = useState<SiteData>();
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("details") as string);

    if (data.screenshot) {
      setData(data);
    } else {
      (async () => {
        const screenshotData = await getScreenshotData(data._id);
        setData({ ...data, screenshot: screenshotData?.screenshot });
      })();
    }
  }, []);
  if (data) {
    return (
      <>
        <div className="bg-white flex gap-x-5 pl-6 pb-4 pt-1">
          <Link href={"/"}>Home</Link>
          <span>
            <ChevronRight />
          </span>
          <span>{data.company}</span>
        </div>
        <div className="flex flex-col sm:flex-row bg-white px-5 m-1 rounded-sm py-6 gap-4">
          <div>
            <img
              src={data.image}
              alt=""
              className="h-28 w-28 object-contain mt-2"
            />
          </div>
          <div>
            <h1 className="text-3xl text-[#374151] font-semibold">
              {data.company}
            </h1>
            <div className="flex flex-col lg:flex-row gap-8 mt-4">
              <div className="lg:w-[34rem] pr-5 lg:border-r">
                <span className="text-[#64748B] flex gap-x-1 items-center">
                  <Info className="h-6 w-6" />
                  Description
                </span>
                <p>{data.description}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-[#64748B] flex gap-x-1 items-center">
                    <PhoneCall className="h-6 w-6" />
                    Phone
                  </span>
                  <p>{data.phone}</p>
                </div>

                <div>
                  <span className="text-[#64748B] flex gap-x-1 items-center">
                    <MailSearch className="h-6 w-6" />
                    Email
                  </span>
                  <p>{data.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-1 flex flex-col lg:flex-row gap-1">
          <div className="bg-white p-5 rounded-sm lg:w-[33rem] space-y-4 h-fit">
            <p className="text-md font-semibold">Company Details</p>

            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <Earth className="h-6 w-6" />
                Website
              </span>
              <p>{data.website}</p>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <Info className="h-6 w-6" />
                Description
              </span>
              <p>{data.description}</p>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <MapPin className="h-6 w-6" />
                Email
              </span>
              <p>{data.email}</p>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <Facebook className="h-6 w-6" />
                Facebook
              </span>
              <a href={data.socials.facebook} className="text-[#6C2BD9]">
                {data.socials.facebook}
              </a>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <Instagram className="h-6 w-6" />
                Instagram
              </span>
              <a href={data.socials.instagram} className="text-[#6C2BD9]">
                {data.socials.instagram}
              </a>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <Twitter className="h-6 w-6" />
                Twitter
              </span>
              <a href={data.socials.twitter} className="text-[#6C2BD9]">
                {data.socials.twitter}
              </a>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <Linkedin className="h-6 w-6" />
                Linkedin
              </span>
              <a href={data.socials.linkedin} className="text-[#6C2BD9]">
                {data.socials.linkedin}
              </a>
            </div>
            <div>
              <span className="text-[#64748B] flex gap-x-1 items-center">
                <MapPin className="h-6 w-6" />
                Address
              </span>
              <p>{data.address}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-sm w-full">
            <span className="flex gap-x-2">
              <Camera className="text-[#64748B]" />

              <p className="text-md font-semibold">Screenshot of Webpage</p>
            </span>
            <img src={data.screenshot} alt="" className="w-full mt-2" />
          </div>
        </div>
      </>
    );
  }

  return <></>;
}
