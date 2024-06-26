// @ts-nocheck
"use server";

import db from "@/db";
import axios from "axios";
import * as cheerio from "cheerio";
import { ObjectId } from "mongodb";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";

async function getBrowser() {
  if (process.env.VERCEL_ENV === "production") {
    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
      ),
      headless: chromium.headless,
    });
    return browser;
  } else {
    const browser = await puppeteer.launch();
    return browser;
  }
}

export async function scrapeData(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const { hostname: website } = new URL(url);

    const company = $("title").text();
    const description = $('meta[name="description"]').attr("content");

    const faviconSelectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
      'link[rel="apple-touch-icon-precomposed"]',
      'link[rel="mask-icon"]',
    ];

    let image;

    // $('link[rel="icon"]').attr("href");
    for (const selector of faviconSelectors) {
      const favicon = $(selector).attr("href");
      if (favicon) {
        image = favicon;
        break;
      }
    }

    if (image) {
      // Ensure the URL is absolute
      if (!image.startsWith("http")) {
        const urlObj = new URL(url);
        image = new URL(image, urlObj.origin).href;
      }
      console.log("Favicon URL:", image);
    } else {
      console.log("Favicon not found.");
    }

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

    const data = {
      company,
      image,
      description,
      address,
      phone,
      email,
      website,
      socials: { facebook, linkedin, twitter, instagram },
    };

    try {
      const browser = await getBrowser();
      const page = await browser.newPage();
      await page.goto(url);
      await page.setViewport({
        width: 1000,
        height: 600,
        devicePixelRatio: 1,
      });
      const screenshot = await page.screenshot({
        encoding: "base64",
        fullPage: true,
      });
      await browser.close();
      data.screenshot = `data:image/png;base64,${screenshot}`;
    } catch (error) {
      console.log(error);
    }

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
    .project({ screenshot: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ $natural: -1 })
    .toArray();
  const total = await db.collection("web-scraper").countDocuments({});
  return { data, total };
}

export async function getScreenshotData(id: string) {
  const data = await db
    .collection("web-scraper")
    .findOne({ _id: new ObjectId(id) }, { projection: { screenshot: 1 } });
  return data;
}

export async function deleteDBSitesData(ids: string[]) {
  await db
    .collection("web-scraper")
    .deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } });
}
