import { AUTH_ENDPOINTS } from "@/src/config/api";
import { SignInInputValues, SignInSchema } from "../schemas/Signin.schema";
import axios, { AxiosError } from "axios";

export default async function signinAction(values: SignInInputValues) {
  const valdiationResult = SignInSchema.safeParse(values);
  if (!valdiationResult.success) {
    const errors: Record<string, string> = {};

    if (valdiationResult.error) {
      valdiationResult.error.issues.forEach((key) => {
        errors[key.path[0] as string] = key.message;
      });
    }
    return {
      errors,
      success: false,
      message: "Validation failed. Please correct the errors and try again.",
    };
  }

  try {
    const { rememberMe, ...requestBody } = values;
    const options = {
      method: "POST",
      url: AUTH_ENDPOINTS.signin,
      data: requestBody,
    };

    const { data } = await axios.request(options);
    if (data.message == "success") {
      return {
        success: true,
        message: "Signed in successfully!",
        data, // Include any relevant data returned from the API
      };
    }
    return {
      success: false,
      message: data.message || "Signin failed. Please try again.",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Signin error:", error.response?.data || error.message);
      if (error.response?.data?.message === "Incorrect email or password") {
        return {
          success: false,
          message: "Something went wrong",
          errors: {
            password: "Incorrect email or password",
          },
        };
      }
    }
  }
}
