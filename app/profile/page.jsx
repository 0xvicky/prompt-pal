"use client";

import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Profile} from "@components";

const OwnerProfile = () => {
  const [posts, setPosts] = useState([]);

  const {data: session} = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${session?.user?.id}/posts`);
    const data = await res.json();
    // console.log(data);
    setPosts(data);
  };

  const handleEdit = id => {
    router.push(`/update-prompt?id=${id}`);
  };

  const handleDelete = async id => {
    try {
      await fetch(`/api/prompt/${id}`, {
        method: "DELETE"
      });
      router.push("/");
    } catch (error) {
      console.log(`Error occured while deleting:${error}`);
    }
  };
  return (
    <Profile
      name='My'
      desc='Profile page of user'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default OwnerProfile;
