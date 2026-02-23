"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function Home() {

  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <div>
        <div>
          <h1>Denuncie Chamas</h1>
          <p>Entre com sua conta para registrar denúncias de incêndios</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input type="email"
                {...register('email', { required: "Email obrigatório"})}/>
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Senha:</label>
                <input type="password"
                {...register('password', { required: "Senha obrigatória", minLength:{value: 8, message: "Mínimo 8 caracteres"} })}/>
                {errors.password && <p>{errors.password?.message}</p>}
            </div>

            <button type="submit">
                Entrar
            </button>

            
            
        </form>
        


    </div>
  );
}
