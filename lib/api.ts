// Thin fetch wrapper for the TLV backend. Used by server components and
// (eventually) client components. Server-side calls use API_URL (private),
// browser calls use NEXT_PUBLIC_API_URL. Both default to localhost:4000.

export const API_BASE =
  (typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL) || "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type RequestOptions = RequestInit & { token?: string };

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    // Default to no-store for server fetches so content stays fresh; callers
    // can override with { next: { revalidate: 60 } } etc.
    cache: rest.cache ?? "no-store"
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.error || detail;
    } catch {
      // non-JSON error body — fall through
    }
    throw new ApiError(res.status, detail);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
