"use client";
import React, {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {Form} from "@components";
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: []
  });

  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    if (promptId) getPromptDetails();
  }, [promptId]);

  const getPromptDetails = async () => {
    const res = await fetch(`/api/prompt/${promptId}`, {
      method: "GET"
    });
    const prompt = await res.json();
    setPost({
      prompt: prompt.prompt,
      tag: prompt.tag
    });
  };

  const updatePrompt = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default CreatePrompt;
