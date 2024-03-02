"use client";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Form} from "@components";
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: []
  });

  const {data: session} = useSession();
  const router = useRouter();

  const createPrompt = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag.toString()
        })
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(`Error occured while creating a prompt`, error);
    } finally {
      setPost({
        prompt: "",
        tag: ""
      });
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
