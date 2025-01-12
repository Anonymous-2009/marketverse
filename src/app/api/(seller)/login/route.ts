// import { NextResponse } from 'next/server'
// import { auth } from '@clerk/nextjs/server'
// import { getAuth, clerkClient } from '@clerk/nextjs/server';

// export async function POST(req: Request) {
 
//   const body = await req.json();
//   const { email, password } = body;
//   console.log("Email:", email);
//   try {
//     const signIn = await clerkClient.signIns.create({
//       identifier: email,
//       password,
//     });
//     });
//     console.log("SignIn:", signIns);
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
//   }
//   return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
// }