import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInputValues, SignUpSchema } from "../schemas/SignUp.schema";

export default function useSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputValues> = (values) => {
    console.log(values);
  };
  return { register, handleSubmit, errors, onSubmit };
}
