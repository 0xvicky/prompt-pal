import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='purple_gradient text-center'> AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Prompt Pal is an open-source, AI powered platform where people can add and share
        creative AI prompts with others.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
