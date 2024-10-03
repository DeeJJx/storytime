import { NextResponse, NextRequest } from 'next/server'
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: NextRequest, res: NextResponse) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if(!email){
        return NextResponse.json({ message: "Email is required" }, {status: 400})
    }

    try {

        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({ message: "User not found" }, {status: 404});
        }

        return NextResponse.json({ favourites: user.favourites }, {status: 200});

    } catch (error){
      console.error("Error fetching favourites: ", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}