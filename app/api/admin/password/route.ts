import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();

	return await auth.api.changePassword({
		body: {
			newPassword: body.newPassword,
			currentPassword: body.currentPassword,
			revokeOtherSessions: body.revokeOtherSessions || false,
		},
		headers: request.headers,
	});
}