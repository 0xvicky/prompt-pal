import {connectToDB} from "@utils/database";
import User from "@models/user";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
  const {firstName, lastName, email, password, confirmPassword} = await req.json();

  const username = firstName + " " + lastName;
  try {
    await connectToDB(); //nextjs only connect to DB when needed....
    //check if user with this email already exists?
    const isUserExist = await User.findOne({email});

    if (isUserExist) {
      console.log("User with this email already exists");
      return NextResponse.json(
        {msg: "User with this email already exists"},
        {status: 404}
      );
    }
    //check if password is equals to confirm password
    if (password !== confirmPassword) {
      return NextResponse.json(
        {error: "Password is not equal to confirm password"},
        {status: 400}
      );
    }
    //then hash the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //create new user
    const newUser = await User.create({
      email,
      username,
      image: "",
      password: encryptedPassword
    });
    //save the user
    await newUser.save();
    newUser.password = undefined;
    return NextResponse.json(newUser, {status: 201});
    //return the new user
  } catch (error) {
    console.log(`Error occured:${error}`);
    return NextResponse.json({msg: error}, {status: 201});
  }
};
