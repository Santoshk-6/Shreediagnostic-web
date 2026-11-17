/**
 * Reusable Web3Forms Email Notification Utility
 * Shree Diagnostic Center
 */

export interface Web3FormsPayload {
  subject: string;
  from_name?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Web3FormsResponse {
  success: boolean;
  message: string;
}

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "06fc31ee-cdd4-4aee-9c81-6357ac7349d8";

export async function submitToWeb3Forms(
  data: Web3FormsPayload
): Promise<Web3FormsResponse> {
  try {
    const payload = {
      access_key: ACCESS_KEY,
      ...data,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: result.message || "Submitted successfully." };
    }
    return {
      success: false,
      message: result.message || "Submission failed. Please try again.",
    };
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Network error occurred.";
    console.error("Web3Forms error:", msg);
    return {
      success: false,
      message:
        "Unable to connect. Please check your internet connection and try again.",
    };
  }
}
