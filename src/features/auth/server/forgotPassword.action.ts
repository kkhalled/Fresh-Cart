"use server";


import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
  ResetPasswordSchema,
  VerifyResetCodeSchema,
} from "../schemas/ForgotPassword.schema";
import { AUTH_ENDPOINTS } from "@/src/config/api";
import axios, { AxiosError } from "axios";

export async function forgotPasswordAction(values: ForgotPasswordValues) {
  const result = ForgotPasswordSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid Email Address",
    };
  }

  try {
    const options = {
      method: "POST",
      url: AUTH_ENDPOINTS.forgotPassword,
      data: values,
    };

    const { data } = await axios.request(options);

    if (data.statusMsg === "success") {
      return {
        success: true,
        message: data.message,
        statusMsg: data.statusMsg,
      };
    }

    // Backend responded with a non-success status (including "fail")
    else {
      return {
        success: false,
        message: data.message || "Something went wrong",
        statusMsg: data.statusMsg,
      };
    }
  } catch (error) {
    // Try to extract a useful message from Axios error response body
    if (error instanceof AxiosError) {
      const responseData = (error as any).response.data as {
        statusMsg?: string;
        message?: string;
      };

      return {
        success: false,
        message: "There is no user registered with this email address",
        statusMsg: responseData.statusMsg,
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export type VerifyCodeValues = {
  resetCode: string;
};

export type VerifyCodeResponse = {
  success: boolean;
  message: string;
};

export async function verifyResetCodeAction(
  values: VerifyCodeValues,
): Promise<VerifyCodeResponse> {
  const parsed = VerifyResetCodeSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid verification code format",
    };
  }

  try {
    const { data } = await axios.post(AUTH_ENDPOINTS.verifyResetCode, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status?.toLowerCase() === "success") {
      return {
        success: true,
        message: "Code verified successfully",
      };
    }

    return {
      success: false,
      message: "Invalid or expired code",
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
}

type ResetPasswordValues = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export async function resetPasswordAction(values: ResetPasswordValues) {
  const validationResult = ResetPasswordSchema.safeParse(values);

  if (!validationResult.success) {
    if (validationResult.error) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        errors[issue.path[0] as string] = issue.message;
      });
      return {
        success: false,
        message: "Invalid reset password format",
        errors,
      };
    }
  }

  try {
    const options = {
      method: "PUT",
      url: AUTH_ENDPOINTS.resetPassword,
      data: values,
    };

    const { data } = await axios.request(options);

    if (data.token) {
      console.log(data);
      return {
        success: true,
        message: "Password reset successfully",
        data,
      };
    } else {
      console.log(data);
      return {
        success: false,
        message: data.message || "Something went wrong ",
        data,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {

      return {
        success: false,
        data: error.response?.data,
        message: error.response?.data?.message || "Something went wrong",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred during password reset.",
      };
    }
  }
}
