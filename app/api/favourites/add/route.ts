import { NextResponse, NextRequest } from 'next/server'
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest, res: NextResponse) {
    await connectDB();

    const body = await request.json();

    const { favourite, email } = body;

    if(!favourite){
        return NextResponse.json({ message: "Favourite is required" }, {status: 400})

    }

    try {

        if(!email){
            return NextResponse.json({ message: "User not found" }, {status: 400})
        }

        const user = await User.findOneAndUpdate(
            { email },
            { $addToSet: { favourites: favourite } },
            { new: true } 
        );

        if(!user){
            return NextResponse.json({ message: "User not found" }, {status: 404})
        }

        return NextResponse.json({ message: "Favourite added successfully" }, {status: 200})

    } catch (error){
        console.error("Error adding favourite: ", error);
        return NextResponse.json({ message: "Internal server error" }, {status: 500})

    }
}