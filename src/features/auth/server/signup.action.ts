"use server";
import { AUTH_ENDPOINTS } from "@/src/config/api";
import { SignUpInputValues, SignUpSchema } from "../schemas/SignUp.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { log } from "console";

export async function signupAction(values: SignUpInputValues) {
  const valdiationResult = SignUpSchema.safeParse(values);
  const errors: Record<string, string> = {};
  if (!valdiationResult.success) {
    if (valdiationResult.error) {
      valdiationResult.error.issues.forEach((issue) => {
        errors[issue.path[0] as string] = issue.message;
      });
    }
    return {
      success: false,
      errors,
      message: "Validation failed. Please correct the errors and try again.",
    };
  }

  const { terms, ...restValues } = values;
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: AUTH_ENDPOINTS.signup,
      data: restValues,
    };
    const { data } = await axios.request(options);
    console.log("Signup successful:", data);

    return { success: true, data };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Signup error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
