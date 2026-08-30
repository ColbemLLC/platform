// FILE: app/api/auth/[...all]/route.ts
// Replaces the old hand-rolled login/route.ts, register/route.ts, and
// route.ts (whoami/logout). Better Auth handles every /api/auth/* path
// itself now — don't add sibling route files under app/api/auth/.

import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth.handler);