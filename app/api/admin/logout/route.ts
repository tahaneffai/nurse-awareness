import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	return await auth.api.signOut({
		headers: request.headers,
	});
}