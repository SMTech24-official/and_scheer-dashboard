"use client"
// import FormInput from '@/components/FormInput';



// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import Input from '../shared/Input';
import Logo from '../shared/Logo';
import logingirl from '../../assets/logingirl.jpg'
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

export default function Loginform() {

  const { register, handleSubmit } = useForm<FormData>();
//   const router=useRouter();
const navigate =useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data, "Check the data here: ");
    navigate("/dashboard")
  }



  return (


    <section className="max-w-[1420px] mx-auto min-h-screen flex items-center justify-center md:px-4 ">
      <div className="flex w-full justify-center items-center  rounded-lg overflow-hidden gap-6">

        {/* Left: Image Section */}
        <div className="hidden md:block my-9">
          <img
            src={logingirl}
            alt="Login visual"
            className=" rounded-lg "
            height={758}
            width={588}
          

          />
        </div>

        {/* Right: Form Section */}
        <div className="w-full  p-12 flex flex-col justify-center max-w-[558px]">

          <div className='flex justify-center items-center flex-col'>
            {/* Logo */}
            <div className="mb-6">

              <Logo height={120} width={268}></Logo>
            </div>

            {/* Welcome Message */}

            <h2 className="text-2xl md:text-[48px] text-scheer-primary-dark font-bold mb-2">Hi, Welcome Back!</h2>
            <p className="text-sm text-gray-600 mb-8">
              Please exter your email and password below!
            </p>

          </div>
          <form onSubmit={handleSubmit(onSubmit)}>


            {/* Input Fields */}
            <div className="space-y-4 mb-8  ">
              <Input label="Email Address" type="email" placeholder="you@example.com"
                {...register("email", { required: true })}
              />
              <Input label="Password" type="password" placeholder="password"
                {...register("password", { required: true })}
              />

            </div>

            {/* Login Button */}
            <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">
              Login
            </button>

          </form>

         
        </div>
      </div>
    </section>
  )
}