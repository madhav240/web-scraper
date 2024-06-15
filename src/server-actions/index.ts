"use server";

import db from "@/db";
import axios from "axios";
import * as cheerio from "cheerio";
import { ObjectId } from "mongodb";
import puppeteer from "puppeteer";

export async function scrapeData(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const { hostname: website } = new URL(url);

    const company = $("title").text();
    const description = $('meta[name="description"]').attr("content");
    let image = $('link[rel="icon"]').attr("href");

    if (!image?.startsWith("https:/")) {
      image = "https://" + website + "/" + image;
    }

    const facebook = $('a[href*="facebook.com"]').attr("href");
    const linkedin = $('a[href*="linkedin.com"]').attr("href");
    const twitter = $('a[href*="twitter.com"]').attr("href");
    const instagram = $('a[href*="instagram.com"]').attr("href");

    const address = $("address").text();
    const phone = $('a[href^="tel:"]').text();
    const email = $('a[href^="mailto:"]').text();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({
      encoding: "base64",
      fullPage: true,
    });
    await browser.close();

    const data = {
      company,
      image,
      description,
      address,
      phone,
      email,
      website,
      socials: { facebook, linkedin, twitter, instagram },
      screenshot: `data:image/png;base64,${screenshot}`,
    };

    const { insertedId } = await db.collection("web-scraper").insertOne(data);

    return { ...data, insertedId };
  } catch (error) {
    console.log(error);
  }
}

export async function getDBSitesData(skip: number, limit: number) {
  const data = await db
    .collection("web-scraper")
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ $natural: -1 })
    .toArray();
  const total = await db.collection("web-scraper").countDocuments({});
  return { data, total };
}

export async function deleteDBSitesData(ids: string[]) {
  await db
    .collection("web-scraper")
    .deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } });
}
