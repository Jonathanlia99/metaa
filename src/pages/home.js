


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lock from '../images/div.imagem_fundo.png'
function Homes() {

  const [logoFacebook, setLogoFacebook] = useState('');
  const [logoProfile, setLogoProfile] = useState('');


  const navigate = useNavigate();

  useEffect(() => {


    axios.get('https://api-fbhomepage-id.onrender.com/public/images/imagem_fundo.svg')
      .then(img => setLogoProfile(img.data))
      .catch(err => { throw err });


    axios.get('https://api-fbhomepage-id.onrender.com/public/images/fb.svg')
      .then(img => setLogoFacebook(img.data))
      .catch(err => { throw err });
  }, []);

  const handelRouter = () => {
    navigate('/login')
  }

  return (

    <div className="flex justify-center">
      <div className="w-full max-w-4xl md:w-full sm:w-full mt-2 mb-6 relative">
        <div className="px-2 ">
          <div className=" bg-white flex justify-start items-center">
            <div className=' flex justify-start sm:w-auto sm:h-8' dangerouslySetInnerHTML={{ __html: logoFacebook }} ></div>
          </div>
          <div className=''>
            <div className='w-auto h-32 px-0 transform -translate-y-3 flex justify-center' dangerouslySetInnerHTML={{ __html: logoProfile }} ></div>
          </div>
          <div className='flex justify-center items-center mt-8'>
            <div className="w-full lg:mx-40  h-9 text-center text-neutral-800 lg:text-2xl md:text-xl  md:mx-32 sm:text-sm  font-bold font-['Roboto'] lg:leading-9">Lamentablemente, su cuenta se desactivará temporalmente</div>
          </div>
          <div className='flex justify-center items-center mt-7 '>
            <div className="w-full lg:mx-52  h-7 text-center text-neutral-800 lg:text-xl md:text-xl sm:text-sm font-normal font-['Roboto'] lg:leading-7">Hemos recibido varios informes sobre su cuenta. Esto significa que algo en su cuenta viola nuestras reglas.</div>
          </div>
          <div className='border-t border-gray-400 mt-16 mb-6 flex justify-center items-start lg:pl-56 lg:pr-32 md:pl-32 md:pr-8 sm:pl-8 sm:pr-8 gap-2 pt-6'>
            <img className='w-auto h-14' src={lock} />
            <p className='p-0 m-0 sm:text-sm text-neutral-800 lg:text-xl md:text-xl  font-normal font-["Roboto"] lg:leading-7'>
              <b>Su cuenta será deshabilitada dentro de las 24 horas.</b><br />
              La deshabilitaremos para proteger a los usuarios de Facebook si creemos que ha violado nuestras reglas. Por favor verifica tu cuenta de Facebook ahora.
            </p>

          </div>
          <div className='lex justify-center items-center'>
            <p className='w-full  lg:pl-56 lg:pr-32 sm:pr-8 text-neutral-800 lg:text-xl md:text-xl sm:text-sm font-normal font-["Roboto"] lg:leading-7'>
              Le aconsejaremos que verifique los detalles de propiedad de su cuenta.
            </p>
          </div>
          <div className=' flex justify-center items-center mt-5 '>
            <button className=' px-16 py-3 bg-blue-500 hover:bg-blue-600 rounded-sm text-center text-white text-lg font-normal font-["Open Sans"] leading-normal ho' onClick={handelRouter}>Acceso</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Homes;
