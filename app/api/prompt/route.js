import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async req => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {status: 200});
  } catch (error) {
    console.log(`Error occured while fetching the prompts:${error}`);
    return new Response("Error occured while fetching", {status: 500});
  }
};
