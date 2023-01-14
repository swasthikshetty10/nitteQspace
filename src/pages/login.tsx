import { useRouter } from "next/router";
import { signIn,useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters,AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    show: false,
    status: false,
    message: "",
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/home");
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setSuccess({ show: false, status: false, message: "" });
    signIn("email", {
      email,
      callbackUrl: `${window.location.origin}/home`,
      redirect: false,
    })
      .then((res) => {
        if (res && res.status === 200) {
          setSuccess({
            show: true,
            status: true,
            message: `Checkout your email ${email} for the login link. If you don't see it
          in a few minutes, check your spam folder.`,
          });
          setEmail("");
        } else {
          setSuccess({ show: true, status: true, message: "" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="absolute top-0 left-0 flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-2 p-5  ">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-slate-300 bg-opacity-10 p-5 text-center  shadow-lg backdrop-blur-xl dark:bg-slate-800 dark:bg-opacity-40">
        <h2 className="font-bold ">Login/Register</h2>
        <button
          disabled={loading}
          onClick={() => {
            setLoading(true);

            signIn("google", {
              callbackUrl: `${window.location.origin}/home`,
              redirect: false,
            })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => setLoading(false));
          }}
          className="delay-50 flex w-full items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 p-3 text-center text-2xl font-semibold backdrop-blur-3xl transition-all duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40">
          <FcGoogle /> <span>Google</span>
        </button>
        <div className="flex w-full items-center justify-center gap-2 text-gray-400/50">
          <div className="h-[2px] w-full bg-gray-400/50"></div>
          or
          <div className="h-[2px] w-full bg-gray-400/50"></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            spellCheck="false"
            className="delay-50  w-full rounded-xl  bg-black bg-opacity-5  p-3 text-xl outline-none backdrop-blur-3xl  invalid:border-pink-500 invalid:text-pink-600 hover:bg-opacity-10 focus:border-2
            focus:ring-0 
      focus:invalid:border-pink-600 focus:invalid:ring-pink-600 disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none
      dark:bg-opacity-30 dark:hover:bg-opacity-40
            "
            placeholder="xyz@nmamit.in"
          />
          <button
            type="submit"
            disabled={loading}
            className=" delay-50 flex w-full items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 p-3 text-center text-xl font-semibold backdrop-blur-3xl transition-all duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40">
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Getting things ready
              </>
            ) : (
              <>
                <AiOutlineMail />
                Sign In with Email
              </>
            )}
          </button>
        </form>
        {success.show &&
          (success.status ? (
            <EmailSuccess message={success.message} />
          ) : (
            <EmailError />
          ))}
      </div>
    </div>
  );
}

export default Login;

type successProps = {
  message: string;
};

const EmailSuccess = ({ message }: successProps) => {
  return (
    <div
      className="d relative rounded-b-xl border-t-4 border-teal-500 bg-teal-100 bg-opacity-40  px-4 py-3 text-teal-900 shadow-md dark:bg-teal-900 dark:text-teal-100"
      role="alert">
      <div className="flex">
        <div className="absolute top-2 left-2 ">
          <svg
            className="mr-4 h-6 w-6 fill-current text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">Email has bean sent</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

const EmailError = () => {
  return (
    <div
      className="relative flex items-center bg-blue-500 px-4 py-3 text-sm font-bold text-white"
      role="alert">
      <svg
        className="mr-2 h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
      </svg>
      <p>Something went wrong try Logging in from different email.</p>
    </div>
  );
};
