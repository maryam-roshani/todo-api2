import React from 'react'
import Card from './card'

const Home: React.FC = () => {
    const cards = [
    { title: 'گزارش دهی', description: 'گزارش های جامع و دقیق از زمان صرف شده بر روی هر وظیفه دریافت کنید.' },
    { title: 'رابط کاربری ساده', description: 'با رابط کابری ساده و کاربرپسند ما، به راحتی وظایف خود را مدیریت کنید.' },
    { title: 'مدیریت وظایف', description: 'وظایف خود را به ایجاد و تاریخ شروع هرکدام را ذخیره کنید.' },
    { title: 'رهگیری دقیق زمان', description: 'زمان صرف شده برای هر وظیفه را به طور دقیق ثبت و ذخیره کنید.' },
  ];

  return (
    <>
    <div className='block text-center justify-center my-5 leading-7
    '>
        <div className='flex justify-center items-center gap-2'>
            <h1 className='my-3'>برنامه </h1><h1 className='text-gray-700'>ردیاب زمان</h1>
        </div>
        <p>ما یک ابزار کارآمد برای رهگیری زمان و مدیزیت وظایف فراهم کرده ایم که به شما کمک میکند تا</p>
        <p>بهره وری خود را افزایش دهید و امور خود را به بهترین نحو مدیریت کنید</p>
    </div>
        
        <div className='flex justify-center'>
            <button className='bg-indigo-800 px-2 py-1 text-white rounded-sm m-5 cursor-pointer hover:bg-red-500 transition-colors duration-300'>کنترل زمان را به دست بگیرید</button>
        </div>
        <div className="flex justify-center">
            <h1 className="mt-10 font-bold mb-5">ویژگی های کلیدی</h1>
        </div>
        <div className="flex flex-nowrap mx-auto justify-center gap-6 p-8 w-2/3">
        {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
        ))}
    </div>
    </>
  )
}

export default Home